# OAuth Authentication Troubleshooting Guide

## Problem Analysis

The URL `http://localhost:3000/?code=4d867ec7-cf51-4df5-9881-b9bbd0509322` indicates that:

1. ✅ Google OAuth is partially working (authorization code received)
2. ❌ The callback handling is failing (code not being processed)
3. ❌ User is being redirected to home page instead of callback page

## Root Cause Identification

### 1. Redirect URI Mismatch
**Problem**: Google OAuth is redirecting to `/` instead of `/auth/callback`
**Solution**: Fix redirect URI configuration in both Google Console and Supabase

### 2. Code Exchange Failure
**Problem**: Authorization code is not being properly exchanged for session
**Solution**: Enhanced error handling and retry logic in callback

### 3. Session Management Issues
**Problem**: Session not being properly established after code exchange
**Solution**: Improved session validation and profile creation

## Step-by-Step Solution

### Step 1: Configure Google OAuth in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services > Credentials
3. Find your OAuth 2.0 Client ID
4. Add these Authorized redirect URIs:
   \`\`\`
   http://localhost:3000/auth/callback
   https://yourdomain.com/auth/callback
   \`\`\`
5. Remove any redirect URIs pointing to just `/`

### Step 2: Configure Supabase Authentication

1. Go to Supabase Dashboard > Authentication > Settings
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID: `your-google-client-id`
   - Client Secret: `your-google-client-secret`
4. Set Site URL: `http://localhost:3000` (for development)
5. Add Redirect URLs:
   \`\`\`
   http://localhost:3000/auth/callback
   https://yourdomain.com/auth/callback
   \`\`\`

### Step 3: Environment Variables

Ensure these are set in your `.env.local`:
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

### Step 4: Test the Authentication Flow

1. Clear browser cookies and localStorage
2. Go to `/auth/diagnostics` to run comprehensive tests
3. Try Google OAuth login
4. Monitor the callback process at `/auth/callback`

## Debugging Tools

### 1. Authentication Diagnostics Page
Visit `/auth/diagnostics` to see:
- Environment configuration
- Supabase connection status
- OAuth flow analysis
- Session information

### 2. Enhanced Callback Page
The new callback page provides:
- Step-by-step progress tracking
- Detailed error messages
- Debug information
- Retry mechanisms

### 3. Console Logging
Check browser console for detailed OAuth flow logs

## Common Issues and Solutions

### Issue 1: "OAuth provider not enabled"
**Solution**: Enable Google provider in Supabase Dashboard

### Issue 2: "Redirect URI mismatch"
**Solution**: Ensure redirect URIs match exactly in Google Console and Supabase

### Issue 3: "Code exchange failed"
**Solution**: Check Supabase configuration and network connectivity

### Issue 4: "Session not created"
**Solution**: Verify user profile creation and RLS policies

### Issue 5: "Admin access denied"
**Solution**: Ensure admin user exists with correct role in profiles table

## Testing Checklist

- [ ] Google OAuth credentials configured
- [ ] Redirect URIs match in all configurations
- [ ] Environment variables set correctly
- [ ] Supabase connection working
- [ ] Database schema and RLS policies applied
- [ ] Admin user created with correct role
- [ ] Callback page handling all error cases
- [ ] Session persistence working
- [ ] Profile creation/update working

## Security Considerations

1. **HTTPS in Production**: Always use HTTPS for OAuth redirects in production
2. **Secure Cookies**: Ensure secure cookie settings for session management
3. **CSRF Protection**: OAuth state parameter validation
4. **Rate Limiting**: Implement rate limiting for authentication attempts
5. **Audit Logging**: All authentication events are logged for security

## Support

If issues persist after following this guide:
1. Check `/auth/diagnostics` for detailed error information
2. Review browser console logs
3. Verify all configuration steps
4. Contact support with diagnostic information
\`\`\`

Finally, let's create a simple test page to verify OAuth configuration:
