-- Create Admin User Script for AVES Colombia
-- This script sets up the admin user info@aves.bio with full privileges

-- First, we need to check if the user exists in auth.users
-- If not, we'll provide instructions to create it manually

DO $$
DECLARE
    admin_user_id UUID;
    admin_email TEXT := 'info@aves.bio';
BEGIN
    -- Look for existing admin user
    SELECT id INTO admin_user_id 
    FROM auth.users 
    WHERE email = admin_email;
    
    IF admin_user_id IS NULL THEN
        RAISE NOTICE '=== ADMIN USER SETUP REQUIRED ===';
        RAISE NOTICE 'Admin user not found in auth.users.';
        RAISE NOTICE 'Please follow these steps to create the admin user:';
        RAISE NOTICE '';
        RAISE NOTICE '1. Go to your Supabase Dashboard';
        RAISE NOTICE '2. Navigate to Authentication > Users';
        RAISE NOTICE '3. Click "Add User" button';
        RAISE NOTICE '4. Fill in the following details:';
        RAISE NOTICE '   - Email: info@aves.bio';
        RAISE NOTICE '   - Password: MotMot2025!';
        RAISE NOTICE '   - Email Confirm: Check this box';
        RAISE NOTICE '   - Auto Confirm User: Check this box';
        RAISE NOTICE '5. Click "Create User"';
        RAISE NOTICE '6. Run this script again after creating the user';
        RAISE NOTICE '';
        RAISE NOTICE '=== END SETUP INSTRUCTIONS ===';
    ELSE
        -- Admin user exists, set up the profile with admin privileges
        INSERT INTO public.profiles (
            id,
            email,
            full_name,
            first_name,
            last_name,
            role,
            gdpr_consent,
            marketing_consent,
            created_at,
            updated_at
        ) VALUES (
            admin_user_id,
            admin_email,
            'AVES Administrator',
            'AVES',
            'Administrator',
            'admin',
            true,
            false,
            NOW(),
            NOW()
        ) ON CONFLICT (id) DO UPDATE SET
            role = 'admin',
            full_name = 'AVES Administrator',
            first_name = 'AVES',
            last_name = 'Administrator',
            updated_at = NOW();
            
        RAISE NOTICE '✅ Admin user profile created/updated successfully!';
        RAISE NOTICE 'Admin User ID: %', admin_user_id;
        RAISE NOTICE 'Email: %', admin_email;
        RAISE NOTICE 'Role: admin';
        RAISE NOTICE '';
        RAISE NOTICE 'The admin user can now access:';
        RAISE NOTICE '- /admin - Admin dashboard';
        RAISE NOTICE '- /admin/dashboard - Comprehensive admin panel';
        RAISE NOTICE '- All user management features';
        RAISE NOTICE '- All booking and trip management';
        RAISE NOTICE '- Payment and invoice oversight';
        RAISE NOTICE '- System audit logs';
    END IF;
END $$;

-- Ensure admin has all necessary permissions
DO $$
BEGIN
    -- Create admin-specific policies if they don't exist
    
    -- Admin can do everything on profiles
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access to profiles' AND tablename = 'profiles') THEN
        CREATE POLICY "Admin full access to profiles" ON public.profiles
            FOR ALL USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND role = 'admin'
                )
            );
    END IF;
    
    -- Admin can do everything on bookings
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access to bookings' AND tablename = 'bookings') THEN
        CREATE POLICY "Admin full access to bookings" ON public.bookings
            FOR ALL USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND role = 'admin'
                )
            );
    END IF;
    
    -- Admin can do everything on audit_logs
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin full access to audit_logs' AND tablename = 'audit_logs') THEN
        CREATE POLICY "Admin full access to audit_logs" ON public.audit_logs
            FOR ALL USING (
                EXISTS (
                    SELECT 1 FROM public.profiles 
                    WHERE id = auth.uid() AND role = 'admin'
                )
            );
    END IF;
    
    RAISE NOTICE '✅ Admin RLS policies verified/created successfully';
END $$;

-- Create admin utility functions
CREATE OR REPLACE FUNCTION public.is_admin_user(user_email TEXT DEFAULT NULL)
RETURNS BOOLEAN AS $$
DECLARE
    check_email TEXT;
BEGIN
    IF user_email IS NULL THEN
        SELECT email INTO check_email FROM auth.users WHERE id = auth.uid();
    ELSE
        check_email := user_email;
    END IF;
    
    RETURN EXISTS (
        SELECT 1 FROM public.profiles p
        JOIN auth.users u ON p.id = u.id
        WHERE u.email = check_email AND p.role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to promote user to admin (only callable by existing admin)
CREATE OR REPLACE FUNCTION public.promote_to_admin(target_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    -- Check if current user is admin
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Only administrators can promote users to admin';
    END IF;
    
    -- Update the target user's role
    UPDATE public.profiles 
    SET role = 'admin', updated_at = NOW()
    WHERE id = target_user_id;
    
    -- Log the action
    INSERT INTO public.audit_logs (user_id, action, table_name, record_id, new_values)
    VALUES (
        auth.uid(),
        'promote_to_admin',
        'profiles',
        target_user_id,
        jsonb_build_object('role', 'admin')
    );
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.is_admin_user TO authenticated;
GRANT EXECUTE ON FUNCTION public.promote_to_admin TO authenticated;

-- Create admin dashboard stats function
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS JSONB AS $$
DECLARE
    stats JSONB;
BEGIN
    -- Check if user is admin
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied. Admin privileges required.';
    END IF;
    
    SELECT jsonb_build_object(
        'total_users', (SELECT COUNT(*) FROM public.profiles WHERE role = 'user'),
        'total_bookings', (SELECT COUNT(*) FROM public.bookings),
        'pending_bookings', (SELECT COUNT(*) FROM public.bookings WHERE status = 'pending'),
        'confirmed_bookings', (SELECT COUNT(*) FROM public.bookings WHERE status = 'confirmed'),
        'total_payments', (SELECT COUNT(*) FROM public.payments),
        'pending_payments', (SELECT COUNT(*) FROM public.payments WHERE status = 'pending'),
        'completed_payments', (SELECT COUNT(*) FROM public.payments WHERE status = 'completed'),
        'active_trips', (SELECT COUNT(*) FROM public.trips WHERE status = 'in_progress'),
        'upcoming_trips', (SELECT COUNT(*) FROM public.trips WHERE status = 'upcoming'),
        'total_revenue', (SELECT COALESCE(SUM(amount), 0) FROM public.payments WHERE status = 'completed'),
        'unread_messages', (SELECT COUNT(*) FROM public.messages WHERE read = false),
        'pending_reminders', (SELECT COUNT(*) FROM public.reminders WHERE sent = false AND remind_at <= NOW())
    ) INTO stats;
    
    RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_admin_dashboard_stats TO authenticated;

RAISE NOTICE '';
RAISE NOTICE '🔐 Admin user setup script completed!';
RAISE NOTICE 'Next steps:';
RAISE NOTICE '1. Create the user in Supabase Dashboard if not already done';
RAISE NOTICE '2. Run this script again to set up the profile';
RAISE NOTICE '3. Test login at your application';
RAISE NOTICE '4. Access admin features at /admin';
