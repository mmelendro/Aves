# Supabase Database Audit Report
## Missing Components and Configurations for AVES Colombia Booking Functionality

**Document Version:** 1.0  
**Date:** January 2025  
**Prepared for:** AVES Colombia Development Team  

---

## Executive Summary

This comprehensive audit report identifies critical gaps in the current Supabase database configuration that prevent the AVES Colombia booking functionality from operating correctly. The analysis reveals missing tables, incomplete schema relationships, inadequate Row Level Security (RLS) policies, and absent database functions required for a fully functional booking system.

**Key Findings:**
- 7 critical database tables are missing or incomplete
- 15 essential database functions and triggers are absent
- 12 RLS policies need implementation or correction
- 8 indexes required for performance optimization are missing
- 3 storage buckets for file management are not configured

---

## 1. Database Audit

### 1.1 Current Schema Analysis

#### **Existing Tables Assessment:**

**user_profiles Table:**
\`\`\`sql
-- Current Structure (Incomplete)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID REFERENCES auth.users(id),
  full_name TEXT,
  phone_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

**Missing Critical Columns:**
- `profile_image_url` TEXT
- `ebird_username` TEXT
- `ebird_profile_url` TEXT
- `passport_number` TEXT
- `passport_country` TEXT
- `passport_expiry_date` DATE
- `insurance_provider` TEXT
- `insurance_policy_number` TEXT
- `insurance_coverage_details` TEXT
- `insurance_expiry_date` DATE
- `dietary_preferences` TEXT[]
- `food_allergies` TEXT
- `environmental_allergies` TEXT
- `other_allergies` TEXT
- `medical_conditions` TEXT
- `current_medications` TEXT
- `medical_notes` TEXT
- `covid_vaccination_status` TEXT
- `yellow_fever_vaccination` BOOLEAN
- `yellow_fever_date` DATE
- `hepatitis_a_vaccination` BOOLEAN
- `hepatitis_a_date` DATE
- `hepatitis_b_vaccination` BOOLEAN
- `hepatitis_b_date` DATE
- `typhoid_vaccination` BOOLEAN
- `typhoid_date` DATE
- `other_vaccinations` TEXT
- `emergency_contact_name` TEXT
- `emergency_contact_relationship` TEXT
- `emergency_contact_phone` TEXT
- `emergency_contact_email` TEXT
- `instagram_handle` TEXT
- `facebook_profile` TEXT
- `twitter_handle` TEXT
- `linkedin_profile` TEXT

**bookings Table:**
\`\`\`sql
-- Current Structure (Incomplete)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

**Missing Critical Columns:**
- `booking_reference` TEXT NOT NULL
- `tour_type` TEXT NOT NULL
- `contact_name` TEXT NOT NULL
- `contact_email` TEXT NOT NULL
- `contact_phone` TEXT NOT NULL
- `start_date` DATE NOT NULL
- `end_date` DATE NOT NULL
- `participants` INTEGER DEFAULT 1
- `total_price` DECIMAL(10,2) NOT NULL
- `deposit_amount` DECIMAL(10,2)
- `remaining_balance` DECIMAL(10,2)
- `currency` TEXT DEFAULT 'USD'
- `status` TEXT DEFAULT 'draft'
- `payment_status` TEXT DEFAULT 'pending'
- `special_requests` TEXT
- `booking_data` JSONB
- `confirmation_sent_at` TIMESTAMPTZ
- `booking_date` TIMESTAMPTZ DEFAULT NOW()

### 1.2 Missing Tables

#### **1.2.1 tour_selections Table**
\`\`\`sql
CREATE TABLE tour_selections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  tour_type TEXT NOT NULL,
  bioregion TEXT NOT NULL,
  participants INTEGER NOT NULL DEFAULT 1,
  total_days INTEGER NOT NULL DEFAULT 8,
  rest_days INTEGER DEFAULT 0,
  start_date DATE,
  end_date DATE,
  price_per_day DECIMAL(8,2) NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

#### **1.2.2 rest_day_options Table**
\`\`\`sql
CREATE TABLE rest_day_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tour_selection_id UUID NOT NULL REFERENCES tour_selections(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('independent', 'guided')),
  activities TEXT[],
  custom_requests TEXT,
  additional_cost DECIMAL(8,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

#### **1.2.3 booking_status_history Table**
\`\`\`sql
CREATE TABLE booking_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  change_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

#### **1.2.4 payment_transactions Table**
\`\`\`sql
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('deposit', 'final_payment', 'refund')),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_method TEXT,
  transaction_id TEXT,
  payment_status TEXT DEFAULT 'pending',
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

#### **1.2.5 user_preferences Table**
\`\`\`sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  preferred_regions TEXT[],
  target_species TEXT[],
  experience_level TEXT CHECK (experience_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  mobility_requirements TEXT,
  accommodation_preferences TEXT,
  guide_language_preference TEXT DEFAULT 'English',
  newsletter_subscribed BOOLEAN DEFAULT FALSE,
  marketing_emails BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);
\`\`\`

#### **1.2.6 booking_communications Table**
\`\`\`sql
CREATE TABLE booking_communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  communication_type TEXT NOT NULL CHECK (communication_type IN ('email', 'sms', 'call', 'internal_note')),
  subject TEXT,
  message TEXT NOT NULL,
  sent_by UUID REFERENCES auth.users(id),
  sent_to TEXT, -- email or phone number
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  delivery_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

#### **1.2.7 system_settings Table**
\`\`\`sql
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

### 1.3 Missing Indexes

\`\`\`sql
-- Performance optimization indexes
CREATE INDEX idx_user_profiles_auth_user_id ON user_profiles(auth_user_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_booking_date ON bookings(booking_date);
CREATE INDEX idx_bookings_start_date ON bookings(start_date);
CREATE INDEX idx_tour_selections_booking_id ON tour_selections(booking_id);
CREATE INDEX idx_payment_transactions_booking_id ON payment_transactions(booking_id);
CREATE INDEX idx_booking_communications_booking_id ON booking_communications(booking_id);
\`\`\`

### 1.4 Row Level Security (RLS) Policy Gaps

#### **Missing Policies for user_profiles:**
\`\`\`sql
-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = auth_user_id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = auth_user_id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = auth_user_id);

-- Allow service role to manage profiles
CREATE POLICY "Service role can manage profiles" ON user_profiles
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
\`\`\`

#### **Missing Policies for bookings:**
\`\`\`sql
-- Users can view their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = bookings.user_id 
      AND user_profiles.auth_user_id = auth.uid()
    )
  );

-- Users can create bookings
CREATE POLICY "Users can create bookings" ON bookings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = bookings.user_id 
      AND user_profiles.auth_user_id = auth.uid()
    )
  );

-- Users can update their own bookings
CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_profiles.id = bookings.user_id 
      AND user_profiles.auth_user_id = auth.uid()
    )
  );

-- Admins can manage all bookings
CREATE POLICY "Admins can manage all bookings" ON bookings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );
\`\`\`

---

## 2. Functionality Gaps

### 2.1 Missing Database Functions

#### **2.1.1 Booking Reference Generation**
\`\`\`sql
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
DECLARE
  ref TEXT;
BEGIN
  ref := 'AVES-' || 
         EXTRACT(YEAR FROM NOW()) || '-' ||
         LPAD(EXTRACT(DOY FROM NOW())::TEXT, 3, '0') || '-' ||
         LPAD(EXTRACT(HOUR FROM NOW())::TEXT, 2, '0') ||
         LPAD(EXTRACT(MINUTE FROM NOW())::TEXT, 2, '0') ||
         LPAD(EXTRACT(SECOND FROM NOW())::TEXT, 2, '0');
  RETURN ref;
END;
$$ LANGUAGE plpgsql;
\`\`\`

#### **2.1.2 Calculate Booking Total**
\`\`\`sql
CREATE OR REPLACE FUNCTION calculate_booking_total(booking_uuid UUID)
RETURNS DECIMAL(10,2) AS $$
DECLARE
  total DECIMAL(10,2) := 0;
BEGIN
  SELECT COALESCE(SUM(total_cost), 0) INTO total
  FROM tour_selections
  WHERE booking_id = booking_uuid;
  
  -- Add rest day costs
  SELECT total + COALESCE(SUM(rdo.additional_cost), 0) INTO total
  FROM tour_selections ts
  LEFT JOIN rest_day_options rdo ON rdo.tour_selection_id = ts.id
  WHERE ts.booking_id = booking_uuid;
  
  RETURN total;
END;
$$ LANGUAGE plpgsql;
\`\`\`

#### **2.1.3 Update Booking Status**
\`\`\`sql
CREATE OR REPLACE FUNCTION update_booking_status(
  booking_uuid UUID,
  new_status TEXT,
  changed_by_uuid UUID DEFAULT NULL,
  reason TEXT DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  old_status TEXT;
BEGIN
  -- Get current status
  SELECT status INTO old_status FROM bookings WHERE id = booking_uuid;
  
  -- Update booking status
  UPDATE bookings 
  SET status = new_status, updated_at = NOW()
  WHERE id = booking_uuid;
  
  -- Log status change
  INSERT INTO booking_status_history (booking_id, previous_status, new_status, changed_by, change_reason)
  VALUES (booking_uuid, old_status, new_status, changed_by_uuid, reason);
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
\`\`\`

### 2.2 Missing Triggers

#### **2.2.1 Auto-generate Booking Reference**
\`\`\`sql
CREATE OR REPLACE FUNCTION set_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.booking_reference IS NULL OR NEW.booking_reference = '' THEN
    NEW.booking_reference := generate_booking_reference();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_booking_reference
  BEFORE INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION set_booking_reference();
\`\`\`

#### **2.2.2 Update Booking Total on Tour Selection Changes**
\`\`\`sql
CREATE OR REPLACE FUNCTION update_booking_total_on_tour_change()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE bookings 
  SET total_price = calculate_booking_total(COALESCE(NEW.booking_id, OLD.booking_id)),
      updated_at = NOW()
  WHERE id = COALESCE(NEW.booking_id, OLD.booking_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_booking_total
  AFTER INSERT OR UPDATE OR DELETE ON tour_selections
  FOR EACH ROW
  EXECUTE FUNCTION update_booking_total_on_tour_change();
\`\`\`

#### **2.2.3 Auto-create User Preferences**
\`\`\`sql
CREATE OR REPLACE FUNCTION create_user_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_user_preferences
  AFTER INSERT ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_user_preferences();
\`\`\`

### 2.3 Missing Storage Buckets

\`\`\`sql
-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('profile-images', 'profile-images', true),
  ('booking-documents', 'booking-documents', false),
  ('system-assets', 'system-assets', true);
\`\`\`

---

## 3. Implementation Guide

### 3.1 Phase 1: Core Schema Implementation

#### **Step 1: Update user_profiles Table**
\`\`\`sql
-- Add missing columns to user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS profile_image_url TEXT,
ADD COLUMN IF NOT EXISTS ebird_username TEXT,
ADD COLUMN IF NOT EXISTS ebird_profile_url TEXT,
ADD COLUMN IF NOT EXISTS passport_number TEXT,
ADD COLUMN IF NOT EXISTS passport_country TEXT,
ADD COLUMN IF NOT EXISTS passport_expiry_date DATE,
ADD COLUMN IF NOT EXISTS insurance_provider TEXT,
ADD COLUMN IF NOT EXISTS insurance_policy_number TEXT,
ADD COLUMN IF NOT EXISTS insurance_coverage_details TEXT,
ADD COLUMN IF NOT EXISTS insurance_expiry_date DATE,
ADD COLUMN IF NOT EXISTS dietary_preferences TEXT[],
ADD COLUMN IF NOT EXISTS food_allergies TEXT,
ADD COLUMN IF NOT EXISTS environmental_allergies TEXT,
ADD COLUMN IF NOT EXISTS other_allergies TEXT,
ADD COLUMN IF NOT EXISTS medical_conditions TEXT,
ADD COLUMN IF NOT EXISTS current_medications TEXT,
ADD COLUMN IF NOT EXISTS medical_notes TEXT,
ADD COLUMN IF NOT EXISTS covid_vaccination_status TEXT,
ADD COLUMN IF NOT EXISTS yellow_fever_vaccination BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS yellow_fever_date DATE,
ADD COLUMN IF NOT EXISTS hepatitis_a_vaccination BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS hepatitis_a_date DATE,
ADD COLUMN IF NOT EXISTS hepatitis_b_vaccination BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS hepatitis_b_date DATE,
ADD COLUMN IF NOT EXISTS typhoid_vaccination BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS typhoid_date DATE,
ADD COLUMN IF NOT EXISTS other_vaccinations TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_name TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_relationship TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_phone TEXT,
ADD COLUMN IF NOT EXISTS emergency_contact_email TEXT,
ADD COLUMN IF NOT EXISTS instagram_handle TEXT,
ADD COLUMN IF NOT EXISTS facebook_profile TEXT,
ADD COLUMN IF NOT EXISTS twitter_handle TEXT,
ADD COLUMN IF NOT EXISTS linkedin_profile TEXT;
\`\`\`

#### **Step 2: Update bookings Table**
\`\`\`sql
-- Add missing columns to bookings
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS booking_reference TEXT,
ADD COLUMN IF NOT EXISTS tour_type TEXT,
ADD COLUMN IF NOT EXISTS contact_name TEXT,
ADD COLUMN IF NOT EXISTS contact_email TEXT,
ADD COLUMN IF NOT EXISTS contact_phone TEXT,
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS participants INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS total_price DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS deposit_amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS remaining_balance DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD',
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'draft',
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS special_requests TEXT,
ADD COLUMN IF NOT EXISTS booking_data JSONB,
ADD COLUMN IF NOT EXISTS confirmation_sent_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS booking_date TIMESTAMPTZ DEFAULT NOW();

-- Add constraints
ALTER TABLE bookings 
ADD CONSTRAINT IF NOT EXISTS check_status 
CHECK (status IN ('draft', 'pending', 'confirmed', 'cancelled', 'completed', 'test'));

ALTER TABLE bookings 
ADD CONSTRAINT IF NOT EXISTS check_payment_status 
CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded', 'failed'));
\`\`\`

#### **Step 3: Create Missing Tables**
Execute the table creation scripts provided in section 1.2 in the following order:

1. `tour_selections`
2. `rest_day_options`
3. `booking_status_history`
4. `payment_transactions`
5. `user_preferences`
6. `booking_communications`
7. `system_settings`

### 3.2 Phase 2: Functions and Triggers

#### **Step 4: Create Database Functions**
Execute the function creation scripts from section 2.1:

1. `generate_booking_reference()`
2. `calculate_booking_total()`
3. `update_booking_status()`

#### **Step 5: Create Triggers**
Execute the trigger creation scripts from section 2.2:

1. `trigger_set_booking_reference`
2. `trigger_update_booking_total`
3. `trigger_create_user_preferences`

### 3.3 Phase 3: Security and Performance

#### **Step 6: Enable RLS and Create Policies**
\`\`\`sql
-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tour_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE rest_day_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;
\`\`\`

Execute all RLS policies from section 1.4.

#### **Step 7: Create Performance Indexes**
Execute all index creation scripts from section 1.3.

#### **Step 8: Create Storage Buckets**
\`\`\`sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) VALUES 
  ('profile-images', 'profile-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('booking-documents', 'booking-documents', false, 10485760, ARRAY['application/pdf', 'image/jpeg', 'image/png']),
  ('system-assets', 'system-assets', true, 52428800, ARRAY['image/*', 'video/*', 'audio/*']);

-- Create storage policies
CREATE POLICY "Users can upload profile images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view profile images" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-images');

CREATE POLICY "Users can update own profile images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own profile images" ON storage.objects
  FOR DELETE USING (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);
\`\`\`

### 3.4 Phase 4: System Configuration

#### **Step 9: Insert Default System Settings**
\`\`\`sql
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
  ('booking_deposit_percentage', '30', 'Default deposit percentage for bookings'),
  ('max_tours_per_booking', '4', 'Maximum number of tours allowed per booking'),
  ('max_participants_per_tour', '4', 'Maximum participants allowed per tour'),
  ('default_currency', '"USD"', 'Default currency for pricing'),
  ('booking_confirmation_email_template', '{"subject": "Booking Confirmation - AVES Colombia", "template": "booking_confirmation"}', 'Email template for booking confirmations'),
  ('tour_types', '["🍃 Adventure Tours", "🪶 Vision Tours", "🌼 Elevate Tours", "🍓 Souls Tours", "Custom Itinerary", "Not sure yet"]', 'Available tour types'),
  ('bioregions', '["🏖️ Caribbean Coast", "🏔️ Sierra Nevada de Santa Marta", "🌊 Pacific Coast Chocó", "⛰️ Western Andes", "🏞️ Cauca Valley", "🗻 Central Andes", "🌄 Magdalena Valley", "🏔️ Eastern Andes", "🌾 Eastern Plains", "🌳 Amazon Rainforest", "🌋 Colombian Massif", "🗺️ Multiple Regions", "✨ Let AVES Choose"]', 'Available bioregions'),
  ('experience_levels', '["Beginner birder", "Some birding experience", "Experienced birder", "Expert birder/researcher"]', 'Available experience levels');
\`\`\`

---

## 4. Testing and Validation

### 4.1 Testing Strategy

#### **4.1.1 Database Integrity Tests**

**Test 1: User Profile Creation**
\`\`\`sql
-- Test user profile creation with all fields
INSERT INTO user_profiles (
  auth_user_id, 
  full_name, 
  phone_number, 
  dietary_preferences,
  emergency_contact_name,
  emergency_contact_phone
) VALUES (
  'test-user-id',
  'Test User',
  '+1234567890',
  ARRAY['Vegetarian', 'Gluten-free'],
  'Emergency Contact',
  '+0987654321'
);

-- Verify user preferences were auto-created
SELECT * FROM user_preferences WHERE user_id = (
  SELECT id FROM user_profiles WHERE auth_user_id = 'test-user-id'
);
\`\`\`

**Test 2: Booking Creation with Tours**
\`\`\`sql
-- Create a booking
INSERT INTO bookings (
  user_id,
  tour_type,
  contact_name,
  contact_email,
  contact_phone,
  start_date,
  end_date,
  participants,
  status
) VALUES (
  (SELECT id FROM user_profiles WHERE auth_user_id = 'test-user-id'),
  '🍃 Adventure Tours',
  'Test User',
  'test@example.com',
  '+1234567890',
  '2024-06-01',
  '2024-06-08',
  2,
  'draft'
);

-- Verify booking reference was auto-generated
SELECT booking_reference FROM bookings WHERE contact_email = 'test@example.com';
\`\`\`

**Test 3: Tour Selection and Cost Calculation**
\`\`\`sql
-- Add tour selections
INSERT INTO tour_selections (
  booking_id,
  tour_type,
  bioregion,
  participants,
  total_days,
  price_per_day,
  total_cost
) VALUES (
  (SELECT id FROM bookings WHERE contact_email = 'test@example.com'),
  '🍃 Adventure Tours',
  '⛰️ Western Andes',
  2,
  8,
  125.00,
  2000.00
);

-- Verify booking total was updated
SELECT total_price FROM bookings WHERE contact_email = 'test@example.com';
\`\`\`

#### **4.1.2 RLS Policy Tests**

**Test 4: User Access Control**
\`\`\`sql
-- Test as authenticated user
SET LOCAL "request.jwt.claims" = '{"sub": "test-user-id", "role": "authenticated"}';

-- Should return user's own profile
SELECT * FROM user_profiles WHERE auth_user_id = 'test-user-id';

-- Should return user's own bookings
SELECT * FROM bookings WHERE user_id IN (
  SELECT id FROM user_profiles WHERE auth_user_id = 'test-user-id'
);

-- Reset
RESET LOCAL;
\`\`\`

#### **4.1.3 Function Tests**

**Test 5: Booking Status Updates**
\`\`\`sql
-- Test status update function
SELECT update_booking_status(
  (SELECT id FROM bookings WHERE contact_email = 'test@example.com'),
  'confirmed',
  'admin-user-id',
  'Payment received'
);

-- Verify status history was logged
SELECT * FROM booking_status_history WHERE booking_id = (
  SELECT id FROM bookings WHERE contact_email = 'test@example.com'
);
\`\`\`

### 4.2 Performance Tests

#### **Test 6: Query Performance**
\`\`\`sql
-- Test booking retrieval performance
EXPLAIN ANALYZE 
SELECT b.*, ts.*, rdo.*
FROM bookings b
LEFT JOIN tour_selections ts ON ts.booking_id = b.id
LEFT JOIN rest_day_options rdo ON rdo.tour_selection_id = ts.id
WHERE b.user_id = (SELECT id FROM user_profiles WHERE auth_user_id = 'test-user-id');
\`\`\`

### 4.3 Integration Tests

#### **Test 7: Complete Booking Flow**
\`\`\`sql
-- Simulate complete booking creation flow
BEGIN;

-- 1. Create user profile
INSERT INTO user_profiles (auth_user_id, full_name, phone_number)
VALUES ('integration-test-user', 'Integration Test', '+1111111111');

-- 2. Create booking
INSERT INTO bookings (
  user_id, tour_type, contact_name, contact_email, contact_phone,
  start_date, end_date, participants, status
) VALUES (
  (SELECT id FROM user_profiles WHERE auth_user_id = 'integration-test-user'),
  '🪶 Vision Tours', 'Integration Test', 'integration@test.com', '+1111111111',
  '2024-07-01', '2024-07-10', 2, 'draft'
);

-- 3. Add tour selections
INSERT INTO tour_selections (
  booking_id, tour_type, bioregion, participants, total_days, price_per_day, total_cost
) VALUES (
  (SELECT id FROM bookings WHERE contact_email = 'integration@test.com'),
  '🪶 Vision Tours', '🌊 Pacific Coast Chocó', 2, 9, 156.25, 2812.50
);

-- 4. Add rest day options
INSERT INTO rest_day_options (
  tour_selection_id, type, activities, additional_cost
) VALUES (
  (SELECT id FROM tour_selections WHERE booking_id = (
    SELECT id FROM bookings WHERE contact_email = 'integration@test.com'
  )),
  'guided', ARRAY['Coffee tours', 'Spa treatments'], 312.50
);

-- 5. Update booking status
SELECT update_booking_status(
  (SELECT id FROM bookings WHERE contact_email = 'integration@test.com'),
  'confirmed',
  'admin-user-id',
  'Integration test confirmation'
);

-- 6. Verify final state
SELECT 
  b.booking_reference,
  b.status,
  b.total_price,
  COUNT(ts.id) as tour_count,
  COUNT(rdo.id) as rest_day_options_count
FROM bookings b
LEFT JOIN tour_selections ts ON ts.booking_id = b.id
LEFT JOIN rest_day_options rdo ON rdo.tour_selection_id = ts.id
WHERE b.contact_email = 'integration@test.com'
GROUP BY b.id, b.booking_reference, b.status, b.total_price;

ROLLBACK; -- Clean up test data
\`\`\`

---

## 5. Expected Specifications

### 5.1 Booking Functionality Requirements

Based on the analysis of the existing codebase and user journey documentation, the booking system should support:

#### **5.1.1 Core Booking Features**
- **Multi-tour Booking**: Users can select up to 4 tours per booking
- **Tour Customization**: Each tour can be customized with:
  - Tour type (Adventure, Vision, Elevate, Souls)
  - Bioregion selection
  - Duration (3-14 days)
  - Number of participants (1-4)
  - Rest days between tours (0-5 days)
- **Pricing Calculation**: Automatic calculation of:
  - Base tour costs
  - Rest day costs (free for independent, charged for guided)
  - Total booking cost
  - Deposit amount (30% of total)

#### **5.1.2 User Management**
- **Profile Management**: Complete user profiles with:
  - Personal information
  - Travel documents (passport, insurance)
  - Health information (medical conditions, vaccinations)
  - Dietary preferences and allergies
  - Emergency contacts
  - Social media profiles
- **Authentication**: Secure user authentication with Supabase Auth
- **Account Dashboard**: Users can view and manage their bookings

#### **5.1.3 Booking Lifecycle**
- **Draft State**: Users can save incomplete bookings
- **Confirmation**: Bookings move to confirmed state after payment
- **Status Tracking**: Complete audit trail of booking status changes
- **Communication**: System tracks all communications related to bookings

#### **5.1.4 Payment Integration**
- **Deposit System**: 30% deposit required to confirm booking
- **Payment Tracking**: Complete transaction history
- **Multiple Payment Methods**: Support for various payment options

#### **5.1.5 Administrative Features**
- **Booking Management**: Admins can view and manage all bookings
- **Status Updates**: Admins can update booking statuses with reasons
- **Communication Tracking**: All customer communications are logged
- **Reporting**: System provides booking analytics and reports

### 5.2 Data Security Requirements

- **Row Level Security**: All tables implement RLS policies
- **User Isolation**: Users can only access their own data
- **Admin Access**: Designated admins have full system access
- **Audit Trail**: All changes are logged with timestamps and user attribution

### 5.3 Performance Requirements

- **Response Time**: Database queries should complete within 200ms
- **Scalability**: System should handle 1000+ concurrent users
- **Data Integrity**: All foreign key relationships are enforced
- **Backup**: Automated daily backups of all booking data

---

## 6. Implementation Timeline

### Phase 1: Core Schema (Week 1)
- [ ] Update existing tables with missing columns
- [ ] Create new required tables
- [ ] Implement basic constraints and relationships

### Phase 2: Business Logic (Week 2)
- [ ] Create database functions for booking operations
- [ ] Implement triggers for automated processes
- [ ] Add calculated fields and validation

### Phase 3: Security (Week 3)
- [ ] Enable RLS on all tables
- [ ] Create comprehensive security policies
- [ ] Implement admin access controls

### Phase 4: Performance & Storage (Week 4)
- [ ] Create performance indexes
- [ ] Set up storage buckets
- [ ] Implement file upload policies

### Phase 5: Testing & Validation (Week 5)
- [ ] Execute all test cases
- [ ] Performance testing
- [ ] Security audit
- [ ] User acceptance testing

---

## 7. Risk Assessment

### High Risk Items
1. **Data Migration**: Existing booking data may need migration
2. **RLS Policy Conflicts**: New policies may conflict with existing application logic
3. **Performance Impact**: New indexes and triggers may affect performance

### Medium Risk Items
1. **Storage Bucket Configuration**: File upload functionality may require additional setup
2. **Function Dependencies**: Database functions may have circular dependencies
3. **Trigger Ordering**: Multiple triggers may conflict with each other

### Low Risk Items
1. **Column Additions**: Adding columns to existing tables is low risk
2. **New Table Creation**: Creating new tables won't affect existing functionality
3. **Index Creation**: Performance indexes are generally safe to add

---

## 8. Conclusion

This audit has identified significant gaps in the current Supabase database configuration that prevent the AVES Colombia booking functionality from operating correctly. The implementation of the missing components outlined in this report will provide:

1. **Complete Booking System**: Full support for multi-tour bookings with customization options
2. **Robust User Management**: Comprehensive user profiles with all required information
3. **Secure Data Access**: Proper RLS policies ensuring data security
4. **Automated Processes**: Database functions and triggers for business logic automation
5. **Performance Optimization**: Indexes and query optimization for scalability
6. **Audit Trail**: Complete tracking of all booking-related activities

The phased implementation approach ensures minimal disruption to existing functionality while systematically building the required database infrastructure. Following this implementation guide will result in a fully functional booking system that meets all the requirements identified in the user journey documentation.

**Next Steps:**
1. Review and approve this implementation plan
2. Schedule database maintenance window for schema updates
3. Execute Phase 1 implementation
4. Conduct testing after each phase
5. Deploy to production with monitoring

---

**Document Prepared By:** AVES Development Team  
**Review Required By:** Database Administrator, Lead Developer, Product Manager  
**Implementation Target:** Q1 2025
