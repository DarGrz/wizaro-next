-- Create the searched_gmb table
CREATE TABLE IF NOT EXISTS searched_gmb (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  address TEXT,
  place_id TEXT NOT NULL,
  phone_number TEXT,
  website TEXT,
  google_maps_url TEXT NOT NULL,
  business_status TEXT,
  rating NUMERIC,
  types TEXT[],
  ip_address TEXT,
  user_agent TEXT
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_searched_gmb_created_at ON searched_gmb(created_at);
CREATE INDEX IF NOT EXISTS idx_searched_gmb_place_id ON searched_gmb(place_id);
CREATE INDEX IF NOT EXISTS idx_searched_gmb_ip_address ON searched_gmb(ip_address);

-- Set up row-level security policies
ALTER TABLE searched_gmb ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to insert
CREATE POLICY "Enable insert for all users" ON searched_gmb
    FOR INSERT
    WITH CHECK (true);

-- Allow anyone to select (will be restricted at the API level)
CREATE POLICY "Enable select for all users" ON searched_gmb
    FOR SELECT
    USING (true);
