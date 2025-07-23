-- Fix primary key references and ensure proper relationships

-- First, let's check the current structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name IN ('user_profiles', 'bookings')
ORDER BY table_name, ordinal_position;

-- Update user_profiles table to ensure proper structure
-- The table should have:
-- - id (UUID, primary key)
-- - auth_user_id (UUID, references auth.users.id)

-- If the table doesn't exist or needs to be recreated:
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auth_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone_number TEXT,
    profile_image_url TEXT,
    ebird_username TEXT,
    ebird_profile_url TEXT,
    passport_number TEXT,
    passport_country TEXT,
    passport_expiry_date DATE,
    insurance_provider TEXT,
    insurance_policy_number TEXT,
    insurance_coverage_details TEXT,
    insurance_expiry_date DATE,
    dietary_preferences TEXT[],
    food_allergies TEXT,
    environmental_allergies TEXT,
    other_allergies TEXT,
    medical_conditions TEXT,
    current_medications TEXT,
    medical_notes TEXT,
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
    emergency_contact_name TEXT,
    emergency_contact_relationship TEXT,
    emergency_contact_phone TEXT,
    emergency_contact_email TEXT,
    instagram_handle TEXT,
    facebook_profile TEXT,
    twitter_handle TEXT,
    linkedin_profile TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(auth_user_id)
);

-- Update bookings table to ensure proper structure
-- The table should have:
-- - id (UUID, primary key)
-- - user_id (UUID, references user_profiles.id)

CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
    booking_reference TEXT NOT NULL DEFAULT ('AVES-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(EXTRACT(DOY FROM NOW())::TEXT, 3, '0') || '-' || LPAD(EXTRACT(HOUR FROM NOW())::TEXT, 2, '0') || LPAD(EXTRACT(MINUTE FROM NOW())::TEXT, 2, '0')),
    tour_type TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    contact_phone TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    participants INTEGER DEFAULT 1,
    total_price DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('draft', 'pending', 'confirmed', 'cancelled', 'completed', 'test')),
    notes TEXT,
    booking_date TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_auth_user_id ON user_profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings(created_at);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON user_profiles;
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = auth_user_id);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = auth_user_id);

-- Create RLS policies for bookings
DROP POLICY IF EXISTS "Users can view own bookings" ON bookings;
CREATE POLICY "Users can view own bookings" ON bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = bookings.user_id 
            AND user_profiles.auth_user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can insert own bookings" ON bookings;
CREATE POLICY "Users can insert own bookings" ON bookings
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = bookings.user_id 
            AND user_profiles.auth_user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can update own bookings" ON bookings;
CREATE POLICY "Users can update own bookings" ON bookings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = bookings.user_id 
            AND user_profiles.auth_user_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Users can delete own bookings" ON bookings;
CREATE POLICY "Users can delete own bookings" ON bookings
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM user_profiles 
            WHERE user_profiles.id = bookings.user_id 
            AND user_profiles.auth_user_id = auth.uid()
        )
    );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON bookings TO authenticated;
GRANT SELECT ON user_profiles TO anon;
GRANT SELECT ON bookings TO anon;
