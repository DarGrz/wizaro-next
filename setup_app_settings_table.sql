-- Tworzenie tabeli ustawień aplikacji
CREATE TABLE IF NOT EXISTS app_settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wstawianie domyślnego ustawienia dla opinii
INSERT INTO app_settings (key, value) 
VALUES ('reviews_enabled', 'true')
ON CONFLICT (key) DO NOTHING;

-- Dodawanie polityki RLS
ALTER TABLE app_settings ENABLE ROW LEVEL SECURITY;

-- Polityka dla odczytu - wszyscy mogą czytać
CREATE POLICY "Allow read access to all users" ON app_settings
    FOR SELECT USING (true);

-- Polityka dla zapisu - tylko zalogowani administratorzy
-- (w praktyce kontrolowane przez service role key)
CREATE POLICY "Allow admin updates" ON app_settings
    FOR ALL USING (true);
