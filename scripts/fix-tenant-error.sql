-- Fix "Tenant or user not found" Error
-- This script addresses common causes of the tenant error

-- 1. Ensure the database is properly initialized
SELECT 'Database connection test' as test, NOW() as timestamp;

-- 2. Check if auth schema exists and is accessible
SELECT schema_name 
FROM information_schema.schemata 
WHERE schema_name IN ('auth', 'public');

-- 3. Verify auth.users table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'auth' AND table_name = 'users';

-- 4. Check if public schema tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'bookings', 'audit_logs');

-- 5. Verify RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'bookings', 'audit_logs');

-- 6. Check existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies 
WHERE schemaname = 'public';

-- 7. Verify the anon and authenticated roles exist
SELECT rolname 
FROM pg_roles 
WHERE rolname IN ('anon', 'authenticated', 'service_role');

-- 8. Check if there are any users in auth.users
SELECT COUNT(*) as user_count, 
       COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as confirmed_users
FROM auth.users;

-- 9. If tables don't exist, create them
DO $$
BEGIN
    -- Create profiles table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'profiles') THEN
        CREATE TABLE public.profiles (
            id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
            username TEXT UNIQUE,
            full_name TEXT,
            avatar_url TEXT,
            website TEXT,
            email TEXT NOT NULL,
            phone TEXT,
            experience_level TEXT,
            preferences JSONB DEFAULT '{}',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
            role TEXT DEFAULT 'user',
            gdpr_consent BOOLEAN DEFAULT false,
            marketing_consent BOOLEAN DEFAULT false,
            last_login TIMESTAMP WITH TIME ZONE
        );
        
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        
        -- Create basic policies
        CREATE POLICY "Users can view own profile" ON public.profiles
            FOR SELECT USING (auth.uid() = id);
            
        CREATE POLICY "Users can update own profile" ON public.profiles
            FOR UPDATE USING (auth.uid() = id);
            
        CREATE POLICY "Users can insert own profile" ON public.profiles
            FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;

    -- Create bookings table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'bookings') THEN
        CREATE TABLE public.bookings (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
            booking_data JSONB NOT NULL DEFAULT '{}',
            status TEXT DEFAULT 'draft',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
            total_cost DECIMAL(10,2),
            contact_info JSONB DEFAULT '{}',
            tour_selections JSONB DEFAULT '[]',
            special_requests TEXT,
            booking_reference TEXT UNIQUE,
            payment_status TEXT DEFAULT 'pending'
        );
        
        ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view own bookings" ON public.bookings
            FOR SELECT USING (auth.uid() = user_id);
    END IF;

    -- Create audit_logs table if it doesn't exist
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'audit_logs') THEN
        CREATE TABLE public.audit_logs (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
            action TEXT NOT NULL,
            details JSONB DEFAULT '{}',
            ip_address INET,
            user_agent TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
        );
        
        ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "System can insert audit logs" ON public.audit_logs
            FOR INSERT WITH CHECK (true);
    END IF;
END $$;

-- 10. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 11. Test basic functionality
INSERT INTO public.audit_logs (action, details) 
VALUES ('system_test', '{"message": "Database setup verification", "timestamp": "' || NOW() || '"}');

SELECT 'Setup verification complete' as status, 
       'Tables created and permissions granted' as message,
       NOW() as completed_at;
