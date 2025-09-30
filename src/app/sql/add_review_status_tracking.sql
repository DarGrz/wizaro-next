-- ========================================
-- ROZSZERZENIE TABELI REVIEWS O STATUSY I ŚLEDZENIE ZMIAN
-- ========================================

-- 1. Dodaj kolumny do tabeli reviews
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'nowa' 
CHECK (status IN ('nowa', 'w_trakcie', 'usunięta', 'przywrócona', 'brak_możliwości'));

ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS last_modified_by INTEGER REFERENCES admin_users(id);

ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS last_modified_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS notes TEXT; -- notatki od adminów

-- 2. Zaktualizuj istniejące rekordy - ustaw domyślny status
UPDATE reviews 
SET status = 'nowa',
    last_modified_at = created_at
WHERE status IS NULL;

-- 2.5. Zaktualizuj constraint jeśli już istnieje (dodaj 'nowa')
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_status_check;
ALTER TABLE reviews ADD CONSTRAINT reviews_status_check 
CHECK (status IN ('nowa', 'w_trakcie', 'usunięta', 'przywrócona', 'brak_możliwości'));

-- 3. Utwórz indeksy dla wydajności
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_last_modified_by ON reviews(last_modified_by);
CREATE INDEX IF NOT EXISTS idx_reviews_last_modified_at ON reviews(last_modified_at);

-- 4. Sprawdź strukturę tabeli
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'reviews' 
ORDER BY ordinal_position;

-- 5. Sprawdź przykładowe dane
SELECT 
    r.id,
    r.author,
    r.status,
    r.url,
    r.last_modified_by,
    r.last_modified_at,
    r.notes,
    au.email as modified_by_email,
    c.name as company_name
FROM reviews r
LEFT JOIN admin_users au ON r.last_modified_by = au.id
LEFT JOIN companies c ON r.company_id = c.id
ORDER BY r.last_modified_at DESC
LIMIT 10;

-- 6. Zmień wszystkie opinie "w_trakcie" na "nowa"
UPDATE reviews 
SET status = 'nowa',
    last_modified_at = NOW()
WHERE status = 'w_trakcie';

-- Sprawdź ile rekordów zostało zmienionych
SELECT 
    'ZMIENIONO OPINIE Z "w_trakcie" NA "nowa":' as info,
    @@rowcount as changed_records;

-- 7. Statystyki statusów po zmianie
SELECT 
    'STATYSTYKI STATUSÓW OPINII (PO ZMIANIE):' as info,
    status,
    COUNT(*) as count,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as percentage
FROM reviews 
GROUP BY status
ORDER BY count DESC;

-- ========================================
-- DODANIE KOLUMNY GMB_LINK I KOPIOWANIE URL Z COMPANIES
-- ========================================

-- 8. Dodaj kolumnę gmb_link do tabeli reviews
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS gmb_link TEXT;

-- 9. Skopiuj URL z tabeli companies do wszystkich opinii
UPDATE reviews 
SET gmb_link = companies.gmb_url,
    last_modified_at = NOW()
FROM companies 
WHERE reviews.company_id = companies.id 
AND companies.gmb_url IS NOT NULL 
AND companies.gmb_url != '';

-- 10. Sprawdź ile rekordów zostało zaktualizowanych
SELECT 
    'SKOPIOWANO GMB_URL DO REVIEWS:' as info,
    COUNT(*) as updated_records
FROM reviews 
WHERE gmb_link IS NOT NULL AND gmb_link != '';

-- 11. Utwórz indeks dla wydajności
CREATE INDEX IF NOT EXISTS idx_reviews_gmb_link ON reviews(gmb_link);

-- 12. Utwórz funkcję i trigger do automatycznego kopiowania przy nowych opiniach
CREATE OR REPLACE FUNCTION copy_gmb_url_to_review()
RETURNS TRIGGER AS $$
BEGIN
    -- Jeśli dodajemy nową opinię, skopiuj gmb_url z companies
    IF TG_OP = 'INSERT' THEN
        UPDATE reviews 
        SET gmb_link = (
            SELECT gmb_url 
            FROM companies 
            WHERE companies.id = NEW.company_id 
            AND gmb_url IS NOT NULL 
            AND gmb_url != ''
        )
        WHERE reviews.id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 13. Utwórz trigger
DROP TRIGGER IF EXISTS trigger_copy_gmb_url ON reviews;
CREATE TRIGGER trigger_copy_gmb_url
    AFTER INSERT ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION copy_gmb_url_to_review();

-- 14. Utwórz funkcję do aktualizacji przy zmianie URL w companies
CREATE OR REPLACE FUNCTION update_reviews_gmb_link()
RETURNS TRIGGER AS $$
BEGIN
    -- Jeśli zmieniono gmb_url w companies, zaktualizuj wszystkie powiązane opinie
    IF OLD.gmb_url IS DISTINCT FROM NEW.gmb_url THEN
        UPDATE reviews 
        SET gmb_link = NEW.gmb_url,
            last_modified_at = NOW()
        WHERE company_id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 15. Utwórz trigger dla aktualizacji companies
DROP TRIGGER IF EXISTS trigger_update_reviews_gmb_link ON companies;
CREATE TRIGGER trigger_update_reviews_gmb_link
    AFTER UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_reviews_gmb_link();

-- 16. Sprawdź przykładowe dane z nową kolumną
SELECT 
    r.id,
    r.author,
    r.status,
    r.url as review_url,
    r.gmb_link,
    c.name as company_name,
    c.gmb_url as company_gmb_url
FROM reviews r
LEFT JOIN companies c ON r.company_id = c.id
ORDER BY r.id DESC
LIMIT 10;