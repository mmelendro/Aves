-- Create useful views for booking management

-- View for booking summary with tour package details
CREATE OR REPLACE VIEW booking_summary AS
SELECT 
  b.id,
  b.booking_reference,
  b.tour_name,
  b.tour_type,
  b.start_date,
  b.end_date,
  b.participants,
  b.total_amount,
  b.payment_status,
  b.status,
  b.contact_name,
  b.contact_email,
  b.contact_phone,
  b.created_at,
  tp.name as package_name,
  tp.description as package_description,
  tp.difficulty_level,
  COALESCE(
    (SELECT SUM(amount) FROM booking_payments WHERE booking_id = b.id AND payment_status = 'completed'),
    0
  ) as paid_amount,
  (
    b.total_amount - COALESCE(
      (SELECT SUM(amount) FROM booking_payments WHERE booking_id = b.id AND payment_status = 'completed'),
      0
    )
  ) as outstanding_amount
FROM bookings b
LEFT JOIN tour_packages tp ON b.tour_package_id = tp.id;

-- View for tour availability with booking counts
CREATE OR REPLACE VIEW tour_availability_summary AS
SELECT 
  ta.id,
  ta.tour_package_id,
  tp.name as tour_name,
  ta.start_date,
  ta.end_date,
  ta.available_spots,
  ta.price_override,
  ta.status,
  COALESCE(tp.base_price, 0) as base_price,
  COALESCE(ta.price_override, tp.base_price, 0) as current_price,
  COALESCE(
    (SELECT SUM(participants) FROM bookings 
     WHERE tour_package_id = ta.tour_package_id 
     AND start_date = ta.start_date 
     AND status IN ('confirmed', 'pending')),
    0
  ) as booked_spots,
  (
    ta.available_spots - COALESCE(
      (SELECT SUM(participants) FROM bookings 
       WHERE tour_package_id = ta.tour_package_id 
       AND start_date = ta.start_date 
       AND status IN ('confirmed', 'pending')),
      0
    )
  ) as remaining_spots
FROM tour_availability ta
JOIN tour_packages tp ON ta.tour_package_id = tp.id;

-- View for user booking history
CREATE OR REPLACE VIEW user_booking_history AS
SELECT 
  up.id as user_profile_id,
  up.full_name,
  up.auth_user_id,
  b.id as booking_id,
  b.booking_reference,
  b.tour_name,
  b.start_date,
  b.end_date,
  b.participants,
  b.total_amount,
  b.payment_status,
  b.status as booking_status,
  b.created_at as booking_date
FROM user_profiles up
JOIN bookings b ON up.id = b.user_id
ORDER BY b.created_at DESC;

-- Grant appropriate permissions
GRANT SELECT ON booking_summary TO authenticated;
GRANT SELECT ON tour_availability_summary TO authenticated;
GRANT SELECT ON user_booking_history TO authenticated;
