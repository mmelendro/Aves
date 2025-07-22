-- Update the user_profiles table to ensure proper constraints and indexes
ALTER TABLE user_profiles 
ADD CONSTRAINT check_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add constraint to ensure phone numbers are properly formatted (optional)
ALTER TABLE user_profiles 
ADD CONSTRAINT check_phone_format CHECK (phone IS NULL OR phone ~* '^\+?[1-9]\d{1,14}$');

-- Ensure passport expiry is in the future when set
CREATE OR REPLACE FUNCTION check_passport_expiry()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.passport_expiry IS NOT NULL AND NEW.passport_expiry <= CURRENT_DATE THEN
        RAISE EXCEPTION 'Passport expiry date must be in the future';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for passport expiry validation
DROP TRIGGER IF EXISTS passport_expiry_check ON user_profiles;
CREATE TRIGGER passport_expiry_check
    BEFORE INSERT OR UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION check_passport_expiry();

-- Add function to automatically create user profile on auth user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (user_id, email, first_name, last_name, created_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        NOW()
    )
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- Update RLS policies to be more permissive for profile creation
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (
        auth.uid() = user_id OR 
        auth.uid() IS NOT NULL -- Allow authenticated users to create profiles
    );

-- Add policy for service role to manage profiles
CREATE POLICY "Service role can manage profiles" ON user_profiles
    FOR ALL USING (
        auth.jwt() ->> 'role' = 'service_role'
    );

-- Ensure the updated_at trigger exists and works properly
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recreate the trigger to ensure it's working
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
    BEFORE UPDATE ON user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add some sample data for testing (optional)
INSERT INTO user_profiles (
    user_id, 
    email, 
    first_name, 
    last_name, 
    phone,
    created_at
) VALUES (
    gen_random_uuid(),
    'test@example.com',
    'Test',
    'User',
    '+1234567890',
    NOW()
) ON CONFLICT (user_id) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON user_bookings TO authenticated;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
