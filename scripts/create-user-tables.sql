-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table
CREATE TABLE user_profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    passport_number TEXT,
    passport_country TEXT,
    passport_expiry DATE,
    insurance_provider TEXT,
    insurance_policy_number TEXT,
    ebird_profile_url TEXT,
    dietary_preferences TEXT,
    allergies TEXT,
    medical_history TEXT,
    current_medications TEXT,
    vaccinations JSONB DEFAULT '[]'::jsonb,
    emergency_contact_name TEXT,
    emergency_contact_relationship TEXT,
    emergency_contact_phone TEXT,
    social_media_handles JSONB DEFAULT '{}'::jsonb,
    uploaded_documents TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user_bookings table
CREATE TABLE user_bookings (
    booking_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
    tour_type TEXT NOT NULL,
    region TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    booking_status TEXT NOT NULL DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance optimization
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_user_profiles_created_at ON user_profiles(created_at);
CREATE INDEX idx_user_bookings_user_id ON user_bookings(user_id);
CREATE INDEX idx_user_bookings_tour_type ON user_bookings(tour_type);
CREATE INDEX idx_user_bookings_region ON user_bookings(region);
CREATE INDEX idx_user_bookings_start_date ON user_bookings(start_date);
CREATE INDEX idx_user_bookings_booking_status ON user_bookings(booking_status);
CREATE INDEX idx_user_bookings_created_at ON user_bookings(created_at);

-- Create composite indexes for common query patterns
CREATE INDEX idx_user_bookings_user_status ON user_bookings(user_id, booking_status);
CREATE INDEX idx_user_bookings_date_range ON user_bookings(start_date, end_date);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_bookings_updated_at 
    BEFORE UPDATE ON user_bookings 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_bookings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles table
-- Policy: Users can view and edit their own profile
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Policy: Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON user_profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_app_meta_data->>'role' = 'admin'
        )
    );

-- Policy: Admins can update all profiles
CREATE POLICY "Admins can update all profiles" ON user_profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_app_meta_data->>'role' = 'admin'
        )
    );

-- Create RLS policies for user_bookings table
-- Policy: Users can view their own bookings
CREATE POLICY "Users can view own bookings" ON user_bookings
    FOR SELECT USING (
        user_id IN (
            SELECT user_id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

-- Policy: Users can create their own bookings
CREATE POLICY "Users can create own bookings" ON user_bookings
    FOR INSERT WITH CHECK (
        user_id IN (
            SELECT user_id FROM user_profiles WHERE user_id = auth.uid()
        )
    );

-- Policy: Users can update their own bookings (with restrictions)
CREATE POLICY "Users can update own bookings" ON user_bookings
    FOR UPDATE USING (
        user_id IN (
            SELECT user_id FROM user_profiles WHERE user_id = auth.uid()
        )
        AND booking_status IN ('pending', 'confirmed') -- Only allow updates for certain statuses
    );

-- Policy: Admins can view all bookings
CREATE POLICY "Admins can view all bookings" ON user_bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_app_meta_data->>'role' = 'admin'
        )
    );

-- Policy: Admins can update all bookings
CREATE POLICY "Admins can update all bookings" ON user_bookings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_app_meta_data->>'role' = 'admin'
        )
    );

-- Policy: Admins can delete bookings
CREATE POLICY "Admins can delete bookings" ON user_bookings
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE auth.users.id = auth.uid() 
            AND auth.users.raw_app_meta_data->>'role' = 'admin'
        )
    );

-- Create a view for booking statistics (admins only)
CREATE VIEW booking_statistics AS
SELECT 
    tour_type,
    region,
    booking_status,
    COUNT(*) as booking_count,
    AVG(price) as average_price,
    SUM(price) as total_revenue,
    DATE_TRUNC('month', created_at) as booking_month
FROM user_bookings
GROUP BY tour_type, region, booking_status, DATE_TRUNC('month', created_at)
ORDER BY booking_month DESC, tour_type, region;

-- Enable RLS on the view
ALTER VIEW booking_statistics SET (security_invoker = true);

-- Grant appropriate permissions
GRANT SELECT ON user_profiles TO authenticated;
GRANT INSERT, UPDATE ON user_profiles TO authenticated;
GRANT SELECT ON user_bookings TO authenticated;
GRANT INSERT, UPDATE ON user_bookings TO authenticated;
GRANT SELECT ON booking_statistics TO authenticated;

-- Create function to validate passport expiry
CREATE OR REPLACE FUNCTION validate_passport_expiry()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.passport_expiry IS NOT NULL AND NEW.passport_expiry <= CURRENT_DATE THEN
        RAISE EXCEPTION 'Passport expiry date must be in the future';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for passport validation
CREATE TRIGGER validate_passport_expiry_trigger
    BEFORE INSERT OR UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION validate_passport_expiry();

-- Create function to validate booking dates
CREATE OR REPLACE FUNCTION validate_booking_dates()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.start_date >= NEW.end_date THEN
        RAISE EXCEPTION 'Start date must be before end date';
    END IF;
    
    IF NEW.start_date <= CURRENT_DATE THEN
        RAISE EXCEPTION 'Start date must be in the future';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for booking date validation
CREATE TRIGGER validate_booking_dates_trigger
    BEFORE INSERT OR UPDATE ON user_bookings
    FOR EACH ROW
    EXECUTE FUNCTION validate_booking_dates();

-- Add comments for documentation
COMMENT ON TABLE user_profiles IS 'Stores comprehensive user profile information for AVES Colombia birding tours';
COMMENT ON TABLE user_bookings IS 'Stores user booking information for tours and expeditions';
COMMENT ON COLUMN user_profiles.vaccinations IS 'JSON array storing vaccination records';
COMMENT ON COLUMN user_profiles.social_media_handles IS 'JSON object with social media platform keys and handle values';
COMMENT ON COLUMN user_profiles.uploaded_documents IS 'Array of document URLs stored in Supabase Storage';
COMMENT ON COLUMN user_bookings.booking_status IS 'Status: pending, confirmed, cancelled, or completed';
