# AVES Colombia - Supabase Integration Guide

## Overview

This guide provides comprehensive instructions for integrating Supabase authentication and database services into the AVES Colombia application. The integration supports multiple authentication methods and includes GDPR-compliant user data management.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Configuration](#configuration)
3. [Database Setup](#database-setup)
4. [Authentication Methods](#authentication-methods)
5. [Troubleshooting](#troubleshooting)
6. [GDPR Compliance](#gdpr-compliance)
7. [Testing](#testing)

## Prerequisites

- Supabase project created at [supabase.com](https://supabase.com)
- Next.js application with TypeScript
- Node.js 18+ installed

## Configuration

### Environment Variables

The application uses the following Supabase configuration:

\`\`\`typescript
NEXT_PUBLIC_SUPABASE_URL=https://vlizimtetekemaiivnsf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsaXppbXRldGVrZW1haWl2bnNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MTUwODMsImV4cCI6MjA2ODM5MTA4M30.tsrP54YBn3U5k_0xvqfvmleApNjFjKxO3u8iQc9n90E
\`\`\`

### Client Configuration

The Supabase client is configured with enhanced settings for optimal performance:

\`\`\`typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'aves-colombia-app'
    }
  }
})
\`\`\`

## Database Setup

### 1. Run the Setup Script

Execute the following SQL script in your Supabase SQL editor:

\`\`\`sql
-- Run scripts/supabase-setup.sql
-- This creates all necessary tables, policies, and functions
\`\`\`

### 2. Create Admin User

1. Create the admin user through Supabase Auth:
   - Email: `info@aves.bio`
   - Password: `MotMot2025!`

2. Run the admin setup script:
\`\`\`sql
-- Run scripts/create-admin-user.sql
-- This sets the admin role and permissions
\`\`\`

### 3. Verify Setup

Use the diagnostics page to verify the setup:
- Navigate to `/diagnostics`
- Check all system components
- Resolve any issues found

## Authentication Methods

### 1. Email/Password Authentication

Standard form-based authentication with email verification:

\`\`\`typescript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback`
  }
})
\`\`\`

### 2. Google OAuth

Social authentication with Google:

\`\`\`typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback?next=/shopping`
  }
})
\`\`\`

### 3. Magic Link

Passwordless authentication via email:

\`\`\`typescript
const { error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: `${window.location.origin}/auth/callback?next=/shopping`
  }
})
\`\`\`

## Troubleshooting

### "Tenant or user not found" Error

This error typically indicates one of the following issues:

#### 1. Incorrect Project Configuration
- **Symptom**: Error occurs immediately on connection
- **Solution**: Verify the Supabase URL and API key are correct
- **Check**: Ensure the project exists and is not paused

#### 2. Database Schema Missing
- **Symptom**: Authentication works but database queries fail
- **Solution**: Run the database setup scripts
- **Check**: Verify tables exist in the Supabase dashboard

#### 3. Network Connectivity Issues
- **Symptom**: Intermittent connection failures
- **Solution**: Check internet connection and firewall settings
- **Check**: Test direct access to Supabase dashboard

#### 4. Row Level Security Issues
- **Symptom**: Queries return empty results or permission errors
- **Solution**: Review and update RLS policies
- **Check**: Ensure policies allow appropriate access

### Diagnostic Tools

Use the built-in diagnostics page at `/diagnostics` to:
- Test database connectivity
- Verify authentication services
- Check table schema
- Validate admin user setup
- Monitor system health

### Common Solutions

1. **Clear Browser Cache**: Authentication tokens may be cached incorrectly
   \`\`\`javascript
   // Clear Supabase session
   await supabase.auth.signOut()
   localStorage.clear()
   sessionStorage.clear()
   \`\`\`

2. **Restart Development Server**: Configuration changes require restart
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

3. **Check Supabase Project Status**: Ensure project is active
   - Visit Supabase dashboard
   - Verify project is not paused
   - Check billing status

4. **Validate API Keys**: Ensure keys match the project
   \`\`\`typescript
   // Test connection
   const { data, error } = await supabase
     .from('profiles')
     .select('count', { count: 'exact', head: true })
   \`\`\`

5. **Review Database Logs**: Check for SQL errors
   - Go to Supabase Dashboard > Logs
   - Filter by database errors
   - Look for permission or schema issues

## GDPR Compliance

### Data Collection Consent

The application implements GDPR-compliant consent management:

\`\`\`typescript
// Required consent for account creation
gdpr_consent: boolean // Must be true to create account
marketing_consent: boolean // Optional marketing communications
\`\`\`

### Audit Logging

All user actions are logged for compliance:

\`\`\`typescript
export const logUserAction = async (userId: string, action: string, details?: any) => {
  await supabase.from("audit_logs").insert({
    user_id: userId,
    action,
    details,
    ip_address: await getUserIP(),
    user_agent: navigator.userAgent,
    created_at: new Date().toISOString(),
  })
}
\`\`\`

### Data Rights

Users have the following rights under GDPR:
- **Right to Access**: View their data through the user profile
- **Right to Rectification**: Update their information
- **Right to Erasure**: Request account deletion
- **Right to Portability**: Export their data
- **Right to Restrict Processing**: Limit data usage

### Data Retention

- User profiles: Retained until account deletion
- Booking data: Retained for 7 years for tax purposes
- Audit logs: Retained for 2 years for security purposes
- Marketing data: Deleted immediately upon consent withdrawal

## Testing

### Unit Tests

Test authentication functions:

\`\`\`typescript
// Test user registration
describe('User Registration', () => {
  it('should create user with valid data', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'testpassword123',
      firstName: 'Test',
      lastName: 'User'
    }
    
    const result = await signUpUser(userData)
    expect(result.success).toBe(true)
  })
})
\`\`\`

### Integration Tests

Test database operations:

\`\`\`typescript
// Test profile creation
describe('Profile Management', () => {
  it('should create profile after signup', async () => {
    const user = await createTestUser()
    const profile = await getProfile(user.id)
    
    expect(profile).toBeDefined()
    expect(profile.email).toBe(user.email)
  })
})
\`\`\`

### End-to-End Tests

Test complete authentication flow:

\`\`\`typescript
// Test complete signup flow
describe('Authentication Flow', () => {
  it('should complete signup and redirect', async () => {
    await page.goto('/shopping')
    await page.click('[data-testid="create-account"]')
    
    // Fill form
    await page.fill('#firstName', 'Test')
    await page.fill('#lastName', 'User')
    await page.fill('#email', 'test@example.com')
    await page.fill('#password', 'testpassword123')
    await page.check('#gdprConsent')
    
    await page.click('button[type="submit"]')
    
    // Verify success message
    await expect(page.locator('.success-message')).toBeVisible()
  })
})
\`\`\`

## Security Best Practices

### 1. Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

\`\`\`sql
-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Admins can access all data
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
\`\`\`

### 2. Input Validation

All user inputs are validated:

\`\`\`typescript
// Email validation
if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  throw new Error("Invalid email format")
}

// Password strength
if (password.length < 6) {
  throw new Error("Password must be at least 6 characters")
}
\`\`\`

### 3. Error Handling

Sensitive information is not exposed in error messages:

\`\`\`typescript
export const handleSupabaseError = (error: any) => {
  // Log full error for debugging
  console.error("Supabase Error:", error)
  
  // Return user-friendly message
  if (error?.message?.includes("Tenant or user not found")) {
    return "Connection failed. Please try again."
  }
  
  return "An unexpected error occurred."
}
\`\`\`

## Monitoring and Analytics

### Performance Monitoring

Track key metrics:
- Authentication success/failure rates
- Database query performance
- User registration conversion
- Error rates by type

### User Analytics

Monitor user behavior:
- Registration sources (Google, email, magic link)
- Feature usage patterns
- Booking conversion rates
- Support ticket correlation

## Support and Maintenance

### Regular Tasks

1. **Weekly**: Review error logs and user feedback
2. **Monthly**: Update dependencies and security patches
3. **Quarterly**: Review and update privacy policies
4. **Annually**: Security audit and penetration testing

### Emergency Procedures

1. **Data Breach**: Follow incident response plan
2. **Service Outage**: Activate backup systems
3. **Security Vulnerability**: Apply patches immediately
4. **GDPR Request**: Process within 30 days

## Contact Information

For technical support or questions about this integration:

- **Development Team**: dev@aves.bio
- **System Administrator**: admin@aves.bio
- **Privacy Officer**: privacy@aves.bio
- **Emergency Contact**: +57 XXX XXX XXXX

---

*Last updated: January 2025*
*Version: 1.0.0*
