# AVES Colombia - Supabase Database Implementation Report

## Executive Summary

This comprehensive report analyzes the current Supabase database implementation for the AVES Colombia birding tour platform and identifies critical gaps preventing the booking functionality from operating correctly. The analysis reveals significant schema inconsistencies, missing security policies, and incomplete data relationships that must be addressed to enable full booking capabilities.

## 1. Database Audit

### 1.1 Current Schema Analysis

#### Existing Tables Assessment

**user_profiles Table:**
- **Current Structure:** Contains basic user information with auth_user_id reference
- **Missing Critical Fields:**
  - `birding_experience` (TEXT) - Essential for tour matching
  - `preferred_contact_method` (TEXT) - Communication preferences
  - `travel_insurance_required` (BOOLEAN) - Legal compliance
  - `group_size_preference` (INTEGER) - Tour planning
  - `accessibility_requirements` (TEXT) - Inclusive tour design

**bookings Table:**
- **Current Structure:** Basic booking information with user_id reference
- **Critical Issues Identified:**
  - Foreign key references `auth.users(id)` instead of `user_profiles(id)`
  - Missing `booking_reference` field for unique identification
  - No `deposit_amount` or `payment_status` tracking
  - Missing `tour_guide_assigned` field
  - No `special_dietary_requirements` field
  - Missing `group_booking_id` for family/group bookings

#### Missing Tables

**1. tour_packages Table**
\`\`\`sql
CREATE TABLE tour_packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    duration_days INTEGER NOT NULL,
    max_participants INTEGER NOT NULL,
    base_price DECIMAL(10,2) NOT NULL,
    difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'moderate', 'challenging')),
    regions TEXT[] DEFAULT ARRAY[]::TEXT[],
    target_species TEXT[] DEFAULT ARRAY[]::TEXT[],
    included_services JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

**2. booking_payments Table**
\`\`\`sql
CREATE TABLE booking_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    payment_method TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    transaction_id TEXT UNIQUE,
    payment_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

**3. tour_availability Table**
\`\`\`sql
CREATE TABLE tour_availability (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tour_package_id UUID NOT NULL REFERENCES tour_packages(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    available_spots INTEGER NOT NULL,
    price_override DECIMAL(10,2),
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'full', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

**4. booking_participants Table**
\`\`\`sql
CREATE TABLE booking_participants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    participant_name TEXT NOT NULL,
    participant_email TEXT,
    participant_phone TEXT,
    age_group TEXT CHECK (age_group IN ('child', 'adult', 'senior')),
    dietary_restrictions TEXT,
    medical_conditions TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
\`\`\`

**5. booking_communications Table**
\`\`\`sql
CREATE TABLE booking_communications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    communication_type TEXT NOT NULL CHECK (communication_type IN ('email', 'sms', 'whatsapp', 'call')),
    subject TEXT,
    message TEXT NOT NULL,
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    sent_by UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'delivered', 'failed'))
);
\`\`\`

**6. booking_documents Table**
\`\`\`sql
CREATE TABLE booking_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    document_type TEXT NOT NULL CHECK (document_type IN ('passport', 'insurance', 'medical', 'waiver', 'itinerary')),
    document_name TEXT NOT NULL,
    document_url TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW(),
    uploaded_by UUID REFERENCES auth.users(id)
);
\`\`\`

### 1.2 Index Analysis

#### Missing Critical Indexes
\`\`\`sql
-- Performance indexes for booking queries
CREATE INDEX idx_bookings_status_date ON bookings(status, start_date);
CREATE INDEX idx_bookings_user_status ON bookings(user_id, status);
CREATE INDEX idx_tour_availability_dates ON tour_availability(start_date, end_date);
CREATE INDEX idx_booking_payments_status ON booking_payments(payment_status);
CREATE INDEX idx_booking_participants_booking ON booking_participants(booking_id);

-- Search optimization indexes
CREATE INDEX idx_tour_packages_regions ON tour_packages USING GIN(regions);
CREATE INDEX idx_tour_packages_species ON tour_packages USING GIN(target_species);
CREATE INDEX idx_user_profiles_experience ON user_profiles(birding_experience);
\`\`\`

### 1.3 Row Level Security (RLS) Policy Audit

#### Missing Security Policies

**user_profiles Table Policies:**
\`\`\`sql
-- Missing policy for profile completion status
CREATE POLICY "Users can view profile completion status" ON user_profiles
    FOR SELECT USING (
        auth.uid() = auth_user_id OR 
        EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid() AND raw_app_meta_data->>'role' = 'admin')
    );
\`\`\`

**bookings Table Policies:**
\`\`\`sql
-- Missing policies for booking management
CREATE POLICY "Users can view own bookings" ON bookings
    FOR SELECT USING (
        user_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid())
    );

CREATE POLICY "Users can create bookings" ON bookings
    FOR INSERT WITH CHECK (
        user_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid())
    );

CREATE POLICY "Users can update pending bookings" ON bookings
    FOR UPDATE USING (
        user_id IN (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid())
        AND status IN ('pending', 'confirmed')
    );
\`\`\`

## 2. Functionality Gaps

### 2.1 Missing Database Functions

#### Booking Reference Generation
\`\`\`sql
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
DECLARE
    ref TEXT;
BEGIN
    ref := 'AVES-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    RETURN ref;
END;
$$ LANGUAGE plpgsql;
\`\`\`

#### Automatic Cost Calculation
\`\`\`sql
CREATE OR REPLACE FUNCTION calculate_booking_cost(
    p_tour_package_id UUID,
    p_participants INTEGER,
    p_start_date DATE
)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    base_price DECIMAL(10,2);
    price_override DECIMAL(10,2);
    total_cost DECIMAL(10,2);
BEGIN
    -- Get base price from tour package
    SELECT tp.base_price INTO base_price
    FROM tour_packages tp
    WHERE tp.id = p_tour_package_id;
    
    -- Check for price override in availability
    SELECT ta.price_override INTO price_override
    FROM tour_availability ta
    WHERE ta.tour_package_id = p_tour_package_id
    AND p_start_date BETWEEN ta.start_date AND ta.end_date;
    
    -- Calculate total cost
    total_cost := COALESCE(price_override, base_price) * p_participants;
    
    RETURN total_cost;
END;
$$ LANGUAGE plpgsql;
\`\`\`

### 2.2 Missing Triggers

#### Booking Status Automation
\`\`\`sql
CREATE OR REPLACE FUNCTION update_booking_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Auto-confirm bookings with completed payment
    IF NEW.status = 'pending' AND EXISTS (
        SELECT 1 FROM booking_payments 
        WHERE booking_id = NEW.id AND payment_status = 'completed'
    ) THEN
        NEW.status := 'confirmed';
    END IF;
    
    -- Set booking reference if not provided
    IF NEW.booking_reference IS NULL THEN
        NEW.booking_reference := generate_booking_reference();
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER booking_status_trigger
    BEFORE INSERT OR UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_booking_status();
\`\`\`

#### Availability Management
\`\`\`sql
CREATE OR REPLACE FUNCTION update_tour_availability()
RETURNS TRIGGER AS $$
BEGIN
    -- Reduce available spots when booking is confirmed
    IF NEW.status = 'confirmed' AND OLD.status != 'confirmed' THEN
        UPDATE tour_availability 
        SET available_spots = available_spots - NEW.participants
        WHERE tour_package_id = NEW.tour_package_id
        AND NEW.start_date BETWEEN start_date AND end_date;
    END IF;
    
    -- Restore spots when booking is cancelled
    IF NEW.status = 'cancelled' AND OLD.status = 'confirmed' THEN
        UPDATE tour_availability 
        SET available_spots = available_spots + NEW.participants
        WHERE tour_package_id = NEW.tour_package_id
        AND NEW.start_date BETWEEN start_date AND end_date;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER availability_trigger
    AFTER UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_tour_availability();
\`\`\`

### 2.3 Missing Views for Complex Queries

#### Booking Summary View
\`\`\`sql
CREATE VIEW booking_summary AS
SELECT 
    b.id,
    b.booking_reference,
    b.status,
    b.start_date,
    b.end_date,
    b.participants,
    b.total_amount,
    up.full_name as customer_name,
    up.phone_number as customer_phone,
    tp.name as tour_name,
    tp.difficulty_level,
    COALESCE(SUM(bp.amount), 0) as total_paid,
    (b.total_amount - COALESCE(SUM(bp.amount), 0)) as balance_due
FROM bookings b
JOIN user_profiles up ON b.user_id = up.id
LEFT JOIN tour_packages tp ON b.tour_package_id = tp.id
LEFT JOIN booking_payments bp ON b.id = bp.booking_id AND bp.payment_status = 'completed'
GROUP BY b.id, up.full_name, up.phone_number, tp.name, tp.difficulty_level;
\`\`\`

## 3. Implementation Guide

### Phase 1: Core Schema Updates

#### Step 1: Update user_profiles table
\`\`\`sql
-- Add missing columns to user_profiles
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS birding_experience TEXT CHECK (birding_experience IN ('beginner', 'intermediate', 'advanced', 'expert')),
ADD COLUMN IF NOT EXISTS preferred_contact_method TEXT DEFAULT 'email' CHECK (preferred_contact_method IN ('email', 'phone', 'whatsapp')),
ADD COLUMN IF NOT EXISTS travel_insurance_required BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS group_size_preference INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS accessibility_requirements TEXT;
\`\`\`

#### Step 2: Update bookings table
\`\`\`sql
-- Add missing columns to bookings
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS booking_reference TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS tour_package_id UUID REFERENCES tour_packages(id),
ADD COLUMN IF NOT EXISTS deposit_amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'completed')),
ADD COLUMN IF NOT EXISTS tour_guide_assigned UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS special_dietary_requirements TEXT,
ADD COLUMN IF NOT EXISTS group_booking_id UUID;

-- Fix foreign key reference
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_user_id_fkey;
ALTER TABLE bookings ADD CONSTRAINT bookings_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES user_profiles(id) ON DELETE CASCADE;
\`\`\`

### Phase 2: Create New Tables

Execute the table creation scripts provided in Section 1.1 in the following order:
1. tour_packages
2. tour_availability  
3. booking_payments
4. booking_participants
5. booking_communications
6. booking_documents

### Phase 3: Implement Database Functions and Triggers

Execute the function and trigger scripts from Section 2.1 and 2.2.

### Phase 4: Create Performance Indexes

Execute the index creation scripts from Section 1.2.

### Phase 5: Implement Row Level Security

Execute the RLS policy scripts from Section 1.3.

## 4. Testing and Validation

### 4.1 Data Integrity Tests

#### Test 1: Booking Creation Flow
\`\`\`sql
-- Test booking creation with all required fields
INSERT INTO bookings (
    user_id, 
    tour_package_id, 
    start_date, 
    end_date, 
    participants, 
    total_amount,
    contact_name,
    contact_email,
    contact_phone
) VALUES (
    (SELECT id FROM user_profiles WHERE auth_user_id = auth.uid()),
    'test-tour-package-id',
    '2024-06-15',
    '2024-06-22',
    2,
    2500.00,
    'Test User',
    'test@example.com',
    '+1234567890'
);
\`\`\`

#### Test 2: Payment Processing
\`\`\`sql
-- Test payment creation and status update
INSERT INTO booking_payments (
    booking_id,
    payment_method,
    amount,
    payment_status,
    transaction_id
) VALUES (
    'test-booking-id',
    'credit_card',
    1250.00,
    'completed',
    'txn_test_123'
);
\`\`\`

### 4.2 Security Tests

#### Test 1: RLS Policy Verification
\`\`\`sql
-- Verify users can only access their own bookings
SELECT * FROM bookings; -- Should only return current user's bookings
\`\`\`

#### Test 2: Admin Access Verification
\`\`\`sql
-- Verify admin users can access all bookings (requires admin role)
SELECT COUNT(*) FROM bookings; -- Should return all bookings for admin users
\`\`\`

### 4.3 Performance Tests

#### Test 1: Query Performance
\`\`\`sql
-- Test booking search performance
EXPLAIN ANALYZE 
SELECT * FROM booking_summary 
WHERE status = 'confirmed' 
AND start_date BETWEEN '2024-06-01' AND '2024-12-31';
\`\`\`

## 5. Expected Specifications

### 5.1 Booking Functionality Requirements

The implemented database should support:

1. **User Registration and Profile Management**
   - Complete user profiles with birding experience and preferences
   - Travel document and insurance information storage
   - Emergency contact information

2. **Tour Package Management**
   - Comprehensive tour information with pricing
   - Availability tracking and management
   - Dynamic pricing based on dates and demand

3. **Booking Process**
   - Multi-step booking creation with validation
   - Automatic booking reference generation
   - Participant information collection
   - Payment processing and tracking

4. **Communication Management**
   - Automated booking confirmations
   - Tour updates and notifications
   - Document sharing and management

5. **Administrative Functions**
   - Booking management and reporting
   - Payment tracking and reconciliation
   - Customer communication history

### 5.2 Data Security Requirements

- Row Level Security on all user-facing tables
- Audit logging for all booking modifications
- Secure document storage with access controls
- Payment information encryption and compliance

### 5.3 Performance Requirements

- Sub-second response times for booking queries
- Efficient search across tour packages and availability
- Optimized reporting queries for administrative functions

## 6. Migration Strategy

### 6.1 Pre-Migration Checklist

1. **Backup Current Database**
   \`\`\`bash
   # Create full database backup
   pg_dump -h your-supabase-host -U postgres -d your-database > backup.sql
   \`\`\`

2. **Test Environment Setup**
   - Create staging environment with current schema
   - Test all migration scripts in staging first

### 6.2 Migration Execution Order

1. Execute Phase 1 (Schema Updates) during low-traffic period
2. Create new tables (Phase 2) - no downtime required
3. Implement functions and triggers (Phase 3) - minimal impact
4. Create indexes (Phase 4) - may cause temporary performance impact
5. Enable RLS policies (Phase 5) - test thoroughly before production

### 6.3 Rollback Plan

Each phase includes rollback scripts:
\`\`\`sql
-- Example rollback for Phase 1
ALTER TABLE user_profiles DROP COLUMN IF EXISTS birding_experience;
ALTER TABLE bookings DROP COLUMN IF EXISTS booking_reference;
\`\`\`

## 7. Conclusion

This comprehensive implementation plan addresses all identified gaps in the current Supabase database schema. The proposed changes will enable full booking functionality while maintaining data integrity, security, and performance. The phased approach ensures minimal disruption to existing operations while providing a clear path to full functionality.

**Estimated Implementation Time:** 2-3 days
**Risk Level:** Medium (due to schema changes)
**Business Impact:** High (enables core booking functionality)

The implementation should be executed in a staging environment first, with thorough testing of all functionality before production deployment.
