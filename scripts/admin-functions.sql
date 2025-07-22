-- Administrative functions for managing users and bookings

-- Function to get user booking summary
CREATE OR REPLACE FUNCTION get_user_booking_summary(target_user_id UUID)
RETURNS TABLE (
    total_bookings BIGINT,
    confirmed_bookings BIGINT,
    pending_bookings BIGINT,
    cancelled_bookings BIGINT,
    total_spent NUMERIC,
    favorite_region TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*) as total_bookings,
        COUNT(*) FILTER (WHERE booking_status = 'confirmed') as confirmed_bookings,
        COUNT(*) FILTER (WHERE booking_status = 'pending') as pending_bookings,
        COUNT(*) FILTER (WHERE booking_status = 'cancelled') as cancelled_bookings,
        COALESCE(SUM(price) FILTER (WHERE booking_status IN ('confirmed', 'completed')), 0) as total_spent,
        MODE() WITHIN GROUP (ORDER BY region) as favorite_region
    FROM user_bookings 
    WHERE user_id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update booking status (admin only)
CREATE OR REPLACE FUNCTION admin_update_booking_status(
    target_booking_id UUID,
    new_status TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    admin_check BOOLEAN;
BEGIN
    -- Check if current user is admin
    SELECT EXISTS (
        SELECT 1 FROM auth.users 
        WHERE auth.users.id = auth.uid() 
        AND auth.users.raw_app_meta_data->>'role' = 'admin'
    ) INTO admin_check;
    
    IF NOT admin_check THEN
        RAISE EXCEPTION 'Access denied: Admin privileges required';
    END IF;
    
    -- Validate status
    IF new_status NOT IN ('pending', 'confirmed', 'cancelled', 'completed') THEN
        RAISE EXCEPTION 'Invalid booking status';
    END IF;
    
    -- Update booking
    UPDATE user_bookings 
    SET booking_status = new_status, updated_at = NOW()
    WHERE booking_id = target_booking_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get booking analytics
CREATE OR REPLACE FUNCTION get_booking_analytics(
    start_date DATE DEFAULT NULL,
    end_date DATE DEFAULT NULL
)
RETURNS TABLE (
    period TEXT,
    total_bookings BIGINT,
    total_revenue NUMERIC,
    avg_booking_value NUMERIC,
    top_tour_type TEXT,
    top_region TEXT
) AS $$
BEGIN
    -- Check if current user is admin
    IF NOT EXISTS (
        SELECT 1 FROM auth.users 
        WHERE auth.users.id = auth.uid() 
        AND auth.users.raw_app_meta_data->>'role' = 'admin'
    ) THEN
        RAISE EXCEPTION 'Access denied: Admin privileges required';
    END IF;
    
    RETURN QUERY
    WITH booking_stats AS (
        SELECT 
            COUNT(*) as total_bookings,
            SUM(price) as total_revenue,
            AVG(price) as avg_booking_value,
            MODE() WITHIN GROUP (ORDER BY tour_type) as top_tour_type,
            MODE() WITHIN GROUP (ORDER BY region) as top_region
        FROM user_bookings 
        WHERE (start_date IS NULL OR created_at::date >= start_date)
        AND (end_date IS NULL OR created_at::date <= end_date)
        AND booking_status IN ('confirmed', 'completed')
    )
    SELECT 
        CASE 
            WHEN start_date IS NOT NULL AND end_date IS NOT NULL 
            THEN start_date::text || ' to ' || end_date::text
            ELSE 'All time'
        END as period,
        bs.total_bookings,
        COALESCE(bs.total_revenue, 0) as total_revenue,
        COALESCE(bs.avg_booking_value, 0) as avg_booking_value,
        bs.top_tour_type,
        bs.top_region
    FROM booking_stats bs;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION get_user_booking_summary(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION admin_update_booking_status(UUID, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_booking_analytics(DATE, DATE) TO authenticated;
