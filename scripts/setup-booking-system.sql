-- ============================================================================
-- AVES BOOKING SYSTEM - COMPLETE SETUP SCRIPT
-- ============================================================================
-- This script sets up everything needed for the booking system to work:
-- 1. Creates the bookings table with the correct schema
-- 2. Creates the admin_users table for admin access control
-- 3. Enables Row Level Security (RLS) policies
-- 4. Creates triggers for automatic data management
-- ============================================================================

-- ============================================================================
-- PART 1: CREATE BOOKINGS TABLE
-- ============================================================================
-- This table stores all tour bookings from users
-- It matches the data structure that the frontend sends

CREATE TABLE IF NOT EXISTS bookings (
  -- Primary key and metadata
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- User reference (links to auth.users table)
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Booking identification
  booking_reference TEXT UNIQUE NOT NULL DEFAULT 'AVES-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 8)),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  
  -- Tour selections (stored as JSONB for flexibility)
  -- This contains: regions, activities, accommodations, dates, etc.
  tour_selections JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Contact information (stored as JSONB)
  -- This contains: name, email, phone, country, etc.
  contact_info JSONB NOT NULL DEFAULT '{}'::jsonb,
  
  -- Additional booking data (stored as JSONB)
  -- This contains: questions, special requests, dietary requirements, etc.
  booking_data JSONB DEFAULT '{}'::jsonb,
  
  -- Financial information
  total_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
  deposit_amount DECIMAL(10,2) DEFAULT 0,
  currency TEXT DEFAULT 'USD',
  
  -- Payment tracking
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'deposit_paid', 'fully_paid', 'refunded')),
  payment_method TEXT,
  
  -- Additional fields
  special_requests TEXT,
  notes TEXT,
  
  -- Indexes for faster queries
  CONSTRAINT bookings_user_id_idx UNIQUE (id, user_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(booking_reference);

-- ============================================================================
-- PART 2: CREATE ADMIN USERS TABLE
-- ============================================================================
-- This table controls who has admin access to view all bookings

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create index for faster admin checks
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);

-- ============================================================================
-- PART 3: ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================
-- RLS is Supabase's security system that controls who can access what data
-- Without RLS policies, users cannot insert, update, or read ANY data
-- Even if they're authenticated!

-- Enable RLS on both tables
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PART 4: CREATE RLS POLICIES FOR BOOKINGS TABLE
-- ============================================================================

-- POLICY 1: Allow users to INSERT their own bookings
-- This is why bookings weren't saving before - this policy was missing!
CREATE POLICY "Users can create their own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- POLICY 2: Allow users to SELECT (read) their own bookings
-- This lets users see their bookings in the dashboard
CREATE POLICY "Users can view their own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- POLICY 3: Allow users to UPDATE their own bookings
-- This lets users modify their bookings (e.g., add special requests)
CREATE POLICY "Users can update their own bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- POLICY 4: Allow users to DELETE their own bookings
-- This lets users cancel their bookings
CREATE POLICY "Users can delete their own bookings"
  ON bookings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- POLICY 5: Allow admins to SELECT ALL bookings
-- This is what makes the admin panel work - admins can see everyone's bookings
CREATE POLICY "Admins can view all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- POLICY 6: Allow admins to UPDATE any booking
-- This lets admins change booking status, add notes, etc.
CREATE POLICY "Admins can update all bookings"
  ON bookings
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- ============================================================================
-- PART 5: CREATE RLS POLICIES FOR ADMIN_USERS TABLE
-- ============================================================================

-- POLICY 1: Allow admins to view all admin users
CREATE POLICY "Admins can view admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.user_id = auth.uid()
    )
  );

-- POLICY 2: Only super admins can insert new admins
CREATE POLICY "Super admins can create admin users"
  ON admin_users
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
      AND admin_users.role = 'super_admin'
    )
  );

-- ============================================================================
-- PART 6: CREATE TRIGGERS FOR AUTOMATIC UPDATES
-- ============================================================================

-- Trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to calculate deposit (30% of total cost)
CREATE OR REPLACE FUNCTION calculate_deposit()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.deposit_amount IS NULL OR NEW.deposit_amount = 0 THEN
    NEW.deposit_amount = NEW.total_cost * 0.30;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_booking_deposit
  BEFORE INSERT OR UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION calculate_deposit();

-- ============================================================================
-- PART 7: INSERT YOUR ADMIN USER
-- ============================================================================
-- Replace 'YOUR_EMAIL_HERE' with your actual email (mmelendro@gmail.com)
-- This will automatically find your user ID and grant you admin access

INSERT INTO admin_users (user_id, role, created_at)
SELECT id, 'super_admin', NOW()
FROM auth.users
WHERE email = 'mmelendro@gmail.com'
ON CONFLICT (user_id) DO NOTHING;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these to verify everything is set up correctly:

-- Check if your admin user was created:
-- SELECT * FROM admin_users;

-- Check RLS policies on bookings:
-- SELECT * FROM pg_policies WHERE tablename = 'bookings';

-- Check RLS policies on admin_users:
-- SELECT * FROM pg_policies WHERE tablename = 'admin_users';

-- ============================================================================
-- WHAT IS ROW LEVEL SECURITY (RLS)?
-- ============================================================================
-- RLS is Supabase's security system that works like this:
--
-- WITHOUT RLS POLICIES:
-- - User tries to insert booking → ❌ BLOCKED (no policy allows it)
-- - User tries to read bookings → ❌ BLOCKED (no policy allows it)
-- - Admin tries to view all bookings → ❌ BLOCKED (no policy allows it)
--
-- WITH RLS POLICIES (this script):
-- - User tries to insert their booking → ✅ ALLOWED (Policy 1)
-- - User tries to read their bookings → ✅ ALLOWED (Policy 2)
-- - User tries to read someone else's booking → ❌ BLOCKED (Policy 2 only allows own)
-- - Admin tries to view all bookings → ✅ ALLOWED (Policy 5)
--
-- Think of RLS policies as security guards at the database level.
-- Each policy is a rule that says "who can do what with which data"
--
-- The key function is auth.uid() which returns the current user's ID
-- This is how we check "is this user the owner of this booking?"
-- ============================================================================

-- ============================================================================
-- DONE!
-- ============================================================================
-- After running this script:
-- 1. Users can save bookings (they'll persist after logout)
-- 2. Users can view their own bookings in the dashboard
-- 3. You (mmelendro@gmail.com) can view ALL bookings in /admin
-- 4. The system is secure - users can only see their own data
-- ============================================================================
