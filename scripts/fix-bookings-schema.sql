-- Fix bookings table schema to match frontend expectations
-- Run this script to make bookings functional

-- 1. Add missing deposit_amount field
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS deposit_amount NUMERIC DEFAULT 0;

-- 2. Ensure all required fields exist
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS participants INTEGER DEFAULT 1;

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS start_date DATE;

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS end_date DATE;

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';

-- 3. Standardize total fields (keep both for compatibility)
-- Ensure total_amount mirrors total_cost for admin dashboard
CREATE OR REPLACE FUNCTION sync_booking_totals()
RETURNS TRIGGER AS $$
BEGIN
  -- When total_cost is set, also set total_amount
  IF NEW.total_cost IS NOT NULL THEN
    NEW.total_amount := NEW.total_cost;
  END IF;
  
  -- When total_amount is set, also set total_cost
  IF NEW.total_amount IS NOT NULL AND NEW.total_cost IS NULL THEN
    NEW.total_cost := NEW.total_amount;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to keep totals in sync
DROP TRIGGER IF EXISTS sync_booking_totals_trigger ON bookings;
CREATE TRIGGER sync_booking_totals_trigger
  BEFORE INSERT OR UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION sync_booking_totals();

-- 4. Add foreign key relationship to user_profiles
ALTER TABLE bookings
DROP CONSTRAINT IF EXISTS fk_bookings_user;

ALTER TABLE bookings
ADD CONSTRAINT fk_bookings_user
FOREIGN KEY (user_id) REFERENCES user_profiles(id)
ON DELETE CASCADE;

-- 5. Update RLS policies to allow inserts
DROP POLICY IF EXISTS "Users can insert their own bookings" ON bookings;
CREATE POLICY "Users can insert their own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own bookings" ON bookings;
CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 6. Admin policies
DROP POLICY IF EXISTS "Admins can view all bookings" ON bookings;
CREATE POLICY "Admins can view all bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins can update all bookings" ON bookings;
CREATE POLICY "Admins can update all bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- 7. Ensure booking_reference is auto-generated if not provided
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_reference IS NULL THEN
    NEW.booking_reference := 'AVES-' || 
      TO_CHAR(NOW(), 'YYYYMMDD') || '-' || 
      UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 6));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS generate_booking_reference_trigger ON bookings;
CREATE TRIGGER generate_booking_reference_trigger
  BEFORE INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION generate_booking_reference();

-- 8. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON bookings(booking_reference);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Bookings table schema updated successfully!';
  RAISE NOTICE 'You can now save bookings from the frontend.';
END $$;
