-- DESTRUCTIVE DEVELOPMENT BOOTSTRAP ONLY. Never run against a populated database.
-- This is an alternative to create-user-tables.sql, not a compatible migration.
-- Drop existing tables to start fresh
DROP TABLE IF EXISTS public.chat_messages CASCADE;
DROP TABLE IF EXISTS public.trip_bookings CASCADE;
DROP TABLE IF EXISTS public.trip_itineraries CASCADE;
DROP TABLE IF EXISTS public.trip_resources CASCADE;
DROP TABLE IF EXISTS public.trip_target_birds CASCADE;
DROP TABLE IF EXISTS public.trips CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    country TEXT,
    city TEXT,
    date_of_birth DATE,
    birding_experience TEXT CHECK (birding_experience IN ('beginner', 'intermediate', 'advanced', 'expert')),
    dietary_restrictions TEXT[],
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    passport_number TEXT,
    passport_expiry DATE,
    travel_insurance_provider TEXT,
    travel_insurance_policy TEXT,
    special_requirements TEXT,
    profile_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trips table
CREATE TABLE public.trips (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    short_description TEXT,
    duration_days INTEGER NOT NULL,
    difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'moderate', 'challenging', 'expert')),
    max_participants INTEGER DEFAULT 12,
    price_per_person DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    region TEXT NOT NULL,
    best_months TEXT[],
    featured_image_url TEXT,
    gallery_images TEXT[],
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trip_itineraries table
CREATE TABLE public.trip_itineraries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    activities TEXT[],
    accommodation TEXT,
    meals_included TEXT[],
    location TEXT,
    coordinates POINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trip_target_birds table
CREATE TABLE public.trip_target_birds (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
    common_name TEXT NOT NULL,
    scientific_name TEXT,
    family TEXT,
    endemic BOOLEAN DEFAULT false,
    rarity_level TEXT CHECK (rarity_level IN ('common', 'uncommon', 'rare', 'very_rare')),
    image_url TEXT,
    audio_url TEXT,
    description TEXT,
    best_viewing_time TEXT,
    habitat TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trip_resources table
CREATE TABLE public.trip_resources (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    resource_type TEXT CHECK (resource_type IN ('travel_tip', 'packing_list', 'weather_info', 'cultural_info', 'safety_info', 'equipment', 'external_link')),
    content TEXT,
    url TEXT,
    file_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create trip_bookings table
CREATE TABLE public.trip_bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE,
    booking_status TEXT CHECK (booking_status IN ('saved', 'inquiry', 'confirmed', 'paid', 'completed', 'cancelled')) DEFAULT 'saved',
    payment_status TEXT CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')) DEFAULT 'pending',
    participants INTEGER DEFAULT 1,
    total_amount DECIMAL(10,2),
    currency TEXT DEFAULT 'USD',
    booking_date DATE,
    departure_date DATE,
    return_date DATE,
    special_requests TEXT,
    payment_method TEXT,
    payment_reference TEXT,
    cancellation_reason TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create chat_messages table
CREATE TABLE public.chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    booking_id UUID REFERENCES public.trip_bookings(id) ON DELETE CASCADE,
    sender_type TEXT CHECK (sender_type IN ('user', 'admin', 'guide')) NOT NULL,
    sender_id UUID,
    message TEXT NOT NULL,
    message_type TEXT CHECK (message_type IN ('text', 'image', 'file', 'system')) DEFAULT 'text',
    file_url TEXT,
    file_name TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_trips_slug ON public.trips(slug);
CREATE INDEX idx_trips_region ON public.trips(region);
CREATE INDEX idx_trips_active ON public.trips(is_active);
CREATE INDEX idx_trip_itineraries_trip_day ON public.trip_itineraries(trip_id, day_number);
CREATE INDEX idx_trip_target_birds_trip ON public.trip_target_birds(trip_id);
CREATE INDEX idx_trip_resources_trip ON public.trip_resources(trip_id, order_index);
CREATE INDEX idx_trip_bookings_user ON public.trip_bookings(user_id);
CREATE INDEX idx_trip_bookings_trip ON public.trip_bookings(trip_id);
CREATE INDEX idx_trip_bookings_status ON public.trip_bookings(booking_status);
CREATE INDEX idx_chat_messages_booking ON public.chat_messages(booking_id);
CREATE INDEX idx_chat_messages_created ON public.chat_messages(created_at);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_itineraries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_target_birds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON public.user_profiles
    FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
    FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- RLS Policies for trips (public read access)
CREATE POLICY "Anyone can view active trips" ON public.trips
    FOR SELECT USING (is_active = true);

-- RLS Policies for trip_itineraries (public read access)
CREATE POLICY "Anyone can view trip itineraries" ON public.trip_itineraries
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.trips 
            WHERE trips.id = trip_itineraries.trip_id 
            AND trips.is_active = true
        )
    );

-- RLS Policies for trip_target_birds (public read access)
CREATE POLICY "Anyone can view trip target birds" ON public.trip_target_birds
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.trips 
            WHERE trips.id = trip_target_birds.trip_id 
            AND trips.is_active = true
        )
    );

-- RLS Policies for trip_resources (public read access)
CREATE POLICY "Anyone can view trip resources" ON public.trip_resources
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.trips 
            WHERE trips.id = trip_resources.trip_id 
            AND trips.is_active = true
        )
    );

-- RLS Policies for trip_bookings
CREATE POLICY "Users can view own bookings" ON public.trip_bookings
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings" ON public.trip_bookings
    FOR INSERT TO authenticated WITH CHECK (
        auth.uid() = user_id
        AND booking_status IN ('saved', 'inquiry')
        AND payment_status = 'pending'
        AND total_amount IS NULL
        AND payment_method IS NULL AND payment_reference IS NULL
        AND notes IS NULL
        AND EXISTS (SELECT 1 FROM public.trips AS t WHERE t.id = trip_bookings.trip_id AND t.is_active)
    );

CREATE POLICY "Users can update own bookings" ON public.trip_bookings
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id AND booking_status IN ('saved', 'inquiry') AND payment_status = 'pending' AND total_amount IS NULL)
    WITH CHECK (auth.uid() = user_id AND booking_status IN ('saved', 'inquiry') AND payment_status = 'pending' AND total_amount IS NULL);

-- RLS Policies for chat_messages
CREATE POLICY "Users can view messages for own bookings" ON public.chat_messages
    FOR SELECT TO authenticated USING (
        EXISTS (
            SELECT 1 FROM public.trip_bookings 
            WHERE trip_bookings.id = chat_messages.booking_id 
            AND trip_bookings.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert messages for own bookings" ON public.chat_messages
    FOR INSERT TO authenticated WITH CHECK (
        sender_id = auth.uid()
        AND sender_type = 'user'
        AND message_type IN ('text', 'image', 'file')
        AND is_read = false
        AND EXISTS (
            SELECT 1 FROM public.trip_bookings 
            WHERE trip_bookings.id = chat_messages.booking_id 
            AND trip_bookings.user_id = auth.uid()
        )
    );

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = '';
REVOKE ALL ON FUNCTION public.handle_updated_at() FROM PUBLIC, anon, authenticated;

-- Create triggers for updated_at
CREATE TRIGGER handle_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_trips_updated_at
    BEFORE UPDATE ON public.trips
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_trip_bookings_updated_at
    BEFORE UPDATE ON public.trip_bookings
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS selects rows; column grants independently protect payment/status/identity.
-- Revoke broad defaults before granting only the fields a customer may submit.
REVOKE ALL ON public.user_profiles, public.trip_bookings, public.chat_messages
    FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.user_profiles TO authenticated;
GRANT SELECT ON public.trip_bookings, public.chat_messages TO authenticated;
GRANT INSERT (id, user_id, trip_id, booking_status, participants, booking_date,
    departure_date, return_date, special_requests) ON public.trip_bookings TO authenticated;
GRANT UPDATE (participants, departure_date, return_date, special_requests,
    cancellation_reason) ON public.trip_bookings TO authenticated;
GRANT INSERT (id, booking_id, sender_type, sender_id, message, message_type,
    file_url, file_name) ON public.chat_messages TO authenticated;

REVOKE ALL ON public.trips, public.trip_itineraries, public.trip_target_birds,
    public.trip_resources FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.trips, public.trip_itineraries, public.trip_target_birds,
    public.trip_resources TO anon, authenticated;
GRANT ALL ON public.user_profiles, public.trip_bookings, public.chat_messages,
    public.trips, public.trip_itineraries, public.trip_target_birds, public.trip_resources TO service_role;
