-- Create Admin User Script for AVES Colombia
-- This script sets up the admin user and ensures proper permissions

-- First, check if the admin user exists in auth.users
DO $$
DECLARE
    admin_user_id UUID;
BEGIN
    -- Look for existing admin user
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = 'info@aves.bio';
    
    IF admin_user_id IS NULL THEN
        RAISE NOTICE 'Admin user not found in auth.users. Please create the user through Supabase Auth first.';
        RAISE NOTICE 'Steps to create admin user:';
        RAISE NOTICE '1. Go to Supabase Dashboard > Authentication > Users';
        RAISE NOTICE '2. Click "Add User"';
        RAISE NOTICE '3. Email: info@aves.bio';
        RAISE NOTICE '4. Password: MotMot2025!';
        RAISE NOTICE '5. Email Confirm: true';
        RAISE NOTICE '6. Then run this script again';
    ELSE
        -- Admin user exists, ensure profile is set up correctly
        INSERT INTO public.profiles (
            id,
            email,
            full_name,
            role,
            gdpr_consent,
            marketing_consent,
            created_at,
            updated_at
        ) VALUES (
            admin_user_id,
            'info@aves.bio',
            'AVES Admin',
            'admin',
            true,
            false,
            NOW(),
            NOW()
        ) ON CONFLICT (id) DO UPDATE SET
            role = 'admin',
            updated_at = NOW();
            
        RAISE NOTICE 'Admin user profile created/updated successfully';
        RAISE NOTICE 'Admin User ID: %', admin_user_id;
    END IF;
END $$;

-- Ensure RLS policies allow admin access
DO $$
BEGIN
    -- Drop existing policies if they exist
    DROP POLICY IF EXISTS "Admin full access to profiles" ON public.profiles;
    DROP POLICY IF EXISTS "Admin full access to bookings" ON public.bookings;
    DROP POLICY IF EXISTS "Admin full access to audit_logs" ON public.audit_logs;
    
    -- Create admin policies for profiles
    CREATE POLICY "Admin full access to profiles" ON public.profiles
        FOR ALL USING (
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() AND role = 'admin'
            )
        );
    
    -- Create admin policies for bookings
    CREATE POLICY "Admin full access to bookings" ON public.bookings
        FOR ALL USING (
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() AND role = 'admin'
            )
        );
    
    -- Create admin policies for audit_logs
    CREATE POLICY "Admin full access to audit_logs" ON public.audit_logs
        FOR ALL USING (
            EXISTS (
                SELECT 1 FROM public.profiles 
                WHERE id = auth.uid() AND role = 'admin'
            )
        );
    
    RAISE NOTICE 'Admin RLS policies created successfully';
END $$;

-- Grant necessary permissions
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.bookings TO authenticated;
GRANT ALL ON public.audit_logs TO authenticated;

-- Create function to check admin status
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE id = user_id AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.is_admin TO authenticated;

RAISE NOTICE 'Admin user setup completed. Please verify:';
RAISE NOTICE '1. User exists in auth.users with email info@aves.bio';
RAISE NOTICE '2. Profile exists in public.profiles with role = admin';
RAISE NOTICE '3. User can access /admin page';
