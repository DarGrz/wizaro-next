-- ========================================
-- DODANIE KOLUMNY created_at DO TABELI reviews
-- I WYPEŁNIENIE DANYMI Z POWIĄZANYCH TABEL
-- ========================================

-- 1. Dodaj kolumnę created_at do tabeli reviews (jeśli nie istnieje)
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 2. NAJPIERW RESETUJ wszystkie created_at do NULL (żeby można było poprawnie zaktualizować)
UPDATE reviews 
SET created_at = NULL;

-- 3. GŁÓWNA AKTUALIZACJA: Ustaw created_at na podstawie companies.created_at
-- Reviews z company_id mają mieć created_at z tabeli companies
UPDATE reviews 
SET created_at = companies.created_at
FROM companies
WHERE reviews.company_id = companies.id;

-- 4. FALLBACK: Dla reviews bez company_id lub gdy companies.created_at jest NULL
UPDATE reviews 
SET created_at = NOW()
WHERE created_at IS NULL;

-- 5. Sprawdź wyniki aktualizacji
SELECT 
    r.id,
    r.author,
    r.company_id,
    r.date_added,
    r.created_at as review_created_at,
    c.created_at as company_created_at,
    c.name as company_name,
    CASE 
        WHEN r.created_at = c.created_at THEN '✅ Z companies.created_at'
        WHEN r.created_at IS NOT NULL AND r.created_at != c.created_at THEN '⚠️ Fallback - aktualna data'
        ELSE '❌ Brak daty'
    END as data_source,
    CASE 
        WHEN r.created_at = c.created_at THEN 'POPRAWNE'
        ELSE 'DO SPRAWDZENIA'
    END as status
FROM reviews r
LEFT JOIN companies c ON r.company_id = c.id
ORDER BY r.created_at DESC
LIMIT 15;

-- 6. Pokaż statystyki końcowe
SELECT 
    'STATYSTYKI REVIEWS PO AKTUALIZACJI:' as info,
    COUNT(*) as total_reviews,
    COUNT(CASE WHEN created_at IS NOT NULL THEN 1 END) as with_created_at,
    COUNT(CASE WHEN document_id IS NOT NULL THEN 1 END) as with_document_id,
    COUNT(CASE WHEN company_id IS NOT NULL THEN 1 END) as with_company_id,
    MIN(created_at) as earliest_review,
    MAX(created_at) as latest_review
FROM reviews;

-- 7. Sprawdź czy wszystkie reviews mają prawidłowy created_at
SELECT 
    'SPRAWDZENIE POPRAWNOŚCI:' as info,
    COUNT(*) as total_reviews,
    COUNT(CASE WHEN r.created_at = c.created_at THEN 1 END) as correct_dates,
    COUNT(CASE WHEN r.created_at != c.created_at THEN 1 END) as incorrect_dates,
    COUNT(CASE WHEN r.company_id IS NULL THEN 1 END) as no_company_id,
    COUNT(CASE WHEN c.created_at IS NULL THEN 1 END) as company_no_created_at
FROM reviews r
LEFT JOIN companies c ON r.company_id = c.id;

-- 8. Pokaż przykłady reviews które NIE mają prawidłowej daty
SELECT 
    'PROBLEMATYCZNE REVIEWS:' as info,
    r.id,
    r.author,
    r.company_id,
    r.created_at as review_created_at,
    c.created_at as company_created_at,
    c.name as company_name
FROM reviews r
LEFT JOIN companies c ON r.company_id = c.id
WHERE r.created_at != c.created_at OR r.company_id IS NULL OR c.created_at IS NULL
LIMIT 10;