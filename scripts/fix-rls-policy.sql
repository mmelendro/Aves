-- Fix RLS policy to avoid infinite recursion
-- This script modifies the RLS policy on the profiles table to prevent infinite recursion

-- Drop the existing policy (if it exists)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;

-- Re-create the policy with a more efficient and non-recursive condition
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

-- Add a policy for admins to view all profiles
CREATE POLICY "Admins can view all profiles" ON public.profiles
FOR SELECT USING (EXISTS (
    SELECT 1
    FROM public.profiles AS p
    WHERE p.id = auth.uid() AND p.role = 'admin'
));

-- Optionally, add a policy for updating profiles
CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Explanation:
-- The original policy might have been using a function that queried the profiles table,
-- causing an infinite loop. This script replaces it with a direct comparison
-- (auth.uid() = id), which is more efficient and avoids recursion.
-- The admin policy allows admins to bypass the user-specific policy.
