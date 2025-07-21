-- Comprehensive Supabase Fix Script
-- This script ensures all authentication and database issues are resolved

BEGIN;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create profiles table with all necessary columns
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    experience_level TEXT DEFAULT 'Beginner birder',
    avatar_url TEXT,
    last_login TIMESTAMP WITH TIME ZONE,
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create audit_logs table for GDPR compliance and debugging
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_sessions table for session management
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS temporarily to recreate policies
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
DROP POLICY IF EXISTS "profiles_delete_own" ON profiles;
DROP POLICY IF EXISTS "audit_logs_insert" ON audit_logs;
DROP POLICY IF EXISTS "audit_logs_select_own" ON audit_logs;
DROP POLICY IF EXISTS "user_sessions_select_own" ON user_sessions;
DROP POLICY IF EXISTS "user_sessions_insert_own" ON user_sessions;
DROP POLICY IF EXISTS "user_sessions_update_own" ON user_sessions;
DROP POLICY IF EXISTS "user_sessions_delete_own" ON user_sessions;

-- Create secure, non-recursive RLS policies for profiles
CREATE POLICY "profiles_select_policy" ON profiles
    FOR SELECT USING (
        auth.uid() = id OR 
        auth.uid() IN (
            SELECT au.id FROM auth.users au 
            WHERE au.raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "profiles_insert_policy" ON profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_policy" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_delete_policy" ON profiles
    FOR DELETE USING (auth.uid() = id);

-- Create policies for audit_logs
CREATE POLICY "audit_logs_insert_policy" ON audit_logs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "audit_logs_select_policy" ON audit_logs
    FOR SELECT USING (
        auth.uid() = user_id OR 
        auth.uid() IN (
            SELECT au.id FROM auth.users au 
            WHERE au.raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Create policies for user_sessions
CREATE POLICY "user_sessions_select_policy" ON user_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "user_sessions_insert_policy" ON user_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_sessions_update_policy" ON user_sessions
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "user_sessions_delete_policy" ON user_sessions
    FOR DELETE USING (auth.uid() = user_id);

-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Create or replace the handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_email TEXT;
    user_full_name TEXT;
    user_first_name TEXT;
    user_last_name TEXT;
    user_phone TEXT;
    user_experience TEXT;
BEGIN
    -- Extract user data safely
    user_email := COALESCE(NEW.email, '');
    user_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', '');
    user_first_name := COALESCE(NEW.raw_user_meta_data->>'first_name', '');
    user_last_name := COALESCE(NEW.raw_user_meta_data->>'last_name', '');
    user_phone := COALESCE(NEW.raw_user_meta_data->>'phone', '');
    user_experience := COALESCE(NEW.raw_user_meta_data->>'experience_level', 'Beginner birder');

    -- Insert new profile
    INSERT INTO public.profiles (
        id,
        email,
        full_name,
        first_name,
        last_name,
        phone,
        experience_level,
        created_at,
        updated_at
    )
    VALUES (
        NEW.id,
        user_email,
        user_full_name,
        user_first_name,
        user_last_name,
        user_phone,
        user_experience,
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name,
        first_name = EXCLUDED.first_name,
        last_name = EXCLUDED.last_name,
        phone = EXCLUDED.phone,
        experience_level = EXCLUDED.experience_level,
        updated_at = NOW();

    -- Log the user creation
    INSERT INTO public.audit_logs (user_id, action, details)
    VALUES (NEW.id, 'user_created', jsonb_build_object(
        'email', user_email,
        'provider', COALESCE(NEW.raw_app_meta_data->>'provider', 'email'),
        'created_at', NOW()
    ));

    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error but don't fail the user creation
        RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create or replace the update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create or replace session cleanup function
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void AS $$
BEGIN
    DELETE FROM user_sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing triggers to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
DROP TRIGGER IF EXISTS update_audit_logs_updated_at ON audit_logs;

-- Create triggers
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON profiles(updated_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_token ON user_sessions(session_token);

-- Grant appropriate permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.profiles TO anon;
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.audit_logs TO authenticated;
GRANT ALL ON public.user_sessions TO authenticated;

-- Grant sequence permissions if any exist
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Create a function to test the setup
CREATE OR REPLACE FUNCTION public.test_auth_setup()
RETURNS jsonb AS $$
DECLARE
    result jsonb;
    profile_count integer;
    audit_count integer;
    session_count integer;
BEGIN
    -- Count records in each table
    SELECT COUNT(*) INTO profile_count FROM profiles;
    SELECT COUNT(*) INTO audit_count FROM audit_logs;
    SELECT COUNT(*) INTO session_count FROM user_sessions;
    
    result := jsonb_build_object(
        'status', 'success',
        'message', 'Auth setup test completed',
        'profile_count', profile_count,
        'audit_log_count', audit_count,
        'session_count', session_count,
        'timestamp', NOW()
    );
    
    RETURN result;
EXCEPTION
    WHEN OTHERS THEN
        RETURN jsonb_build_object(
            'status', 'error',
            'message', SQLERRM,
            'timestamp', NOW()
        );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMIT;

-- Test the setup
SELECT public.test_auth_setup();
