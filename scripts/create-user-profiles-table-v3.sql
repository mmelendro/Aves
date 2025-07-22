-- Drop existing table if it exists (be careful in production!)
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Create user_profiles table with correct schema
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone_number TEXT,
  profile_image_url TEXT,
  bio TEXT,
  location TEXT,
  birding_experience TEXT CHECK (birding_experience IN ('beginner', 'intermediate', 'advanced', 'expert')),
  preferred_tour_types TEXT[],
  dietary_restrictions TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

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

-- Create index for better performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);

-- Insert some sample data (optional)
-- Note: This will only work if you have actual users in auth.users
-- INSERT INTO user_profiles (user_id, full_name, phone_number, birding_experience)
-- SELECT id, 'Sample User', '+1234567890', 'intermediate'
-- FROM auth.users
-- LIMIT 1;
