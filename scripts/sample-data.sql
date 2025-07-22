-- Sample data for testing (DO NOT run in production)
-- This script demonstrates the table structure and relationships

-- Insert sample user profiles (these would normally be created through the application)
INSERT INTO user_profiles (
    user_id,
    first_name,
    last_name,
    email,
    phone,
    passport_number,
    passport_country,
    passport_expiry,
    insurance_provider,
    insurance_policy_number,
    ebird_profile_url,
    dietary_preferences,
    allergies,
    emergency_contact_name,
    emergency_contact_relationship,
    emergency_contact_phone,
    social_media_handles,
    vaccinations
) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440001'::uuid,
    'John',
    'Doe',
    'john.doe@example.com',
    '+1-555-0123',
    'AB1234567',
    'United States',
    '2027-12-31',
    'Travel Guard',
    'TG123456789',
    'https://ebird.org/profile/johndoe',
    'Vegetarian',
    'None',
    'Jane Doe',
    'Spouse',
    '+1-555-0124',
    '{"instagram": "@johndoe_birder", "facebook": "john.doe.birder"}'::jsonb,
    '["Yellow Fever", "Hepatitis A", "Typhoid"]'::jsonb
),
(
    '550e8400-e29b-41d4-a716-446655440002'::uuid,
    'Maria',
    'Garcia',
    'maria.garcia@example.com',
    '+34-600-123456',
    'ES9876543',
    'Spain',
    '2026-06-15',
    'Allianz Travel',
    'AL987654321',
    'https://ebird.org/profile/mariagarcia',
    'No restrictions',
    'Peanuts',
    'Carlos Garcia',
    'Brother',
    '+34-600-123457',
    '{"instagram": "@maria_birding", "twitter": "@mariabirds"}'::jsonb,
    '["Yellow Fever", "Hepatitis A", "Typhoid", "COVID-19"]'::jsonb
);

-- Insert sample bookings
INSERT INTO user_bookings (
    user_id,
    tour_type,
    region,
    start_date,
    end_date,
    price,
    booking_status
) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440001'::uuid,
    'Adventure Tours',
    'Sierra Nevada',
    '2024-03-15',
    '2024-03-22',
    2850.00,
    'confirmed'
),
(
    '550e8400-e29b-41d4-a716-446655440002'::uuid,
    'Vision Tours',
    'Chocó',
    '2024-04-10',
    '2024-04-17',
    3200.00,
    'pending'
),
(
    '550e8400-e29b-41d4-a716-446655440001'::uuid,
    'Elevate Tours',
    'Andes',
    '2024-05-20',
    '2024-05-27',
    2950.00,
    'confirmed'
);
