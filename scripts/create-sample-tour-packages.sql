-- Create sample tour packages for testing
INSERT INTO tour_packages (id, name, description, duration_days, max_participants, base_price, difficulty_level, regions, target_species, included_services) VALUES
(
  gen_random_uuid(),
  'Sierra Nevada Indigenous Birding Experience',
  'Explore the unique avifauna of the Sierra Nevada de Santa Marta with indigenous Wiwa guides',
  7,
  8,
  2850.00,
  'Moderate',
  ARRAY['Caribbean', 'Sierra Nevada'],
  ARRAY['Santa Marta Antbird', 'Santa Marta Parakeet', 'White-tailed Starfrontlet'],
  '{"accommodation": "Eco-lodge", "meals": "All meals included", "transportation": "4WD vehicles", "guide": "Indigenous guide + ornithologist"}'::jsonb
),
(
  gen_random_uuid(),
  'Chocó Endemics Adventure',
  'Discover the incredible endemic species of the Chocó bioregion',
  10,
  6,
  3200.00,
  'Challenging',
  ARRAY['Chocó', 'Pacific'],
  ARRAY['Chocó Vireo', 'Baudó Oropendola', 'Plumbeous Forest-Falcon'],
  '{"accommodation": "Research station", "meals": "All meals included", "transportation": "Boat + hiking", "guide": "Expert ornithologist"}'::jsonb
),
(
  gen_random_uuid(),
  'Andean Cloud Forest Expedition',
  'Experience the mystical cloud forests of the Colombian Andes',
  5,
  10,
  1950.00,
  'Easy to Moderate',
  ARRAY['Andes', 'Central'],
  ARRAY['Multicolored Tanager', 'Golden-plumed Parakeet', 'Andean Cock-of-the-rock'],
  '{"accommodation": "Mountain lodge", "meals": "All meals included", "transportation": "Private bus", "guide": "Local ornithologist"}'::jsonb
);

-- Create corresponding tour availability
INSERT INTO tour_availability (tour_package_id, start_date, end_date, available_spots, status) 
SELECT 
  tp.id,
  CURRENT_DATE + INTERVAL '30 days',
  CURRENT_DATE + INTERVAL '37 days',
  tp.max_participants,
  'available'
FROM tour_packages tp
WHERE tp.name = 'Sierra Nevada Indigenous Birding Experience';

INSERT INTO tour_availability (tour_package_id, start_date, end_date, available_spots, status) 
SELECT 
  tp.id,
  CURRENT_DATE + INTERVAL '45 days',
  CURRENT_DATE + INTERVAL '55 days',
  tp.max_participants,
  'available'
FROM tour_packages tp
WHERE tp.name = 'Chocó Endemics Adventure';

INSERT INTO tour_availability (tour_package_id, start_date, end_date, available_spots, status) 
SELECT 
  tp.id,
  CURRENT_DATE + INTERVAL '60 days',
  CURRENT_DATE + INTERVAL '65 days',
  tp.max_participants,
  'available'
FROM tour_packages tp
WHERE tp.name = 'Andean Cloud Forest Expedition';
