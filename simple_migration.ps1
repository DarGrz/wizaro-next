# Migracja - Dodanie kolumny email_sent_at
# Data: 2025-10-21

Write-Host "Rozpoczynanie migracji..." -ForegroundColor Green

# Sprawdz plik SQL
$sqlFile = "src\app\sql\add_email_sent_tracking.sql"

if (-not (Test-Path $sqlFile)) {
    Write-Host "Nie znaleziono pliku SQL: $sqlFile" -ForegroundColor Red
    exit 1
}

Write-Host "Znaleziono plik SQL: $sqlFile" -ForegroundColor Yellow

# Wczytaj SQL
$sqlContent = Get-Content $sqlFile -Raw

Write-Host "Wczytano zawartosc SQL" -ForegroundColor Yellow

# Pokaz SQL do wykonania
Write-Host "SQL do wykonania:" -ForegroundColor Cyan
Write-Host $sqlContent -ForegroundColor Gray

Write-Host ""
Write-Host "UWAGA: Wykonaj ponizszy SQL recznie w Supabase SQL Editor:" -ForegroundColor Yellow
Write-Host "1. Idz do Supabase Dashboard" -ForegroundColor Gray
Write-Host "2. Otwarz SQL Editor" -ForegroundColor Gray  
Write-Host "3. Wklej ponizszy kod:" -ForegroundColor Gray
Write-Host ""
Write-Host "ALTER TABLE documents ADD COLUMN IF NOT EXISTS email_sent_at TIMESTAMP WITH TIME ZONE;" -ForegroundColor Cyan
Write-Host "CREATE INDEX IF NOT EXISTS idx_documents_email_sent_at ON documents(email_sent_at);" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Kliknij Run" -ForegroundColor Gray