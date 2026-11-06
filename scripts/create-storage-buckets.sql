-- Requires private.is_site_admin() from create-user-tables.sql.
-- Keep documents private: access requires an authorized download or signed URL.
-- Create storage buckets for user uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('profile-images', 'profile-images', true),
  ('user-documents', 'user-documents', false);

-- Set up storage policies for profile images
CREATE POLICY "Users can upload their own profile images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'profile-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own profile images" ON storage.objects
  FOR SELECT TO authenticated USING (
    bucket_id = 'profile-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own profile images" ON storage.objects
  FOR UPDATE TO authenticated USING (
    bucket_id = 'profile-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own profile images" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'profile-images' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Set up storage policies for user documents
CREATE POLICY "Users can upload their own documents" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (
    bucket_id = 'user-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view their own documents" ON storage.objects
  FOR SELECT TO authenticated USING (
    bucket_id = 'user-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own documents" ON storage.objects
  FOR DELETE TO authenticated USING (
    bucket_id = 'user-documents' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Admin policies for both buckets
CREATE POLICY "Admins can manage all profile images" ON storage.objects
  FOR ALL TO authenticated USING (
    bucket_id = 'profile-images' 
    AND (SELECT private.is_site_admin())
  );

CREATE POLICY "Admins can manage all user documents" ON storage.objects
  FOR ALL TO authenticated USING (
    bucket_id = 'user-documents' 
    AND (SELECT private.is_site_admin())
  );
