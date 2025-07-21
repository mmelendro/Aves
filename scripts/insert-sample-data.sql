-- Insert sample tours
INSERT INTO tours (name, type, description, bioregion, duration_days, max_participants, price_per_day, difficulty, highlights, included_services, excluded_services, active) VALUES
('Sierra Nevada Adventure', '🍃 Adventure Tours', 'Explore the world''s most important endemic bird area', '🏔️ Sierra Nevada de Santa Marta', 8, 4, 150.00, 'Challenging', ARRAY['15 endemic species', 'Santa Marta Antbird', 'Altitude diversity'], ARRAY['Accommodation', 'Meals', 'Guide', 'Transportation'], ARRAY['International flights', 'Personal expenses'], true),
('Chocó Endemic Expedition', '🪶 Vision Tours', 'Photography-focused tour in the biodiverse Chocó region', '🌊 Pacific Coast Chocó', 10, 4, 175.00, 'Moderate', ARRAY['Highest diversity', 'Endemic species', 'Pristine rainforest'], ARRAY['Accommodation', 'Meals', 'Photography guide', 'Equipment'], ARRAY['International flights', 'Personal gear'], true),
('Andean Cloud Forest Luxury', '🌼 Elevate Tours', 'Luxury birding experience in the cloud forests', '⛰️ Western Andes', 7, 4, 200.00, 'Moderate', ARRAY['Hummingbird paradise', 'Cloud forests', 'Luxury lodges'], ARRAY['Luxury accommodation', 'Gourmet meals', 'Premium guide'], ARRAY['International flights', 'Alcoholic beverages'], true),
('Indigenous Birding Experience', '🍓 Souls Tours', 'Cultural immersion with indigenous communities', '🏔️ Sierra Nevada de Santa Marta', 9, 4, 185.00, 'Challenging', ARRAY['Cultural immersion', 'Indigenous guides', 'Traditional experiences'], ARRAY['Cultural activities', 'Traditional meals', 'Community guide'], ARRAY['International flights', 'Modern amenities'], true);

-- Insert sample admin user (you'll need to sign up with this email first)
INSERT INTO profiles (id, email, full_name, role, created_at, updated_at) 
VALUES (
  '00000000-0000-0000-0000-000000000000', -- Replace with actual user ID after signup
  'admin@aves.bio',
  'AVES Administrator',
  'admin',
  NOW(),
  NOW()
) ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- Insert sample booking statuses and payment statuses (these are handled by the ENUM types)

-- Function to create booking reference
CREATE OR REPLACE FUNCTION generate_booking_reference()
RETURNS TEXT AS $$
BEGIN
  RETURN 'AVES-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Function to create invoice number
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'INV-' || TO_CHAR(NOW(), 'YYYY-MM') || '-' || LPAD(FLOOR(RANDOM() * 1000)::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql;
