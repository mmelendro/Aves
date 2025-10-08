-- Enable RLS on bookings table
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "users_read_own_bookings" ON public.bookings;
DROP POLICY IF EXISTS "users_insert_own_bookings" ON public.bookings;
DROP POLICY IF EXISTS "users_update_own_bookings" ON public.bookings;
DROP POLICY IF EXISTS "admins_read_all_bookings" ON public.bookings;

-- Policy: Users can read their own bookings
CREATE POLICY "users_read_own_bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Policy: Users can insert their own bookings
CREATE POLICY "users_insert_own_bookings" ON public.bookings
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Policy: Users can update their own bookings
CREATE POLICY "users_update_own_bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Policy: Admins can read all bookings
CREATE POLICY "admins_read_all_bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Policy: Admins can update all bookings
CREATE POLICY "admins_update_all_bookings" ON public.bookings
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );
