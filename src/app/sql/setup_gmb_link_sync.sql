-- ========================================
-- SYNCHRONIZACJA GMB_LINK Z COMPANIES.URL
-- ========================================

-- 1. Dodaj kolumnę gmb_link do tabeli reviews (jeśli nie istnieje)
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS gmb_link TEXT;

-- 2. Skopiuj URL z tabeli companies do wszystkich opinii
UPDATE reviews 
SET gmb_link = companies.url,
    last_modified_at = NOW()
FROM companies 
WHERE reviews.company_id = companies.id 
AND companies.url IS NOT NULL 
AND companies.url != '';

-- 3. Sprawdź ile rekordów zostało zaktualizowanych
SELECT 
    'SKOPIOWANO URL Z COMPANIES DO REVIEWS:' as info,
    COUNT(*) as updated_records
FROM reviews 
WHERE gmb_link IS NOT NULL AND gmb_link != '';

-- 4. Utwórz indeks dla wydajności
CREATE INDEX IF NOT EXISTS idx_reviews_gmb_link ON reviews(gmb_link);

-- 5. Utwórz funkcję do automatycznego kopiowania przy nowych opiniach
CREATE OR REPLACE FUNCTION copy_company_url_to_review()
RETURNS TRIGGER AS $$
BEGIN
    -- Jeśli dodajemy nową opinię, skopiuj url z companies
    IF TG_OP = 'INSERT' THEN
        UPDATE reviews 
        SET gmb_link = (
            SELECT url 
            FROM companies 
            WHERE companies.id = NEW.company_id 
            AND url IS NOT NULL 
            AND url != ''
        )
        WHERE reviews.id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Utwórz trigger dla nowych opinii
DROP TRIGGER IF EXISTS trigger_copy_company_url ON reviews;
CREATE TRIGGER trigger_copy_company_url
    AFTER INSERT ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION copy_company_url_to_review();

-- 7. Utwórz funkcję do aktualizacji przy zmianie URL w companies
CREATE OR REPLACE FUNCTION update_reviews_company_url()
RETURNS TRIGGER AS $$
BEGIN
    -- Jeśli zmieniono url w companies, zaktualizuj wszystkie powiązane opinie
    IF OLD.url IS DISTINCT FROM NEW.url THEN
        UPDATE reviews 
        SET gmb_link = NEW.url,
            last_modified_at = NOW()
        WHERE company_id = NEW.id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Utwórz trigger dla aktualizacji companies
DROP TRIGGER IF EXISTS trigger_update_reviews_company_url ON companies;
CREATE TRIGGER trigger_update_reviews_company_url
    AFTER UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_reviews_company_url();

-- 9. Sprawdź przykładowe dane z synchronizacją
SELECT 
    'PRZYKŁADOWE DANE PO SYNCHRONIZACJI:' as info,
    r.id,
    r.author,
    r.status,
    r.url as review_url,
    r.gmb_link,
    c.name as company_name,
    c.url as company_url,
    CASE 
        WHEN r.gmb_link = c.url THEN '✅ Zsynchronizowane'
        ELSE '❌ Błąd synchronizacji'
    END as sync_status
FROM reviews r
LEFT JOIN companies c ON r.company_id = c.id
ORDER BY r.id DESC
LIMIT 10;

-- 10. Podsumowanie triggerów
SELECT 
    'AKTYWNE TRIGGERY:' as info,
    trigger_name,
    event_manipulation,
    event_object_table,
    action_timing
FROM information_schema.triggers 
WHERE trigger_name IN ('trigger_copy_company_url', 'trigger_update_reviews_company_url')
ORDER BY trigger_name;