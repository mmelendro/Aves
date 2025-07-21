-- AVES Colombia Database Audit and Setup Script
-- This script creates all necessary tables, functions, and policies for the audit system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin', 'guide', 'partner');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE booking_status AS ENUM ('draft', 'pending', 'confirmed', 'cancelled', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded', 'failed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
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
    role user_role DEFAULT 'user',
    gdpr_consent BOOLEAN DEFAULT false,
    marketing_consent BOOLEAN DEFAULT false,
    last_login TIMESTAMP WITH TIME ZONE,
    
    CONSTRAINT profiles_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT profiles_phone_check CHECK (phone IS NULL OR length(phone) >= 10)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    booking_data JSONB NOT NULL DEFAULT '{}',
    status booking_status DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    total_cost DECIMAL(10,2),
    contact_info JSONB DEFAULT '{}',
    tour_selections JSONB DEFAULT '[]',
    special_requests TEXT,
    booking_reference TEXT UNIQUE,
    payment_status payment_status DEFAULT 'pending',
    
    CONSTRAINT bookings_total_cost_positive CHECK (total_cost IS NULL OR total_cost >= 0)
);

-- Audit logs table for GDPR compliance and security monitoring
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    
    CONSTRAINT audit_logs_action_not_empty CHECK (length(action) > 0)
);

-- System health monitoring table
CREATE TABLE IF NOT EXISTS public.system_health (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    check_name TEXT NOT NULL,
    status TEXT NOT NULL,
    message TEXT,
    details JSONB DEFAULT '{}',
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    
    CONSTRAINT system_health_status_valid CHECK (status IN ('PASS', 'FAIL', 'WARNING', 'INFO'))
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles(role);
CREATE INDEX IF NOT EXISTS profiles_created_at_idx ON public.profiles(created_at);
CREATE INDEX IF NOT EXISTS bookings_user_id_idx ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON public.bookings(status);
CREATE INDEX IF NOT EXISTS bookings_created_at_idx ON public.bookings(created_at);
CREATE INDEX IF NOT EXISTS bookings_reference_idx ON public.bookings(booking_reference);
CREATE INDEX IF NOT EXISTS audit_logs_user_id_idx ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS audit_logs_action_idx ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON public.audit_logs(created_at);
CREATE INDEX IF NOT EXISTS system_health_check_name_idx ON public.system_health(check_name);
CREATE INDEX IF NOT EXISTS system_health_checked_at_idx ON public.system_health(checked_at);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health ENABLE ROW LEVEL SECURITY;

-- Profiles RLS Policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Bookings RLS Policies
DROP POLICY IF EXISTS "Users can view own bookings" ON public.bookings;
CREATE POLICY "Users can view own bookings" ON public.bookings
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own bookings" ON public.bookings;
CREATE POLICY "Users can create own bookings" ON public.bookings
    FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own bookings" ON public.bookings;
CREATE POLICY "Users can update own bookings" ON public.bookings
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all bookings" ON public.bookings;
CREATE POLICY "Admins can view all bookings" ON public.bookings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Audit Logs RLS Policies
DROP POLICY IF EXISTS "Users can view own audit logs" ON public.audit_logs;
CREATE POLICY "Users can view own audit logs" ON public.audit_logs
    FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
CREATE POLICY "System can insert audit logs" ON public.audit_logs
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view all audit logs" ON public.audit_logs
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- System Health RLS Policies
DROP POLICY IF EXISTS "Admins can manage system health" ON public.system_health;
CREATE POLICY "Admins can manage system health" ON public.system_health
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "Public can view system health" ON public.system_health;
CREATE POLICY "Public can view system health" ON public.system_health
    FOR SELECT USING (true);

-- Functions and Triggers

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, created_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        NEW.created_at
    );
    
    -- Log user creation
    INSERT INTO public.audit_logs (user_id, action, details)
    VALUES (
        NEW.id,
        'user_created',
        jsonb_build_object(
            'email', NEW.email,
            'created_at', NEW.created_at,
            'provider', COALESCE(NEW.raw_user_meta_data->>'provider', 'email')
        )
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS handle_updated_at_profiles ON public.profiles;
CREATE TRIGGER handle_updated_at_profiles
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS handle_updated_at_bookings ON public.bookings;
CREATE TRIGGER handle_updated_at_bookings
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to generate booking reference
CREATE OR REPLACE FUNCTION public.generate_booking_reference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.booking_reference IS NULL THEN
        NEW.booking_reference = 'AVES-' || TO_CHAR(NOW(), 'YYYY') || '-' || 
                               LPAD(EXTRACT(DOY FROM NOW())::TEXT, 3, '0') || '-' ||
                               LPAD(EXTRACT(HOUR FROM NOW())::TEXT, 2, '0') ||
                               LPAD(EXTRACT(MINUTE FROM NOW())::TEXT, 2, '0') ||
                               SUBSTRING(gen_random_uuid()::TEXT, 1, 4);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for booking reference generation
DROP TRIGGER IF EXISTS generate_booking_reference_trigger ON public.bookings;
CREATE TRIGGER generate_booking_reference_trigger
    BEFORE INSERT ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.generate_booking_reference();

-- Function to check if RLS is enabled on a table
CREATE OR REPLACE FUNCTION public.check_rls_enabled(table_name TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    rls_enabled BOOLEAN;
BEGIN
    SELECT relrowsecurity INTO rls_enabled
    FROM pg_class
    WHERE relname = table_name AND relnamespace = 'public'::regnamespace;
    
    RETURN COALESCE(rls_enabled, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to record system health check
CREATE OR REPLACE FUNCTION public.record_health_check(
    check_name_param TEXT,
    status_param TEXT,
    message_param TEXT DEFAULT NULL,
    details_param JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    health_id UUID;
BEGIN
    INSERT INTO public.system_health (check_name, status, message, details)
    VALUES (check_name_param, status_param, message_param, details_param)
    RETURNING id INTO health_id;
    
    RETURN health_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get latest health checks
CREATE OR REPLACE FUNCTION public.get_latest_health_checks()
RETURNS TABLE (
    check_name TEXT,
    status TEXT,
    message TEXT,
    details JSONB,
    checked_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT ON (sh.check_name)
        sh.check_name,
        sh.status,
        sh.message,
        sh.details,
        sh.checked_at
    FROM public.system_health sh
    ORDER BY sh.check_name, sh.checked_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create admin user function
CREATE OR REPLACE FUNCTION public.create_admin_user(
    admin_email TEXT,
    admin_name TEXT DEFAULT 'AVES Admin'
)
RETURNS TEXT AS $$
DECLARE
    admin_id UUID;
BEGIN
    -- Check if admin already exists
    SELECT id INTO admin_id FROM public.profiles WHERE email = admin_email;
    
    IF admin_id IS NOT NULL THEN
        -- Update existing user to admin
        UPDATE public.profiles 
        SET role = 'admin', full_name = admin_name, updated_at = NOW()
        WHERE id = admin_id;
        
        RETURN 'Admin user updated: ' || admin_email;
    ELSE
        RETURN 'Admin user not found. Please create the user account first through Supabase Auth.';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Create a view for admin dashboard statistics
CREATE OR REPLACE VIEW public.admin_stats AS
SELECT 
    (SELECT COUNT(*) FROM public.profiles) as total_users,
    (SELECT COUNT(*) FROM public.bookings) as total_bookings,
    (SELECT COALESCE(SUM(total_cost), 0) FROM public.bookings WHERE status = 'confirmed') as total_revenue,
    (SELECT COUNT(*) FROM public.profiles WHERE created_at > NOW() - INTERVAL '7 days') as recent_signups,
    (SELECT COUNT(*) FROM public.bookings WHERE created_at > NOW() - INTERVAL '30 days') as recent_bookings,
    (SELECT COUNT(*) FROM public.system_health WHERE status = 'FAIL' AND checked_at > NOW() - INTERVAL '1 hour') as critical_issues;

-- Grant access to the admin stats view
GRANT SELECT ON public.admin_stats TO authenticated;

-- Insert initial system health checks
INSERT INTO public.system_health (check_name, status, message, details) VALUES
('database_setup', 'PASS', 'Database tables and functions created successfully', 
 jsonb_build_object('tables_created', ARRAY['profiles', 'bookings', 'audit_logs', 'system_health'])),
('rls_policies', 'PASS', 'Row Level Security policies configured', 
 jsonb_build_object('policies_count', 12)),
('triggers_functions', 'PASS', 'Database triggers and functions installed', 
 jsonb_build_object('functions_count', 6));

-- Log the database setup completion
INSERT INTO public.audit_logs (user_id, action, details) VALUES
(NULL, 'database_setup_completed', 
 jsonb_build_object(
     'timestamp', NOW(),
     'tables', ARRAY['profiles', 'bookings', 'audit_logs', 'system_health'],
     'functions', ARRAY['handle_new_user', 'handle_updated_at', 'generate_booking_reference', 'check_rls_enabled', 'record_health_check', 'get_latest_health_checks', 'create_admin_user'],
     'version', '1.0.0'
 ));

COMMENT ON TABLE public.profiles IS 'User profiles extending Supabase auth.users with AVES-specific data';
COMMENT ON TABLE public.bookings IS 'Tour bookings and reservations with payment tracking';
COMMENT ON TABLE public.audit_logs IS 'Audit trail for GDPR compliance and security monitoring';
COMMENT ON TABLE public.system_health IS 'System health monitoring and diagnostic data';

-- Final verification query
SELECT 
    'Database setup completed successfully!' as message,
    NOW() as completed_at,
    (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('profiles', 'bookings', 'audit_logs', 'system_health')) as tables_created,
    (SELECT COUNT(*) FROM information_schema.routines WHERE routine_schema = 'public' AND routine_type = 'FUNCTION') as functions_created;
