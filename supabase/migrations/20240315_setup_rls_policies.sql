-- Enable RLS on the news table
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all authenticated users to select news
CREATE POLICY "Allow public read news" ON news
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert news
CREATE POLICY "Allow authenticated users to create news" ON news
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update their own news
CREATE POLICY "Allow authenticated users to update own news" ON news
  FOR UPDATE 
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

-- Create policy to allow authenticated users to delete their own news
CREATE POLICY "Allow authenticated users to delete own news" ON news
  FOR DELETE 
  USING (auth.uid() = created_by);

-- Enable Storage RLS
CREATE POLICY "Allow public read images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Allow authenticated users to upload images" ON storage.objects
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Allow authenticated users to update own images" ON storage.objects
  FOR UPDATE 
  USING (auth.uid() = owner)
  WITH CHECK (
    bucket_id = 'images' 
    AND auth.uid() = owner
  );

CREATE POLICY "Allow authenticated users to delete own images" ON storage.objects
  FOR DELETE 
  USING (
    bucket_id = 'images' 
    AND auth.uid() = owner
  ); 