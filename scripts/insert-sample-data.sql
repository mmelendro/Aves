-- Insert sample tours
INSERT INTO tours (name, type, description, bioregion, duration_days, max_participants, price_per_day, difficulty, highlights, included_services, excluded_services, active) VALUES
('Sierra Nevada Adventure', '🍃 Adventure Tours', 'Explore the world''s most important endemic bird area with expert guides', '🏔️ Sierra Nevada de Santa Marta', 8, 4, 150.00, 'Challenging', 
 ARRAY['15+ endemic species', 'Santa Marta Antbird', 'Altitude diversity from 0-5000m', 'Indigenous communities'], 
 ARRAY['Accommodation', 'All meals', 'Expert guide', 'Transportation', 'Park fees'], 
 ARRAY['International flights', 'Personal expenses', 'Travel insurance'], true),

('Chocó Endemic Expedition', '🪶 Vision Tours', 'Photography-focused tour in the biodiverse Chocó region', '🌊 Pacific Coast Chocó', 10, 4, 175.00, 'Moderate', 
 ARRAY['Highest bird diversity', '50+ endemic species', 'Pristine rainforest', 'Photography opportunities'], 
 ARRAY['Luxury accommodation', 'Gourmet meals', 'Photography guide', 'Professional equipment'], 
 ARRAY['International flights', 'Personal photography gear', 'Alcoholic beverages'], true),

('Andean Cloud Forest Luxury', '🌼 Elevate Tours', 'Luxury birding experience in the mystical cloud forests', '⛰️ Western Andes', 7, 4, 200.00, 'Moderate', 
 ARRAY['Hummingbird paradise', 'Cloud forest ecosystems', 'Luxury eco-lodges', '30+ hummingbird species'], 
 ARRAY['5-star accommodation', 'Gourmet meals', 'Premium guide', 'Spa services', 'Wine tastings'], 
 ARRAY['International flights', 'Premium alcoholic beverages', 'Spa treatments'], true),

('Indigenous Birding Experience', '🍓 Souls Tours', 'Cultural immersion with indigenous communities and their bird knowledge', '🏔️ Sierra Nevada de Santa Marta', 9, 4, 185.00, 'Challenging', 
 ARRAY['Cultural immersion', 'Indigenous guides', 'Traditional bird knowledge', 'Sacred sites'], 
 ARRAY['Community accommodation', 'Traditional meals', 'Indigenous guide', 'Cultural activities', 'Ceremonial participation'], 
 ARRAY['International flights', 'Modern amenities', 'Western-style meals'], true);

-- Create the admin user profile (this will be linked when the auth user is created)
-- Note: The actual auth.users record must be created through Supabase Dashboard first

-- Insert sample booking statuses and other reference data
-- (These are handled by the ENUM types defined in the schema)

-- Create utility functions for the admin system
CREATE OR REPLACE FUNCTION public.get_user_booking_summary(user_uuid UUID)
RETURNS JSONB AS $$
DECLARE
    summary JSONB;
BEGIN
    SELECT jsonb_build_object(
        'total_bookings', COUNT(*),
        'confirmed_bookings', COUNT(*) FILTER (WHERE status = 'confirmed'),
        'pending_bookings', COUNT(*) FILTER (WHERE status = 'pending'),
        'total_spent', COALESCE(SUM(total_amount), 0),
        'upcoming_trips', COUNT(*) FILTER (WHERE start_date > CURRENT_DATE)
    )
    INTO summary
    FROM public.bookings
    WHERE user_id = user_uuid;
    
    RETURN summary;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get booking analytics for admin
CREATE OR REPLACE FUNCTION public.get_booking_analytics()
RETURNS JSONB AS $$
DECLARE
    analytics JSONB;
BEGIN
    -- Check if user is admin
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied. Admin privileges required.';
    END IF;
    
    SELECT jsonb_build_object(
        'monthly_bookings', (
            SELECT jsonb_object_agg(
                TO_CHAR(date_trunc('month', created_at), 'YYYY-MM'),
                COUNT(*)
            )
            FROM public.bookings
            WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
            GROUP BY date_trunc('month', created_at)
            ORDER BY date_trunc('month', created_at)
        ),
        'tour_popularity', (
            SELECT jsonb_object_agg(
                t.name,
                COUNT(b.id)
            )
            FROM public.tours t
            LEFT JOIN public.bookings b ON t.id = b.tour_id
            GROUP BY t.name
            ORDER BY COUNT(b.id) DESC
        ),
        'revenue_by_month', (
            SELECT jsonb_object_agg(
                TO_CHAR(date_trunc('month', created_at), 'YYYY-MM'),
                COALESCE(SUM(total_amount), 0)
            )
            FROM public.bookings
            WHERE created_at >= CURRENT_DATE - INTERVAL '12 months'
            GROUP BY date_trunc('month', created_at)
            ORDER BY date_trunc('month', created_at)
        )
    ) INTO analytics;
    
    RETURN analytics;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_user_booking_summary TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_booking_analytics TO authenticated;

-- Insert sample messages for testing
INSERT INTO public.messages (user_id, title, content, message_type, priority) VALUES
-- These will be inserted after users are created
-- For now, we'll create a placeholder that can be updated later
('00000000-0000-0000-0000-000000000000', 'Welcome to AVES Colombia!', 'Thank you for joining our birding community. We''re excited to help you discover Colombia''s incredible avian diversity.', 'system', 1);

-- Create function to send welcome message to new users
CREATE OR REPLACE FUNCTION public.send_welcome_message()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.messages (user_id, title, content, message_type, priority)
    VALUES (
        NEW.id,
        'Welcome to AVES Colombia! 🦅',
        'Welcome to the most biodiverse birding destination in the world! We''re thrilled to have you join our community of bird enthusiasts. 

Your journey into Colombia''s incredible avian world starts here. With over 1,900 bird species, including 79 endemics, Colombia offers unparalleled birding experiences.

What you can do next:
• Explore our tour offerings
• Complete your profile for personalized recommendations  
• Join our community discussions
• Book your first Colombian birding adventure

If you have any questions, our team is here to help. Happy birding!

The AVES Colombia Team',
        'system',
        1
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to send welcome message to new users
DROP TRIGGER IF EXISTS send_welcome_message_trigger ON public.profiles;
CREATE TRIGGER send_welcome_message_trigger
    AFTER INSERT ON public.profiles
    FOR EACH ROW
    WHEN (NEW.role = 'user')
    EXECUTE FUNCTION public.send_welcome_message();

-- Create function to clean up old audit logs (for maintenance)
CREATE OR REPLACE FUNCTION public.cleanup_old_audit_logs()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    -- Check if user is admin
    IF NOT public.is_admin() THEN
        RAISE EXCEPTION 'Access denied. Admin privileges required.';
    END IF;
    
    -- Delete audit logs older than 1 year
    DELETE FROM public.audit_logs 
    WHERE created_at < CURRENT_DATE - INTERVAL '1 year';
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Log the cleanup action
    INSERT INTO public.audit_logs (user_id, action, new_values)
    VALUES (
        auth.uid(),
        'audit_logs_cleanup',
        jsonb_build_object('deleted_count', deleted_count)
    );
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.cleanup_old_audit_logs TO authenticated;

-- Create indexes for better performance on large datasets
CREATE INDEX IF NOT EXISTS idx_bookings_created_at_month ON public.bookings (date_trunc('month', created_at));
CREATE INDEX IF NOT EXISTS idx_payments_created_at_month ON public.payments (date_trunc('month', created_at));
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs (action);

RAISE NOTICE '✅ Sample data and utility functions inserted successfully!';
RAISE NOTICE '';
RAISE NOTICE '📋 Next Steps:';
RAISE NOTICE '1. Create admin user in Supabase Dashboard:';
RAISE NOTICE '   - Email: info@aves.bio';
RAISE NOTICE '   - Password: MotMot2025!';
RAISE NOTICE '   - Auto-confirm: Yes';
RAISE NOTICE '2. Run the create-admin-user.sql script';
RAISE NOTICE '3. Test login and admin dashboard access';
RAISE NOTICE '4. Configure Google OAuth in Supabase settings';
RAISE NOTICE '';
RAISE NOTICE '🔐 Security Notes:';
RAISE NOTICE '- Admin password is secure with mixed case, numbers, and symbols';
RAISE NOTICE '- All admin functions require role verification';
RAISE NOTICE '- Audit logging is enabled for all admin actions';
RAISE NOTICE '- RLS policies protect all user data';
