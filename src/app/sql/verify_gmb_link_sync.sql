-- ========================================
-- WERYFIKACJA SYNCHRONIZACJI GMB_LINK
-- ========================================
-- Data: 2025-10-02
-- Cel: Sprawdzenie czy synchronizacja działa poprawnie

-- 1. Sprawdź ogólne statystyki
SELECT 
    'STATYSTYKI SYNCHRONIZACJI' as type,
    COUNT(*) as total_reviews,
    COUNT(CASE WHEN gmb_link IS NOT NULL AND gmb_link != '' THEN 1 END) as with_gmb_link,
    COUNT(CASE WHEN gmb_link IS NULL OR gmb_link = '' THEN 1 END) as without_gmb_link,
    ROUND(
        (COUNT(CASE WHEN gmb_link IS NOT NULL AND gmb_link != '' THEN 1 END) * 100.0) / 
        NULLIF(COUNT(*), 0), 2
    ) as sync_percentage
FROM reviews;

-- 2. Sprawdź opinie z niepasującymi linkami
SELECT 
    'BŁĘDY SYNCHRONIZACJI' as type,
    r.id,
    r.author,
    r.gmb_link as review_gmb_link,
    c.url as company_url,
    c.name as company_name
FROM reviews r
JOIN companies c ON r.company_id = c.id
WHERE r.gmb_link != c.url
   OR (r.gmb_link IS NULL AND c.url IS NOT NULL)
   OR (r.gmb_link = '' AND c.url != '')
ORDER BY r.created_at DESC
LIMIT 10;

-- 3. Sprawdź najnowsze opinie
SELECT 
    'NAJNOWSZE OPINIE' as type,
    r.id,
    r.author,
    r.created_at,
    r.gmb_link,
    c.url as company_url,
    c.name as company_name,
    CASE 
        WHEN r.gmb_link = c.url THEN '✅ OK'
        WHEN r.gmb_link IS NULL OR r.gmb_link = '' THEN '⚠️  BRAK'
        ELSE '❌ BŁĄD'
    END as status
FROM reviews r
LEFT JOIN companies c ON r.company_id = c.id
ORDER BY r.created_at DESC
LIMIT 5;

-- 4. Sprawdź triggery
SELECT 
    'AKTYWNE TRIGGERY' as type,
    trigger_name,
    event_manipulation,
    event_object_table,
    action_timing,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name LIKE '%gmb_link%' 
   OR trigger_name LIKE '%sync%'
ORDER BY trigger_name;

-- 5. Sprawdź kolumny tabeli reviews
SELECT 
    'STRUKTURA TABELI REVIEWS' as type,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'reviews' 
  AND column_name IN ('gmb_link', 'url', 'company_id')
ORDER BY ordinal_position;