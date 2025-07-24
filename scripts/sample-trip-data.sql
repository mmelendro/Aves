-- Insert sample trips
INSERT INTO public.trips (id, title, slug, description, short_description, duration_days, difficulty_level, max_participants, price_per_person, region, best_months, featured_image_url, is_active) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Sierra Nevada Adventure',
    'sierra-nevada-adventure',
    'Explore the incredible biodiversity of the Sierra Nevada de Santa Marta, home to over 600 bird species including 19 endemics. This comprehensive birding tour takes you through multiple elevations and ecosystems.',
    'Discover 19 endemic species in Colombia''s highest coastal mountain range',
    8,
    'moderate',
    8,
    2850.00,
    'Caribbean',
    ARRAY['December', 'January', 'February', 'March'],
    '/images/sierra-nevada-hero.jpg',
    true
),
(
    '550e8400-e29b-41d4-a716-446655440002',
    'Chocó Rainforest Expedition',
    'choco-rainforest-expedition',
    'Journey into one of the world''s most biodiverse regions. The Chocó rainforest harbors incredible endemic species and offers unparalleled birding opportunities in pristine cloud forests.',
    'Experience the world''s most biodiverse rainforest ecosystem',
    10,
    'challenging',
    6,
    3200.00,
    'Pacific',
    ARRAY['March', 'April', 'May', 'September', 'October'],
    '/images/choco-rainforest.jpg',
    true
),
(
    '550e8400-e29b-41d4-a716-446655440003',
    'Eastern Cordillera Highlands',
    'eastern-cordillera-highlands',
    'Explore the high-altitude páramo and cloud forests of the Eastern Cordillera. Perfect for spotting hummingbirds, tanagers, and the elusive Andean Cock-of-the-rock.',
    'High-altitude birding in Colombia''s eastern mountains',
    7,
    'moderate',
    10,
    2400.00,
    'Andes',
    ARRAY['June', 'July', 'August', 'September'],
    '/images/eastern-cordillera.jpg',
    true
);

-- Insert sample itineraries for Sierra Nevada Adventure
INSERT INTO public.trip_itineraries (trip_id, day_number, title, description, activities, accommodation, meals_included, location) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    1,
    'Arrival in Santa Marta',
    'Welcome to the gateway of the Sierra Nevada. Evening briefing and equipment check.',
    ARRAY['Airport pickup', 'Hotel check-in', 'Welcome dinner', 'Trip briefing'],
    'Hotel Casa Verde',
    ARRAY['dinner'],
    'Santa Marta'
),
(
    '550e8400-e29b-41d4-a716-446655440001',
    2,
    'Minca Cloud Forest',
    'Early morning birding in the coffee plantations and cloud forests around Minca.',
    ARRAY['Pre-dawn departure', 'Coffee plantation birding', 'Cloud forest hike', 'Species identification workshop'],
    'Minca Ecolodge',
    ARRAY['breakfast', 'lunch', 'dinner'],
    'Minca'
),
(
    '550e8400-e29b-41d4-a716-446655440001',
    3,
    'El Dorado Reserve',
    'Full day at the world-renowned El Dorado Bird Reserve, searching for endemic species.',
    ARRAY['Endemic species tracking', 'Photography workshop', 'Habitat exploration', 'Night sounds walk'],
    'El Dorado Lodge',
    ARRAY['breakfast', 'lunch', 'dinner'],
    'El Dorado Reserve'
);

-- Insert sample target birds for Sierra Nevada Adventure
INSERT INTO public.trip_target_birds (trip_id, common_name, scientific_name, family, endemic, rarity_level, description, habitat) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Santa Marta Antbird',
    'Drymophila hellmayri',
    'Thamnophilidae',
    true,
    'very_rare',
    'Endemic to the Sierra Nevada de Santa Marta, this secretive antbird inhabits dense undergrowth in cloud forests.',
    'Cloud forest undergrowth'
),
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Santa Marta Sabrewing',
    'Campylopterus phainopeplus',
    'Trochilidae',
    true,
    'rare',
    'A large hummingbird endemic to the Sierra Nevada, known for its distinctive curved bill and iridescent plumage.',
    'Cloud forest edges and clearings'
),
(
    '550e8400-e29b-41d4-a716-446655440001',
    'White-lored Warbler',
    'Myiothlypis conspicillata',
    'Parulidae',
    true,
    'uncommon',
    'An endemic warbler with distinctive white facial markings, found in montane forests.',
    'Montane forest canopy'
);

-- Insert sample resources for Sierra Nevada Adventure
INSERT INTO public.trip_resources (trip_id, title, description, resource_type, content, order_index) VALUES
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Packing List for Sierra Nevada',
    'Essential items for your birding adventure in the Sierra Nevada',
    'packing_list',
    'Binoculars (8x42 recommended), Field notebook, Waterproof jacket, Hiking boots, Insect repellent, Sunscreen, Hat, Camera with telephoto lens, Portable charger, Headlamp',
    1
),
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Weather Information',
    'Climate conditions and what to expect during your visit',
    'weather_info',
    'The Sierra Nevada has a tropical mountain climate with temperatures ranging from 15-25°C (59-77°F) during the day. Mornings can be cool and misty. Rain is possible year-round, with drier conditions from December to March.',
    2
),
(
    '550e8400-e29b-41d4-a716-446655440001',
    'Cultural Guidelines',
    'Respecting local communities and indigenous territories',
    'cultural_info',
    'The Sierra Nevada is home to indigenous communities including the Kogui, Wiwa, and Arhuaco peoples. Please respect their territories and customs. Photography of people requires permission. Support local communities by purchasing crafts and products.',
    3
);

-- Insert sample bookings (these would normally be created by users)
INSERT INTO public.trip_bookings (id, user_id, trip_id, booking_status, participants, booking_date, departure_date, return_date, special_requests) VALUES
(
    '660e8400-e29b-41d4-a716-446655440001',
    (SELECT id FROM auth.users LIMIT 1), -- This will need to be updated with actual user IDs
    '550e8400-e29b-41d4-a716-446655440001',
    'confirmed',
    2,
    '2024-03-15',
    '2024-06-10',
    '2024-06-18',
    'Vegetarian meals preferred. One participant has mild mobility issues.'
);

-- Insert sample chat messages
INSERT INTO public.chat_messages (booking_id, sender_type, message, message_type) VALUES
(
    '660e8400-e29b-41d4-a716-446655440001',
    'admin',
    'Welcome to AVES! We''re excited to have you join us for the Sierra Nevada Adventure. Please let us know if you have any questions about your upcoming trip.',
    'text'
),
(
    '660e8400-e29b-41d4-a716-446655440001',
    'user',
    'Thank you! We''re very excited. Could you please confirm the meeting point in Santa Marta?',
    'text'
),
(
    '660e8400-e29b-41d4-a716-446655440001',
    'admin',
    'We''ll meet you at the Hotel Casa Verde lobby at 5:30 AM on June 10th. Our guide will be wearing an AVES shirt and will have your names on a list.',
    'text'
);
