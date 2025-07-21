# AVES Supabase Integration Guide

## Overview
This guide provides comprehensive documentation for the Supabase integration with the AVES website, including user authentication, data storage, and admin functionality.

## Database Schema

### Tables

#### 1. profiles
Stores user profile information and preferences.

**Columns:**
- `id` (UUID, Primary Key) - References auth.users(id)
- `email` (TEXT, NOT NULL) - User's email address
- `full_name` (TEXT) - User's full name
- `phone` (TEXT) - User's phone number
- `experience_level` (TEXT) - Birding experience level
- `is_admin` (BOOLEAN) - Admin privileges flag
- `registration_method` (TEXT) - How user registered (form, google, magic_link)
- `marketing_consent` (BOOLEAN) - Marketing email consent
- `newsletter_subscribed` (BOOLEAN) - Newsletter subscription status
- `created_at` (TIMESTAMP) - Account creation date
- `updated_at` (TIMESTAMP) - Last profile update
- `last_login` (TIMESTAMP) - Last login timestamp

#### 2. bookings
Stores tour booking information.

**Columns:**
- `id` (UUID, Primary Key) - Unique booking identifier
- `user_id` (UUID, Foreign Key) - References profiles(id)
- `booking_data` (JSONB) - Structured booking information
- `status` (TEXT) - Booking status (draft, pending, confirmed, cancelled, completed)
- `total_cost` (DECIMAL) - Total booking cost
- `tour_selections` (JSONB) - Selected tours array
- `payment_status` (TEXT) - Payment processing status
- `confirmation_number` (TEXT) - Unique confirmation number
- `created_at` (TIMESTAMP) - Booking creation date
- `updated_at` (TIMESTAMP) - Last booking update

#### 3. inquiries
Stores customer inquiries and support requests.

**Columns:**
- `id` (UUID, Primary Key) - Unique inquiry identifier
- `user_id` (UUID, Foreign Key) - References profiles(id), nullable
- `email` (TEXT, NOT NULL) - Inquirer's email
- `full_name` (TEXT, NOT NULL) - Inquirer's name
- `message` (TEXT, NOT NULL) - Inquiry message
- `inquiry_type` (TEXT) - Type of inquiry (general, booking, support, etc.)
- `status` (TEXT) - Processing status (pending, in_progress, resolved, closed)
- `priority` (TEXT) - Priority level (low, medium, high, urgent)
- `assigned_to` (UUID) - Admin user assigned to inquiry
- `created_at` (TIMESTAMP) - Inquiry creation date

#### 4. admin_logs
Tracks admin actions for audit purposes.

**Columns:**
- `id` (UUID, Primary Key) - Unique log identifier
- `admin_id` (UUID, Foreign Key) - References profiles(id)
- `action` (TEXT, NOT NULL) - Action performed
- `target_type` (TEXT, NOT NULL) - Type of target (user, booking, inquiry)
- `target_id` (UUID) - ID of affected record
- `details` (JSONB) - Additional action details
- `created_at` (TIMESTAMP) - Action timestamp
- `ip_address` (INET) - Admin's IP address

## Environment Variables

Add these to your `.env.local` file:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://vlizimtetekemaiivnsf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsaXppbXRldGVrZW1haWl2bnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTUwODMsImV4cCI6MjA2ODM5MTA4M30.tsrP54YBn3U5k_0xvqfvmleApNjFjKxO3u8iQc9n90E
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
\`\`\`

## Authentication Methods

### 1. Email/Password Registration
- Form-based registration with validation
- Password requirements: 8+ characters, uppercase, lowercase, number
- Email verification required
- Automatic profile creation

### 2. Google OAuth
- One-click Google sign-in
- Automatic profile creation from Google data
- Seamless redirect handling

### 3. Magic Link
- Passwordless authentication
- Email-based login links
- Secure token-based authentication

## Admin Functionality

### Admin Account Creation
An admin account is automatically created when a user registers with the email `admin@aves.bio`. This account has elevated privileges including:

- View all user data
- Manage bookings and inquiries
- Export data to CSV
- Access admin dashboard
- View audit logs

### Admin Dashboard Features
- **User Management**: View, search, and manage all user accounts
- **Booking Management**: Track and manage all tour bookings
- **Inquiry Management**: Handle customer inquiries and support requests
- **Data Export**: Export user, booking, and inquiry data to CSV
- **Audit Logging**: Track all admin actions for compliance

## Security Features

### Row Level Security (RLS)
All tables implement RLS policies to ensure data privacy:
- Users can only access their own data
- Admins have elevated access to all data
- Anonymous users have limited access

### Data Validation
- Input sanitization to prevent XSS attacks
- Email format validation
- Password strength requirements
- Phone number format validation

### Privacy Compliance
- Marketing consent tracking
- Newsletter subscription management
- Data export capabilities for GDPR compliance
- Secure data deletion policies

## API Usage Examples

### Creating a User Profile
\`\`\`typescript
import { createUserProfile } from '@/lib/supabase'

const profileData = {
  id: user.id,
  email: 'user@example.com',
  full_name: 'John Doe',
  experience_level: 'Intermediate birder',
  marketing_consent: true,
  newsletter_subscribed: true
}

const { data, error } = await createUserProfile(profileData)
\`\`\`

### Logging Admin Actions
\`\`\`typescript
import { logAdminAction } from '@/lib/supabase'

await logAdminAction(
  adminId,
  'USER_PROFILE_UPDATE',
  'profile',
  userId,
  { field_updated: 'experience_level', new_value: 'Advanced birder' }
)
\`\`\`

### Querying User Data (Admin)
\`\`\`typescript
const { data: users } = await supabase
  .from('profiles')
  .select('*')
  .order('created_at', { ascending: false })
\`\`\`

## Testing Instructions

### 1. User Registration Testing
1. Navigate to the website homepage
2. Click "Create Account" or any sign-up button
3. Test form registration:
   - Fill out all required fields
   - Test password validation
   - Verify email confirmation
4. Test Google OAuth:
   - Click "Google" sign-in button
   - Complete Google authentication
   - Verify profile creation
5. Test Magic Link:
   - Enter email address
   - Click "Magic Link" button
   - Check email and click link
   - Verify authentication

### 2. Admin Access Testing
1. Register with email `admin@aves.bio`
2. Complete registration process
3. Navigate to `/admin`
4. Verify admin dashboard access
5. Test admin functions:
   - View user data
   - Export CSV files
   - Update inquiry status
   - View audit logs

### 3. Data Privacy Testing
1. Create regular user account
2. Verify user can only see own data
3. Test admin account can see all data
4. Verify RLS policies are working
5. Test data export functionality

### 4. Error Handling Testing
1. Test invalid email formats
2. Test weak passwords
3. Test duplicate email registration
4. Test network connectivity issues
5. Verify appropriate error messages

## Troubleshooting

### Common Issues

#### 1. Authentication Errors
- **Issue**: "Invalid login credentials"
- **Solution**: Verify email/password combination, check if email is verified

#### 2. Profile Creation Failures
- **Issue**: User authenticated but no profile created
- **Solution**: Check database triggers, verify RLS policies

#### 3. Admin Access Denied
- **Issue**: Cannot access admin dashboard
- **Solution**: Verify `is_admin` flag in profiles table, check email address

#### 4. Data Export Issues
- **Issue**: CSV export fails
- **Solution**: Check admin permissions, verify data exists

### Database Maintenance

#### Regular Tasks
1. Monitor user registration trends
2. Clean up old inquiry records
3. Archive completed bookings
4. Review admin logs for security

#### Performance Optimization
1. Monitor query performance
2. Update table statistics
3. Review and optimize indexes
4. Clean up unused data

## Support and Maintenance

### Monitoring
- Set up alerts for failed registrations
- Monitor admin action logs
- Track user engagement metrics
- Monitor database performance

### Backup Strategy
- Automated daily backups via Supabase
- Point-in-time recovery available
- Regular backup testing
- Data retention policies

### Updates and Migrations
- Version control for schema changes
- Staged deployment process
- Rollback procedures
- User communication for maintenance

For additional support or questions, contact the development team or refer to the Supabase documentation.
