-- ========================================
-- SYNCHRONIZACJA GMB_LINK - AKTUALIZACJA
-- ========================================
-- Data: 2025-10-02
-- Cel: Synchronizacja gmb_link w reviews z url w companies

-- 1. Dodaj kolumnę gmb_link do tabeli reviews (jeśli nie istnieje)
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS gmb_link TEXT;

-- 2. Utwórz indeks dla wydajności
CREATE INDEX IF NOT EXISTS idx_reviews_gmb_link ON reviews(gmb_link);

-- 3. Zaktualizuj istniejące opinie - skopiuj URL z companies
UPDATE reviews 
SET gmb_link = companies.url,
    updated_at = NOW()
FROM companies 
WHERE reviews.company_id = companies.id 
AND companies.url IS NOT NULL 
AND companies.url != ''
AND (reviews.gmb_link IS NULL OR reviews.gmb_link = '');

-- 4. Sprawdź wyniki synchronizacji
SELECT 
    'SYNCHRONIZACJA ZAKOŃCZONA' as status,
    COUNT(*) as total_reviews,
    COUNT(CASE WHEN gmb_link IS NOT NULL AND gmb_link != '' THEN 1 END) as with_gmb_link,
    COUNT(CASE WHEN gmb_link IS NULL OR gmb_link = '' THEN 1 END) as without_gmb_link
FROM reviews;

-- 5. Utwórz funkcję do automatycznego kopiowania przy nowych opiniach
CREATE OR REPLACE FUNCTION sync_review_gmb_link()
RETURNS TRIGGER AS $$
BEGIN
    -- Jeśli dodajemy nową opinię, skopiuj url z companies
    IF TG_OP = 'INSERT' THEN
        -- Pobierz URL firmy i ustaw gmb_link jeśli nie został podany
        IF NEW.gmb_link IS NULL OR NEW.gmb_link = '' THEN
            SELECT url INTO NEW.gmb_link
            FROM companies 
            WHERE companies.id = NEW.company_id;
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Utwórz trigger dla nowych opinii
DROP TRIGGER IF EXISTS trigger_sync_review_gmb_link ON reviews;
CREATE TRIGGER trigger_sync_review_gmb_link
    BEFORE INSERT ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION sync_review_gmb_link();

-- 7. Utwórz funkcję do aktualizacji przy zmianie URL w companies
CREATE OR REPLACE FUNCTION update_reviews_gmb_link()
RETURNS TRIGGER AS $$
BEGIN
    -- Jeśli zmieniono url w companies, zaktualizuj wszystkie powiązane opinie
    IF OLD.url IS DISTINCT FROM NEW.url THEN
        UPDATE reviews 
        SET gmb_link = NEW.url,
            updated_at = NOW()
        WHERE company_id = NEW.id;
        
        RAISE NOTICE 'Zaktualizowano gmb_link dla % opinii firmy %', 
            (SELECT COUNT(*) FROM reviews WHERE company_id = NEW.id), 
            NEW.name;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Utwórz trigger dla aktualizacji companies
DROP TRIGGER IF EXISTS trigger_update_reviews_gmb_link ON companies;
CREATE TRIGGER trigger_update_reviews_gmb_link
    AFTER UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_reviews_gmb_link();

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
        WHEN r.gmb_link IS NULL OR r.gmb_link = '' THEN '⚠️  Brak gmb_link'
        ELSE '❌ Błąd synchronizacji'
    END as sync_status
FROM reviews r
LEFT JOIN companies c ON r.company_id = c.id
ORDER BY r.created_at DESC
LIMIT 10;

-- 10. Podsumowanie triggerów
SELECT 
    'AKTYWNE TRIGGERY:' as info,
    trigger_name,
    event_manipulation,
    event_object_table,
    action_timing
FROM information_schema.triggers 
WHERE trigger_name IN ('trigger_sync_review_gmb_link', 'trigger_update_reviews_gmb_link')
ORDER BY trigger_name;

-- 11. Sprawdź czy wszystko działa
DO $$
BEGIN
    RAISE NOTICE '✅ Synchronizacja gmb_link skonfigurowana pomyślnie!';
    RAISE NOTICE '📋 Nowe opinie będą automatycznie otrzymywać gmb_link z company.url';
    RAISE NOTICE '🔄 Zmiany URL w companies będą automatycznie aktualizować powiązane opinie';
END $$;