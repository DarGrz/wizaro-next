-- Dodanie kolumny email_sent_at do tabeli documents
-- Data: 2025-10-21
-- Cel: Śledzenie czy email z wnioskiem RODO został już wysłany

-- 1. Dodaj kolumnę email_sent_at
ALTER TABLE documents 
ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMP WITH TIME ZONE;

-- 2. Dodaj indeks dla szybkiego wyszukiwania
CREATE INDEX IF NOT EXISTS idx_documents_email_sent_at 
ON documents(email_sent_at);

-- 3. Dodaj indeks kombinowany dla sprawdzania statusu i daty wysłania
CREATE INDEX IF NOT EXISTS idx_documents_status_email_sent 
ON documents(status, email_sent_at);

-- 4. Sprawdź strukturę tabeli
\d documents;

-- 5. Przykład aktualizacji istniejących rekordów (opcjonalne)
-- UPDATE documents 
-- SET email_sent_at = created_at 
-- WHERE status = 'sent' AND email_sent_at IS NULL;

-- 6. Statystyki po migracji
SELECT 
    'STATYSTYKI TABELI DOCUMENTS PO MIGRACJI:' as info,
    COUNT(*) as total_documents,
    COUNT(email_sent_at) as emails_sent,
    COUNT(*) - COUNT(email_sent_at) as emails_not_sent,
    status,
    COUNT(*) as count_by_status
FROM documents 
GROUP BY status
ORDER BY count_by_status DESC;