# Software Requirements Specification (SRS)
## AVES Colombia - Bird Watching & Eco-Tourism Platform

**Document Version:** 1.0  
**Date:** January 2025  
**Prepared by:** AVES Colombia Development Team  

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [Specific Requirements](#3-specific-requirements)
4. [External Interface Requirements](#4-external-interface-requirements)
5. [System Architecture](#5-system-architecture)
6. [Appendices](#6-appendices)

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) document provides a comprehensive description of the AVES Colombia bird watching and eco-tourism platform. It details the functional and non-functional requirements, system architecture, and interface specifications for the web application as currently implemented.

### 1.2 Scope
The AVES Colombia platform is a Next.js-based web application that serves as a comprehensive platform for:
- Showcasing Colombian bird watching and eco-tourism experiences
- Providing educational content about Colombian biodiversity
- Managing user accounts and bookings
- Facilitating tour discovery and planning
- Supporting conservation initiatives and community partnerships

### 1.3 Definitions, Acronyms, and Abbreviations
- **AVES**: The company name, meaning "birds" in Spanish
- **SRS**: Software Requirements Specification
- **UI**: User Interface
- **API**: Application Programming Interface
- **RLS**: Row Level Security
- **B Corp**: Benefit Corporation certification
- **SNSM**: Sierra Nevada de Santa Marta
- **CTA**: Call to Action
- **CRUD**: Create, Read, Update, Delete operations

### 1.4 References
- Next.js 15 Documentation
- Supabase Documentation
- Tailwind CSS Documentation
- shadcn/ui Component Library
- Web Content Accessibility Guidelines (WCAG) 2.1

### 1.5 Overview
This document is organized into sections covering the overall system description, specific functional and non-functional requirements, external interfaces, and system architecture. Each section provides detailed information about the current implementation of the AVES Colombia platform.

---

## 2. Overall Description

### 2.1 Product Perspective
The AVES Colombia platform is a standalone web application built using modern web technologies. It serves as the primary digital presence for AVES Colombia, a B Corp certified eco-tourism company specializing in bird watching tours in Colombia.

#### 2.1.1 System Context
- **Frontend**: Next.js 15 with React Server Components
- **Backend**: Supabase (PostgreSQL database, authentication, storage)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Deployment**: Vercel platform
- **External Integrations**: YouTube API, audio/video streaming, email services

#### 2.1.2 User Classes
1. **Anonymous Visitors**: Users browsing without authentication
2. **Registered Users**: Authenticated users with accounts
3. **Tour Participants**: Users who have booked tours
4. **Content Administrators**: Internal users managing content (implied)

### 2.2 Product Functions

#### 2.2.1 Core Functionality
1. **Tour Discovery and Information**
   - Browse tour categories (Adventure, Elevate, Souls, Vision)
   - View detailed tour pages with itineraries, species information, and pricing
   - Access regional birding information (Caribbean, Andes, Amazon, etc.)

2. **Educational Content**
   - Interactive bird species explorer with 1,900+ species
   - Bioregion information and mapping
   - Conservation project details
   - Blog articles about birding experiences

3. **User Account Management**
   - User registration and authentication via Supabase Auth
   - Profile management with personal information
   - Booking history and management
   - Account settings and preferences

4. **Booking and Planning**
   - Tour inquiry and booking system
   - Calendar integration for tour availability
   - Custom trip planning tools
   - Contact forms for personalized assistance

5. **Multimedia Content**
   - Bird photography galleries with optimized images
   - Audio recordings of bird calls
   - Video backgrounds and promotional content
   - Interactive carousels and media players

#### 2.2.2 Supporting Features
- Mobile-responsive design across all devices
- Cookie consent and privacy management
- Multi-language support preparation (English/Spanish)
- SEO optimization with structured data
- Performance monitoring and analytics
- Error boundary handling and graceful degradation

### 2.3 User Characteristics

#### 2.3.1 Primary Users
- **Bird Watching Enthusiasts**: Experienced birders seeking specialized tours
- **Nature Photographers**: Users interested in wildlife photography opportunities
- **Eco-Tourists**: Environmentally conscious travelers
- **Educational Groups**: Schools, universities, and research organizations

#### 2.3.2 User Expertise Levels
- **Beginner Birders**: New to bird watching, need educational content
- **Intermediate Birders**: Some experience, seeking guided tours
- **Expert Birders**: Highly experienced, interested in endemic species
- **Professional Researchers**: Scientists and conservationists

#### 2.3.3 Geographic Distribution
- **Primary Markets**: North America (USA, Canada)
- **Secondary Markets**: Europe, Australia
- **Local Market**: Colombian nationals and residents

### 2.4 Constraints

#### 2.4.1 Technical Constraints
- Must be compatible with modern web browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design requirements
- Performance targets: <3 second initial load time
- Accessibility compliance with WCAG 2.1 AA standards
- SEO optimization for search engine visibility

#### 2.4.2 Business Constraints
- B Corp certification compliance requirements
- Carbon neutral tour operations
- Small group tour limitations (maximum 4 guests)
- Seasonal availability constraints for certain tours
- Partnership agreements with local lodges and guides

#### 2.4.3 Regulatory Constraints
- GDPR compliance for European users
- Privacy policy and cookie consent requirements
- Terms of service and legal disclaimers
- Colombian tourism regulation compliance

### 2.5 Assumptions and Dependencies

#### 2.5.1 Assumptions
- Users have reliable internet connectivity
- Modern web browsers with JavaScript enabled
- Email access for account verification and communications
- Basic computer/mobile device literacy

#### 2.5.2 Dependencies
- Supabase service availability and performance
- Vercel hosting platform reliability
- Third-party media content (YouTube, audio files)
- External API services for maps and location data
- Email service provider for notifications

---

## 3. Specific Requirements

### 3.1 Functional Requirements

#### 3.1.1 User Authentication and Account Management

**FR-1.1: User Registration**
- Users can create accounts using email and password
- Email verification required for account activation
- Profile creation with personal information fields
- Integration with Supabase Auth system

**FR-1.2: User Login/Logout**
- Secure login with email/password combination
- Session management with automatic timeout
- Remember me functionality for convenience
- Logout capability from any page

**FR-1.3: Profile Management**
- Users can view and edit personal information
- Profile picture upload and management
- Birding experience level selection
- Travel preferences and interests

**FR-1.4: Password Management**
- Password reset via email link
- Password strength requirements
- Secure password storage with encryption

#### 3.1.2 Tour Discovery and Information

**FR-2.1: Tour Catalog**
- Display of four main tour categories (Adventure, Elevate, Souls, Vision)
- Tour comparison functionality
- Filtering by duration, difficulty, and region
- Search capability across tour content

**FR-2.2: Tour Detail Pages**
- Comprehensive tour information including:
  - Detailed itineraries with day-by-day breakdown
  - Target species lists with images and descriptions
  - Accommodation details and photos
  - Pricing and availability information
  - Guide profiles and expertise
  - Testimonials and reviews

**FR-2.3: Regional Information**
- Bioregion explorer with interactive elements
- Regional bird species information
- Climate and best visiting times
- Conservation status and efforts

#### 3.1.3 Species and Educational Content

**FR-3.1: Bird Species Explorer**
- Database of 1,900+ Colombian bird species
- Species filtering by region, family, and characteristics
- High-quality images and audio recordings
- Conservation status and habitat information
- Endemic species highlighting

**FR-3.2: Interactive Maps**
- Bioregion mapping with clickable areas
- Tour location visualization
- Species distribution maps
- Conservation area information

**FR-3.3: Educational Resources**
- Blog articles about birding experiences
- Travel tips and preparation guides
- Conservation project information
- Partnership organization details

#### 3.1.4 Booking and Inquiry System

**FR-4.1: Tour Inquiries**
- Contact forms for tour information requests
- Custom trip planning questionnaires
- Automated email responses
- Lead tracking and management

**FR-4.2: Booking Management**
- Tour availability calendar
- Booking confirmation system
- Payment integration preparation
- Booking modification and cancellation

**FR-4.3: Communication**
- Email notifications for bookings
- Tour reminder communications
- Newsletter subscription management
- Customer support contact options

#### 3.1.5 Content Management

**FR-5.1: Dynamic Content**
- Blog post creation and management
- Species information updates
- Tour schedule modifications
- Photo and media gallery management

**FR-5.2: Multimedia Handling**
- Image optimization and responsive delivery
- Audio player for bird calls
- Video background integration
- Gallery and carousel functionality

### 3.2 Non-Functional Requirements

#### 3.2.1 Performance Requirements

**NFR-1.1: Response Time**
- Page load time: <3 seconds for initial load
- Navigation between pages: <1 second
- Search results: <2 seconds
- Image loading: Progressive with lazy loading

**NFR-1.2: Throughput**
- Support for 1,000 concurrent users
- Database query optimization
- CDN utilization for static assets
- Efficient caching strategies

**NFR-1.3: Scalability**
- Horizontal scaling capability
- Database performance optimization
- Load balancing preparation
- Resource usage monitoring

#### 3.2.2 Reliability Requirements

**NFR-2.1: Availability**
- 99.9% uptime target
- Graceful degradation during outages
- Error boundary implementation
- Backup and recovery procedures

**NFR-2.2: Error Handling**
- Comprehensive error logging
- User-friendly error messages
- Automatic error reporting
- Recovery mechanisms

#### 3.2.3 Security Requirements

**NFR-3.1: Authentication Security**
- Secure password storage with hashing
- Session management with timeout
- Protection against brute force attacks
- Two-factor authentication preparation

**NFR-3.2: Data Protection**
- HTTPS encryption for all communications
- Input validation and sanitization
- SQL injection prevention
- XSS attack protection

**NFR-3.3: Privacy Compliance**
- GDPR compliance implementation
- Cookie consent management
- Data retention policies
- User data deletion capabilities

#### 3.2.4 Usability Requirements

**NFR-4.1: User Interface**
- Intuitive navigation structure
- Consistent design language
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1 AA)

**NFR-4.2: User Experience**
- Clear call-to-action elements
- Logical information hierarchy
- Fast and smooth interactions
- Helpful error messages and guidance

#### 3.2.5 Compatibility Requirements

**NFR-5.1: Browser Support**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

**NFR-5.2: Device Support**
- Desktop computers (1024px+ width)
- Tablets (768px-1023px width)
- Mobile phones (320px-767px width)
- Touch and mouse input support

**NFR-5.3: Operating System Support**
- Windows 10+
- macOS 10.15+
- iOS 13+
- Android 8+

---

## 4. External Interface Requirements

### 4.1 User Interfaces

#### 4.1.1 Web Interface Specifications

**UI-1.1: Homepage Interface**
- Hero section with video background capability
- Navigation header with logo and menu items
- Bird species carousel with auto-play functionality
- Bioregion explorer cards with hover effects
- Social proof section with rotating testimonials
- Footer with comprehensive links and information

**UI-1.2: Tour Pages Interface**
- Tour header with hero image/video
- Tabbed navigation for different tour aspects
- Interactive itinerary timeline
- Species gallery with lightbox functionality
- Accommodation showcase with image galleries
- Booking call-to-action sections

**UI-1.3: User Account Interface**
- Account dashboard with navigation sidebar
- Profile editing forms with validation
- Booking history with status indicators
- Settings panel with privacy controls
- Responsive design for mobile devices

**UI-1.4: Species Explorer Interface**
- Search and filter controls
- Grid/list view toggle
- Species detail modal windows
- Audio player controls for bird calls
- Image zoom and gallery functionality
- Conservation status indicators

#### 4.1.2 Mobile Interface Specifications

**UI-2.1: Mobile Navigation**
- Hamburger menu with slide-out navigation
- Touch-optimized button sizes (44px minimum)
- Swipe gestures for carousels and galleries
- Mobile-specific layout adaptations

**UI-2.2: Mobile Interactions**
- Touch-friendly form controls
- Optimized image loading for mobile bandwidth
- Simplified navigation patterns
- Mobile-specific call-to-action placement

### 4.2 Hardware Interfaces

#### 4.2.1 Client Device Requirements
- Minimum screen resolution: 320px width
- Touch screen capability for mobile devices
- Audio output capability for bird call playback
- Camera access for potential future features
- GPS capability for location-based features

### 4.3 Software Interfaces

#### 4.3.1 Database Interface (Supabase)

**SI-1.1: Authentication Service**
- User registration and login endpoints
- Session management and token handling
- Password reset functionality
- User profile data synchronization

**SI-1.2: Database Operations**
- PostgreSQL database with Row Level Security
- Real-time subscriptions for live data
- File storage for images and media
- Backup and recovery services

**SI-1.3: API Endpoints**
\`\`\`
Authentication:
- POST /auth/signup
- POST /auth/signin
- POST /auth/signout
- POST /auth/reset-password

User Profiles:
- GET /api/profiles/{id}
- PUT /api/profiles/{id}
- DELETE /api/profiles/{id}

Bookings:
- GET /api/bookings
- POST /api/bookings
- PUT /api/bookings/{id}
- DELETE /api/bookings/{id}

Content:
- GET /api/tours
- GET /api/species
- GET /api/regions
- GET /api/blog-posts
\`\`\`

#### 4.3.2 External Service Interfaces

**SI-2.1: Email Service Integration**
- SMTP configuration for transactional emails
- Email template management
- Delivery status tracking
- Bounce and complaint handling

**SI-2.2: Media Service Integration**
- YouTube API for video content
- Image optimization and CDN delivery
- Audio streaming for bird calls
- File upload and processing

**SI-2.3: Analytics and Monitoring**
- Performance monitoring integration
- User behavior tracking
- Error reporting and logging
- SEO and search console integration

### 4.4 Communication Interfaces

#### 4.4.1 Network Protocols
- HTTPS for all client-server communication
- WebSocket connections for real-time features
- RESTful API design patterns
- JSON data format for API responses

#### 4.4.2 Data Formats
- JSON for API data exchange
- HTML5 for web content structure
- CSS3 for styling and animations
- JavaScript ES2022+ for client-side logic

---

## 5. System Architecture

### 5.1 Architectural Overview

#### 5.1.1 System Architecture Pattern
The AVES Colombia platform follows a modern web application architecture with the following key characteristics:

- **Frontend Architecture**: Next.js 15 with App Router
- **Rendering Strategy**: Hybrid Server-Side Rendering (SSR) and Client-Side Rendering (CSR)
- **Component Architecture**: React Server Components with Client Components
- **State Management**: React hooks and context for local state
- **Styling Architecture**: Utility-first CSS with Tailwind CSS

#### 5.1.2 High-Level System Components

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    Client Browser                           │
├─────────────────────────────────────────────────────────────┤
│  Next.js Frontend Application (Vercel)                     │
│  ├── App Router (app/)                                      │
│  ├── React Server Components                               │
│  ├── Client Components                                     │
│  ├── API Routes (/api)                                     │
│  └── Static Assets                                         │
├─────────────────────────────────────────────────────────────┤
│  Supabase Backend Services                                 │
│  ├── PostgreSQL Database                                   │
│  ├── Authentication Service                                │
│  ├── Storage Service                                       │
│  ├── Real-time Subscriptions                              │
│  └── Row Level Security (RLS)                             │
├─────────────────────────────────────────────────────────────┤
│  External Services                                          │
│  ├── Email Service Provider                                │
│  ├── YouTube API                                           │
│  ├── CDN for Media Assets                                  │
│  └── Analytics Services                                    │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 5.2 Component Architecture

#### 5.2.1 Frontend Component Structure

\`\`\`
app/
├── layout.tsx                 # Root layout with providers
├── page.tsx                   # Homepage
├── loading.tsx                # Global loading component
├── not-found.tsx             # 404 error page
├── globals.css               # Global styles
├── tours/
│   ├── page.tsx              # Tours listing
│   ├── adventure/
│   ├── elevate/
│   ├── souls/
│   └── vision/
├── regions/
│   └── caribbean/
├── species/
├── blog/
├── account/
│   ├── settings/
│   ├── bookings/
│   └── billing/
├── contact/
├── about/
└── api/                      # API routes

components/
├── ui/                       # shadcn/ui components
├── auth/                     # Authentication components
├── navigation-header.tsx     # Main navigation
├── footer.tsx               # Site footer
├── homepage-bird-carousel.tsx
├── species-explorer.tsx
└── [feature-components]/

lib/
├── utils.ts                  # Utility functions
├── supabase.ts              # Supabase client
├── profile-service.ts       # Profile operations
└── booking-service.ts       # Booking operations
\`\`\`

#### 5.2.2 Database Schema Architecture

**Core Tables:**
\`\`\`sql
-- Authentication (managed by Supabase Auth)
auth.users
├── id (uuid, primary key)
├── email
├── created_at
└── updated_at

-- User Profiles
user_profiles
├── id (uuid, primary key)
├── auth_user_id (uuid, foreign key to auth.users.id)
├── first_name
├── last_name
├── phone
├── country
├── birding_experience
├── created_at
└── updated_at

-- Bookings
bookings
├── id (uuid, primary key)
├── user_id (uuid, foreign key to user_profiles.id)
├── tour_type
├── travel_date
├── group_size
├── status
├── created_at
└── updated_at
\`\`\`

### 5.3 Data Flow Architecture

#### 5.3.1 Authentication Flow
\`\`\`
1. User Registration/Login
   ├── Frontend form submission
   ├── Supabase Auth processing
   ├── JWT token generation
   ├── User profile creation/retrieval
   └── Session establishment

2. Authenticated Requests
   ├── JWT token validation
   ├── User identity resolution
   ├── RLS policy enforcement
   └── Data access authorization
\`\`\`

#### 5.3.2 Content Delivery Flow
\`\`\`
1. Static Content
   ├── Next.js build process
   ├── Static generation (SSG)
   ├── Vercel CDN distribution
   └── Browser caching

2. Dynamic Content
   ├── Server-side rendering (SSR)
   ├── Database queries
   ├── Component hydration
   └── Client-side updates
\`\`\`

### 5.4 Security Architecture

#### 5.4.1 Authentication and Authorization
- **Supabase Auth**: JWT-based authentication system
- **Row Level Security**: Database-level access control
- **Session Management**: Secure token handling and refresh
- **Role-Based Access**: User role and permission system

#### 5.4.2 Data Protection
- **Encryption**: HTTPS/TLS for data in transit
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content sanitization and CSP headers

### 5.5 Performance Architecture

#### 5.5.1 Optimization Strategies
- **Code Splitting**: Dynamic imports and lazy loading
- **Image Optimization**: Next.js Image component with WebP
- **Caching**: Browser caching and CDN distribution
- **Database Optimization**: Query optimization and indexing

#### 5.5.2 Monitoring and Analytics
- **Performance Monitoring**: Core Web Vitals tracking
- **Error Tracking**: Comprehensive error logging
- **User Analytics**: Behavior tracking and insights
- **Uptime Monitoring**: Service availability tracking

---

## 6. Appendices

### 6.1 Technology Stack Details

#### 6.1.1 Frontend Technologies
- **Next.js 15**: React framework with App Router
- **React 18**: Component library with Server Components
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library built on Radix UI
- **Lucide React**: Icon library

#### 6.1.2 Backend Technologies
- **Supabase**: Backend-as-a-Service platform
- **PostgreSQL**: Relational database system
- **Row Level Security**: Database-level security
- **Supabase Auth**: Authentication service
- **Supabase Storage**: File storage service

#### 6.1.3 Development and Deployment
- **Vercel**: Hosting and deployment platform
- **Git**: Version control system
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

### 6.2 API Reference

#### 6.2.1 Authentication Endpoints
\`\`\`typescript
// User registration
POST /auth/signup
Body: { email: string, password: string }
Response: { user: User, session: Session }

// User login
POST /auth/signin
Body: { email: string, password: string }
Response: { user: User, session: Session }

// Password reset
POST /auth/reset-password
Body: { email: string }
Response: { message: string }
\`\`\`

#### 6.2.2 Profile Management Endpoints
\`\`\`typescript
// Get user profile
GET /api/profiles/{id}
Headers: { Authorization: Bearer <token> }
Response: { profile: UserProfile }

// Update user profile
PUT /api/profiles/{id}
Headers: { Authorization: Bearer <token> }
Body: { first_name?: string, last_name?: string, ... }
Response: { profile: UserProfile }
\`\`\`

#### 6.2.3 Booking Endpoints
\`\`\`typescript
// Create booking
POST /api/bookings
Headers: { Authorization: Bearer <token> }
Body: { tour_type: string, travel_date: string, ... }
Response: { booking: Booking }

// Get user bookings
GET /api/bookings
Headers: { Authorization: Bearer <token> }
Response: { bookings: Booking[] }
\`\`\`

### 6.3 Database Schema Reference

#### 6.3.1 Table Definitions
\`\`\`sql
-- User Profiles Table
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    country TEXT,
    birding_experience TEXT,
    travel_preferences JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    tour_type TEXT NOT NULL,
    travel_date DATE,
    group_size INTEGER,
    duration TEXT,
    special_requests TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### 6.3.2 Row Level Security Policies
\`\`\`sql
-- User profiles RLS
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = auth_user_id);

-- Bookings RLS
CREATE POLICY "Users can view own bookings" ON bookings
    FOR SELECT USING (
        user_id IN (
            SELECT id FROM user_profiles 
            WHERE auth_user_id = auth.uid()
        )
    );
\`\`\`

### 6.4 Component Library Reference

#### 6.4.1 Custom Components
- **NavigationHeader**: Main site navigation with mobile support
- **Footer**: Site footer with links and information
- **HomepageBirdCarousel**: Rotating bird species showcase
- **SpeciesExplorer**: Interactive bird species browser
- **TourComparison**: Side-by-side tour comparison
- **BookingForm**: Tour inquiry and booking form
- **UserAccountPanel**: Account management interface

#### 6.4.2 UI Components (shadcn/ui)
- **Button**: Various button styles and sizes
- **Card**: Content containers with consistent styling
- **Dialog**: Modal dialogs and overlays
- **Form**: Form components with validation
- **Input**: Text input fields with validation
- **Select**: Dropdown selection components
- **Tabs**: Tabbed content organization
- **Carousel**: Image and content carousels

### 6.5 Deployment and Configuration

#### 6.5.1 Environment Variables
\`\`\`bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://aves-colombia.com
ENCRYPTION_KEY=your-encryption-key

# External Services
EMAIL_SERVICE_API_KEY=your-email-api-key
ANALYTICS_ID=your-analytics-id
\`\`\`

#### 6.5.2 Build Configuration
\`\`\`javascript
// next.config.mjs
const nextConfig = {
  images: {
    domains: ['your-supabase-project.supabase.co'],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    serverActions: true,
  },
};
\`\`\`

---

**Document Control:**
- **Version**: 1.0
- **Last Updated**: January 2025
- **Next Review**: March 2025
- **Approved By**: AVES Colombia Development Team

This SRS document serves as the definitive reference for the AVES Colombia platform's current implementation, providing comprehensive documentation for developers, testers, and stakeholders involved in the system's maintenance and evolution.
