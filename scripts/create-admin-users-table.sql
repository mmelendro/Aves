-- Create admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'moderator', 'super_admin')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create index for faster role queries
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON public.admin_users(role);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can read their own row
CREATE POLICY "admins_read_self" ON public.admin_users
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Policy: Only service role can insert/update/delete
CREATE POLICY "service_role_manage_admins" ON public.admin_users
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Insert your admin user (replace with your actual email)
INSERT INTO public.admin_users (user_id, role)
SELECT id, 'super_admin'
FROM auth.users
WHERE email = 'mmelendro@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = EXCLUDED.role, updated_at = now();
