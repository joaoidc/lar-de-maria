-- Drop existing objects if they exist
DROP TABLE IF EXISTS news CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS create_news_table() CASCADE;

-- Create the updated_at function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the news table with proper structure
CREATE TABLE news (
    id BIGSERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_by UUID REFERENCES auth.users(id) DEFAULT auth.uid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create trigger for updated_at
CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON news
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on news table
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for news table
CREATE POLICY "Allow public read news" 
    ON news FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated create news" 
    ON news FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow users to update own news" 
    ON news FOR UPDATE 
    USING (auth.uid() = created_by)
    WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Allow users to delete own news" 
    ON news FOR DELETE 
    USING (auth.uid() = created_by);

-- Storage setup
-- First, enable RLS on storage.objects and storage.buckets
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

-- Create policies for storage.buckets
CREATE POLICY "Allow public read buckets"
    ON storage.buckets FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated create buckets"
    ON storage.buckets FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update buckets"
    ON storage.buckets FOR UPDATE
    USING (auth.role() = 'authenticated');

-- Create policies for storage.objects
CREATE POLICY "Allow public read objects"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'news');

CREATE POLICY "Allow authenticated insert objects"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'news'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Allow authenticated update objects"
    ON storage.objects FOR UPDATE
    USING (
        bucket_id = 'news'
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Allow authenticated delete objects"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'news'
        AND auth.role() = 'authenticated'
    );

-- Now create the bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('news', 'news', true, 52428800)
ON CONFLICT (id) DO UPDATE 
SET public = true,
    file_size_limit = 52428800; 