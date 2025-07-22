-- Drop existing table if it exists to ensure clean schema
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Create user_profiles table with correct schema using user_id as primary key
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  full_name TEXT,
  phone_number TEXT,
  profile_image_url TEXT,
  
  -- eBird Integration
  ebird_username TEXT,
  ebird_profile_url TEXT,
  
  -- Travel Documentation
  passport_number TEXT,
  passport_country TEXT,
  passport_expiry_date DATE,
  
  -- Insurance Information
  insurance_provider TEXT,
  insurance_policy_number TEXT,
  insurance_coverage_details TEXT,
  insurance_expiry_date DATE,
  
  -- Dietary Information
  dietary_preferences TEXT[],
  food_allergies TEXT,
  environmental_allergies TEXT,
  other_allergies TEXT,
  
  -- Medical Information
  medical_conditions TEXT,
  current_medications TEXT,
  medical_notes TEXT,
  
  -- Vaccination History
  covid_vaccination_status TEXT,
  yellow_fever_vaccination BOOLEAN DEFAULT FALSE,
  yellow_fever_date DATE,
  hepatitis_a_vaccination BOOLEAN DEFAULT FALSE,
  hepatitis_a_date DATE,
  hepatitis_b_vaccination BOOLEAN DEFAULT FALSE,
  hepatitis_b_date DATE,
  typhoid_vaccination BOOLEAN DEFAULT FALSE,
  typhoid_date DATE,
  other_vaccinations TEXT,
  
  -- Emergency Contact
  emergency_contact_name TEXT,
  emergency_contact_relationship TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_email TEXT,
  
  -- Social Media
  instagram_handle TEXT,
  facebook_profile TEXT,
  twitter_handle TEXT,
  linkedin_profile TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_user_profiles_created_at ON user_profiles(created_at);
CREATE INDEX idx_user_profiles_updated_at ON user_profiles(updated_at);
CREATE INDEX idx_user_profiles_full_name ON user_profiles(full_name);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own profile" ON user_profiles;
CREATE POLICY "Users can delete own profile" ON user_profiles
  FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON user_profiles TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;

-- Insert a test record to verify the schema works
-- This will be cleaned up by the test suite
INSERT INTO user_profiles (user_id, full_name, phone_number) 
VALUES ('00000000-0000-0000-0000-000000000000', 'Schema Test User', '+1234567890')
ON CONFLICT (user_id) DO NOTHING;
