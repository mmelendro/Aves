# AVES Supabase Integration Guide

## Overview
This guide provides comprehensive documentation for the Supabase integration with the AVES website, including user authentication, data storage, and admin functionality.

## Environment Variables
Ensure these environment variables are set:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://vlizimtetekemaiivnsf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsaXppbXRldGVrZW1haWl2bnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTUwODMsImV4cCI6MjA2ODM5MTA4M30.tsrP54YBn3U5k_0xvqfvmleApNjFjKxO3u8iQc9n90E
SUPABASE_SERVICE_ROLE_KEY=[Your Service Role Key]
\`\`\`

## Database Schema

### Tables Created:
1. **profiles** - User profile information
2. **bookings** - Tour booking data
3. **inquiries** - Contact form submissions
4. **admin_logs** - Admin action audit trail

### Key Features:
- Row Level Security (RLS) enabled
- Automatic profile creation on user signup
- Admin privilege system
- Audit logging for admin actions

## Authentication Methods

### 1. Form-based Registration
- Email/password with validation
- Profile creation with user preferences
- Email verification required

### 2. Google OAuth
- Seamless Google sign-in
- Automatic profile creation
- Redirect handling via `/auth/callback`

### 3. Magic Link
- Passwordless authentication
- Email-based sign-in
- Secure token validation

## Error Handling

### Network Issues
- Connection status monitoring
- Retry mechanisms with exponential backoff
- User-friendly error messages
- Offline state detection

### Common Errors Resolved:
- DNS_PROBE_POSSIBLE: Network connectivity checks
- Failed to fetch: Retry logic and connection validation
- OAuth redirect issues: Proper callback handling

## Admin Functionality

### Admin Account Creation
- Automatic admin privileges for `admin@aves.bio`
- Admin dashboard access control
- Comprehensive user management

### Admin Features:
- View all users, bookings, and inquiries
- Export data to CSV
- Update inquiry status
- Audit log viewing
- Real-time statistics

## Testing Instructions

### 1. User Registration Testing
\`\`\`bash
# Test form registration
1. Navigate to any page with auth modal
2. Click "Sign Up"
3. Fill form with valid data
4. Verify email confirmation
5. Check profile creation in database

# Test Google OAuth
1. Click "Google" button
2. Complete OAuth flow
3. Verify redirect to /auth/callback
4. Check profile creation

# Test Magic Link
1. Enter email address
2. Click "Magic Link"
3. Check email for link
4. Click link and verify authentication
\`\`\`

### 2. Contact Form Testing
\`\`\`bash
# Test form submission
1. Navigate to /contact
2. Fill out complete form
3. Submit inquiry
4. Verify database entry
5. Check admin dashboard for inquiry

# Test error handling
1. Disconnect internet
2. Try submitting form
3. Verify error message
4. Reconnect and retry
\`\`\`

### 3. Admin Dashboard Testing
\`\`\`bash
# Test admin access
1. Register with admin@aves.bio
2. Navigate to /admin
3. Verify dashboard access
4. Test data export functions
5. Test inquiry management
\`\`\`

## Security Features

### Data Protection:
- Input sanitization and validation
- XSS protection
- SQL injection prevention via Supabase RLS
- CSRF protection

### Privacy Compliance:
- GDPR-compliant data handling
- Marketing consent tracking
- Data export functionality
- User data deletion capabilities

## Troubleshooting

### Common Issues:

1. **"Failed to fetch" errors**
   - Check internet connection
   - Verify Supabase URL and keys
   - Check browser network tab for specific errors

2. **Google OAuth not working**
   - Verify OAuth configuration in Supabase
   - Check redirect URLs
   - Ensure proper callback handling

3. **Profile creation failures**
   - Check RLS policies
   - Verify database permissions
   - Review trigger functions

4. **Admin access denied**
   - Confirm email is exactly `admin@aves.bio`
   - Check `is_admin` flag in database
   - Verify RLS policies for admin access

### Debug Steps:
1. Check browser console for errors
2. Verify network connectivity
3. Check Supabase dashboard for logs
4. Review database triggers and functions
5. Test with different browsers/devices

## Performance Optimizations

### Implemented:
- Connection pooling
- Query optimization with indexes
- Retry mechanisms for failed requests
- Efficient data loading strategies
- Proper error boundaries

### Monitoring:
- Connection status indicators
- Loading states for all operations
- Error tracking and reporting
- Performance metrics collection

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database schema deployed
- [ ] RLS policies active
- [ ] OAuth providers configured
- [ ] Email templates set up
- [ ] Admin account created
- [ ] Error handling tested
- [ ] Performance monitoring enabled

## Support and Maintenance

### Regular Tasks:
- Monitor error logs
- Review admin audit trails
- Update security policies
- Backup database regularly
- Test authentication flows

### Contact Information:
For technical support or questions about this integration, contact the development team or refer to the Supabase documentation.
