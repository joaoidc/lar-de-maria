-- Add external_link column to news table
ALTER TABLE news
ADD COLUMN IF NOT EXISTS external_link TEXT;

-- Enable Row Level Security
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON "public"."news"
    FOR SELECT
    USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."news"
    FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON "public"."news"
    FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated'); 