-- Create Admin User Script for AVES Colombia
-- Run this script after creating the admin user through Supabase Auth UI

-- First, create the user through Supabase Auth Dashboard or API:
-- Email: info@aves.bio
-- Password: MotMot2025!

-- Then run this script to set up the admin role and permissions

-- Update the user's role to admin (replace the UUID with the actual user ID)
-- You can find the user ID in the Supabase Auth dashboard
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
    COALESCE(raw_user_meta_data, '{}'), 
    '{role}', 
    '"admin"'
)
WHERE email = 'info@aves.bio';

-- Update or insert the profile with admin role
INSERT INTO public.profiles (
    id, 
    email, 
    full_name, 
    role, 
    gdpr_consent, 
    marketing_consent,
    created_at,
    updated_at
)
SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'full_name', 'AVES Admin'),
    'admin',
    true,
    false,
    created_at,
    NOW()
FROM auth.users 
WHERE email = 'info@aves.bio'
ON CONFLICT (id) 
DO UPDATE SET 
    role = 'admin',
    full_name = COALESCE(EXCLUDED.full_name, 'AVES Admin'),
    updated_at = NOW();

-- Verify the admin user was created correctly
SELECT 
    p.id,
    p.email,
    p.full_name,
    p.role,
    p.created_at,
    u.email_confirmed_at,
    u.last_sign_in_at
FROM public.profiles p
JOIN auth.users u ON p.id = u.id
WHERE p.email = 'info@aves.bio';

-- Grant additional permissions if needed
-- (The RLS policies should already handle admin access)

COMMENT ON TABLE public.profiles IS 'Admin user info@aves.bio has been configured with admin role';
