# Understanding Row Level Security (RLS)

## What is RLS?

Row Level Security (RLS) is Supabase/PostgreSQL's built-in security system that controls **who can access which rows** in your database tables.

## Why Bookings Weren't Saving

**The Problem:**
When you enabled RLS on the `bookings` table but didn't create any policies, the database blocked ALL operations:

\`\`\`
User clicks "Save Booking" 
  ↓
Frontend sends INSERT request
  ↓
Supabase checks: "Does this user have permission to INSERT?"
  ↓
No RLS policy found
  ↓
❌ REQUEST BLOCKED - Booking not saved
\`\`\`

**The Solution:**
The SQL script creates RLS policies that explicitly allow users to insert their own bookings:

\`\`\`sql
CREATE POLICY "Users can create their own bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
\`\`\`

This policy says:
- **Table:** `bookings`
- **Action:** `INSERT` (creating new records)
- **Who:** `authenticated` users (anyone logged in)
- **Condition:** `auth.uid() = user_id` (the user_id in the booking must match the logged-in user's ID)

## How RLS Policies Work

### Policy Structure

Every RLS policy has 4 parts:

1. **Table** - Which table does this apply to?
2. **Action** - What operation? (SELECT, INSERT, UPDATE, DELETE)
3. **Who** - Which users? (authenticated, anon, specific roles)
4. **Condition** - What data can they access?

### Example Flow

**User saves a booking:**

\`\`\`javascript
// Frontend code
const { data, error } = await supabase
  .from('bookings')
  .insert({
    user_id: currentUser.id,  // "abc-123"
    total_cost: 5000,
    tour_selections: {...}
  })
\`\`\`

**What happens in the database:**

\`\`\`
1. Supabase receives INSERT request
2. Checks: Is user authenticated? ✅ Yes
3. Checks: Does INSERT policy exist? ✅ Yes
4. Evaluates: auth.uid() = user_id?
   - auth.uid() = "abc-123" (logged-in user)
   - user_id = "abc-123" (in the data)
   - "abc-123" = "abc-123" ✅ TRUE
5. Policy passes → INSERT allowed ✅
6. Booking saved to database
\`\`\`

**User tries to view someone else's booking:**

\`\`\`javascript
// Frontend tries to read booking with id "xyz-789"
const { data } = await supabase
  .from('bookings')
  .select('*')
  .eq('id', 'xyz-789')
\`\`\`

**What happens:**

\`\`\`
1. Supabase receives SELECT request
2. Checks: Is user authenticated? ✅ Yes
3. Checks: Does SELECT policy exist? ✅ Yes
4. Evaluates: auth.uid() = user_id?
   - auth.uid() = "abc-123" (logged-in user)
   - user_id = "def-456" (booking owner)
   - "abc-123" = "def-456" ❌ FALSE
5. Policy fails → SELECT blocked ❌
6. Returns empty result (user can't see this booking)
\`\`\`

## The 6 Policies We Created

### For Regular Users:

1. **INSERT Policy** - Users can create bookings for themselves
2. **SELECT Policy** - Users can view their own bookings
3. **UPDATE Policy** - Users can modify their own bookings
4. **DELETE Policy** - Users can cancel their own bookings

### For Admins:

5. **Admin SELECT Policy** - Admins can view ALL bookings
6. **Admin UPDATE Policy** - Admins can modify ANY booking

## How Admin Access Works

The admin policies use a subquery to check if the user is an admin:

\`\`\`sql
CREATE POLICY "Admins can view all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.user_id = auth.uid()
    )
  );
\`\`\`

**Translation:**
"Allow SELECT on bookings IF there's a record in admin_users table where user_id matches the current user"

**Flow:**
\`\`\`
Admin visits /admin page
  ↓
Frontend queries: SELECT * FROM bookings
  ↓
Supabase checks: Is this user in admin_users table?
  ↓
Query: SELECT 1 FROM admin_users WHERE user_id = 'abc-123'
  ↓
Result found ✅
  ↓
Policy passes → Return ALL bookings
\`\`\`

## Why This is Secure

1. **Database-level security** - Even if someone hacks your frontend, they can't bypass RLS
2. **Automatic enforcement** - You don't need to check permissions in your code
3. **Fine-grained control** - Different rules for different users and actions
4. **Audit trail** - All policies are visible in the database

## Common RLS Patterns

### Pattern 1: Own Data Only
\`\`\`sql
USING (auth.uid() = user_id)
\`\`\`
"You can only access rows where you're the owner"

### Pattern 2: Role-Based Access
\`\`\`sql
USING (
  EXISTS (
    SELECT 1 FROM admin_users
    WHERE admin_users.user_id = auth.uid()
  )
)
\`\`\`
"You can access if you have a specific role"

### Pattern 3: Public Read, Private Write
\`\`\`sql
-- Anyone can read
CREATE POLICY "Public read" ON table FOR SELECT USING (true);

-- Only owner can write
CREATE POLICY "Owner write" ON table FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
\`\`\`

## Testing RLS Policies

After running the script, test with these queries in Supabase SQL Editor:

\`\`\`sql
-- Check if policies exist
SELECT * FROM pg_policies WHERE tablename = 'bookings';

-- Test as a user (replace with actual user ID)
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims.sub TO 'user-id-here';
SELECT * FROM bookings;  -- Should only see own bookings

-- Test as admin
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims.sub TO 'admin-user-id-here';
SELECT * FROM bookings;  -- Should see ALL bookings
\`\`\`

## Summary

**Before RLS policies:** Database blocks everything by default
**After RLS policies:** Database allows specific operations based on rules
**Result:** Users can save bookings, view their own data, and admins can manage everything

The SQL script I created sets up all these policies correctly, which is why bookings will now save and persist after logout.
