# AVES Colombia - Authentication Setup Guide

## Overview

This comprehensive guide addresses the three main authentication issues encountered in the AVES Colombia application and provides step-by-step solutions for each problem.

## Issues Addressed

1. **Google Sign-In**: "Unsupported provider: provider is not enabled" error
2. **Magic Link Authentication**: "ERR_CONNECTION_REFUSED" error after clicking magic link
3. **Email/Password Authentication**: Verification email not being sent and login issues

---

## 1. Google Sign-In Configuration

### Root Cause Analysis
The "Unsupported provider: provider is not enabled" error occurs because:
- Google OAuth provider is not enabled in the Supabase project
- Missing or incorrect Google OAuth credentials
- Incorrect redirect URI configuration

### Solution Steps

#### Step 1: Configure Google Cloud Console

1. **Create Google Cloud Project** (if not exists):
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API (legacy) or Google Identity API

2. **Create OAuth 2.0 Credentials**:
   - Navigate to APIs & Services → Credentials
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add authorized redirect URIs:
     \`\`\`
     https://vlizimtetekemaiivnsf.supabase.co/auth/v1/callback
     \`\`\`
   - Save and copy the Client ID and Client Secret

#### Step 2: Configure Supabase

1. **Enable Google Provider**:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard/project/vlizimtetekemaiivnsf/auth/providers)
   - Find "Google" in the providers list
   - Toggle it ON
   - Enter your Google OAuth credentials:
     - **Client ID**: From Google Cloud Console
     - **Client Secret**: From Google Cloud Console
   - Save configuration

2. **Verify Configuration**:
   \`\`\`typescript
   // Test Google OAuth availability
   const { data, error } = await supabase.auth.signInWithOAuth({
     provider: 'google',
     options: {
       skipBrowserRedirect: true // Just test, don't redirect
     }
   })
   \`\`\`

#### Step 3: Update Application Code

The application code has been updated with enhanced error handling:

\`\`\`typescript
export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${getOrigin()}/auth/callback?next=/shopping`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    })

    if (error) throw error
    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Google sign in error:", error)
    return { success: false, data: null, error: handleSupabaseError(error) }
  }
}
\`\`\`

---

## 2. Magic Link Authentication Configuration

### Root Cause Analysis
The "ERR_CONNECTION_REFUSED" error occurs because:
- Incorrect Site URL configuration in Supabase
- Missing or wrong redirect URLs
- Local development server not running on expected port
- Firewall blocking localhost connections

### Solution Steps

#### Step 1: Configure Supabase URLs

1. **Set Site URL**:
   - Go to [Supabase Dashboard → Settings → Auth](https://supabase.com/dashboard/project/vlizimtetekemaiivnsf/settings/auth)
   - Set **Site URL** to:
     - Development: `http://localhost:3000`
     - Production: `https://aves-colombia.vercel.app`

2. **Configure Redirect URLs**:
   - In the same Auth settings page
   - Add **Redirect URLs**:
     \`\`\`
     http://localhost:3000/auth/callback
     https://aves-colombia.vercel.app/auth/callback
     http://localhost:3000/auth/callback?next=/shopping
     https://aves-colombia.vercel.app/auth/callback?next=/shopping
     \`\`\`

#### Step 2: Update Email Templates

1. **Customize Email Templates**:
   - Go to [Supabase Dashboard → Authentication → Email Templates](https://supabase.com/dashboard/project/vlizimtetekemaiivnsf/auth/templates)
   - Edit "Magic Link" template
   - Ensure the link uses: `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=magiclink`

#### Step 3: Local Development Setup

1. **Ensure Development Server**:
   \`\`\`bash
   # Make sure your dev server runs on port 3000
   npm run dev
   # or
   yarn dev
   \`\`\`

2. **Test Local Connection**:
   \`\`\`bash
   # Test if localhost:3000 is accessible
   curl http://localhost:3000
   \`\`\`

#### Step 4: Enhanced Magic Link Function

\`\`\`typescript
export const signInWithMagicLink = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.toLowerCase(),
      options: {
        emailRedirectTo: `${getOrigin()}/auth/callback?next=/shopping`,
      },
    })

    if (error) throw error
    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Magic link error:", error)
    return { success: false, data: null, error: handleSupabaseError(error) }
  }
}
\`\`\`

---

## 3. Email/Password Authentication Configuration

### Root Cause Analysis
Email verification issues occur because:
- SMTP configuration not set up in Supabase
- Email confirmation disabled
- Incorrect email template configuration
- Email service provider blocking emails

### Solution Steps

#### Step 1: Configure SMTP Settings

1. **Option A: Use Supabase Built-in Email** (Recommended for development):
   - Go to [Supabase Dashboard → Settings → Auth](https://supabase.com/dashboard/project/vlizimtetekemaiivnsf/settings/auth)
   - Ensure "Enable custom SMTP" is **DISABLED**
   - Supabase will use their default email service

2. **Option B: Configure Custom SMTP** (For production):
   - Enable "Enable custom SMTP"
   - Configure with your email provider:
     \`\`\`
     SMTP Host: smtp.gmail.com (for Gmail)
     SMTP Port: 587
     SMTP User: your-email@gmail.com
     SMTP Pass: your-app-password
     SMTP Admin Email: info@aves.bio
     \`\`\`

#### Step 2: Configure Email Confirmation

1. **Enable Email Confirmation**:
   - In Auth settings, ensure "Enable email confirmations" is **ON**
   - Set "Confirm email change" to **ON** if desired

2. **Configure Email Templates**:
   - Go to [Email Templates](https://supabase.com/dashboard/project/vlizimtetekemaiivnsf/auth/templates)
   - Edit "Confirm signup" template
   - Ensure redirect URL: `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=signup`

#### Step 3: Enhanced Email/Password Functions

\`\`\`typescript
export const signUpWithEmail = async (userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  experienceLevel?: string
}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email.toLowerCase(),
      password: userData.password,
      options: {
        data: {
          full_name: `${userData.firstName} ${userData.lastName}`,
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone || "",
          experience_level: userData.experienceLevel || "Beginner birder",
        },
        emailRedirectTo: `${getOrigin()}/auth/callback`,
      },
    })

    if (error) throw error
    return { success: true, data, error: null }
  } catch (error: any) {
    console.error("Sign up error:", error)
    return { success: false, data: null, error: handleSupabaseError(error) }
  }
}
\`\`\`

---

## Testing and Validation

### 1. Google Sign-In Testing

\`\`\`typescript
// Test Google OAuth configuration
const testGoogleAuth = async () => {
  try {
    const result = await signInWithGoogle()
    if (result.success) {
      console.log("Google OAuth configured correctly")
    } else {
      console.error("Google OAuth error:", result.error)
    }
  } catch (error) {
    console.error("Google OAuth test failed:", error)
  }
}
\`\`\`

### 2. Magic Link Testing

\`\`\`typescript
// Test magic link functionality
const testMagicLink = async () => {
  try {
    const result = await signInWithMagicLink("test@example.com")
    if (result.success) {
      console.log("Magic link sent successfully")
    } else {
      console.error("Magic link error:", result.error)
    }
  } catch (error) {
    console.error("Magic link test failed:", error)
  }
}
\`\`\`

### 3. Email/Password Testing

\`\`\`typescript
// Test email signup
const testEmailSignup = async () => {
  try {
    const result = await signUpWithEmail({
      email: "test@example.com",
      password: "testpassword123",
      firstName: "Test",
      lastName: "User"
    })
    if (result.success) {
      console.log("Email signup successful")
    } else {
      console.error("Email signup error:", result.error)
    }
  } catch (error) {
    console.error("Email signup test failed:", error)
  }
}
\`\`\`

---

## Diagnostics and Monitoring

### Using the Diagnostics Page

1. **Access Diagnostics**:
   - Navigate to `/diagnostics` in your application
   - Run comprehensive system tests
   - Review any failed checks

2. **Common Issues and Solutions**:
   - **Red Status**: Critical issues requiring immediate attention
   - **Yellow Status**: Warnings that should be addressed
   - **Green Status**: All systems functioning correctly

### Manual Verification Checklist

- [ ] Google OAuth provider enabled in Supabase
- [ ] Google Cloud Console credentials configured
- [ ] Site URL set correctly in Supabase Auth settings
- [ ] Redirect URLs configured for all environments
- [ ] SMTP settings configured (or using Supabase default)
- [ ] Email confirmation enabled
- [ ] Email templates configured with correct redirect URLs
- [ ] Database tables exist and RLS policies are set
- [ ] Admin user created and configured

---

## Production Deployment Considerations

### Environment Variables

Ensure these environment variables are set in production:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=https://vlizimtetekemaiivnsf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=https://aves-colombia.vercel.app
\`\`\`

### Security Considerations

1. **HTTPS Only**: Ensure all production URLs use HTTPS
2. **CORS Configuration**: Configure allowed origins in Supabase
3. **Rate Limiting**: Monitor and adjust rate limits as needed
4. **Email Deliverability**: Use a reputable SMTP provider for production

### Monitoring and Alerts

1. **Set up monitoring** for authentication failures
2. **Configure alerts** for high error rates
3. **Monitor email delivery** rates and bounces
4. **Track user registration** and conversion metrics

---

## Support and Troubleshooting

### Common Error Messages and Solutions

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Unsupported provider: provider is not enabled" | Google OAuth not configured | Enable Google provider in Supabase |
| "ERR_CONNECTION_REFUSED" | Wrong redirect URL | Update Site URL and Redirect URLs |
| "Email not confirmed" | User hasn't verified email | Resend confirmation email |
| "SMTP configuration error" | Email service not set up | Configure SMTP or use Supabase default |
| "Invalid login credentials" | Wrong email/password | Check credentials and account status |

### Getting Help

1. **Check Diagnostics Page**: `/diagnostics` for automated troubleshooting
2. **Review Supabase Logs**: Dashboard → Logs for detailed error information
3. **Test in Isolation**: Use the provided test functions to isolate issues
4. **Contact Support**: If issues persist, contact the development team

---

*Last updated: January 2025*
*Version: 2.0.0*
