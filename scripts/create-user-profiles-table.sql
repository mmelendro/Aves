-- Create user_profiles table with comprehensive fields
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  
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

-- Create RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only view their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Policy: Users can delete their own profile
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

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
