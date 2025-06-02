-- Enable RLS on the news table
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read news" ON news;
DROP POLICY IF EXISTS "Allow authenticated users to create news" ON news;
DROP POLICY IF EXISTS "Allow authenticated users to update own news" ON news;
DROP POLICY IF EXISTS "Allow authenticated users to delete own news" ON news;

-- Create policy to allow all users to select news
CREATE POLICY "Allow public read news" ON news
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert news
CREATE POLICY "Allow authenticated users to create news" ON news
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update any news
CREATE POLICY "Allow authenticated users to update news" ON news
  FOR UPDATE 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete any news
CREATE POLICY "Allow authenticated users to delete news" ON news
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Enable Storage RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Allow public read images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update own images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete own images" ON storage.objects;

-- Create storage policies
CREATE POLICY "Allow public read images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Allow authenticated users to upload images" ON storage.objects
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated users to update images" ON storage.objects
  FOR UPDATE 
  USING (
    bucket_id = 'images' 
    AND auth.role() = 'authenticated'
  )
  WITH CHECK (
    bucket_id = 'images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated users to delete images" ON storage.objects
  FOR DELETE 
  USING (
    bucket_id = 'images' 
    AND auth.role() = 'authenticated'
  ); 