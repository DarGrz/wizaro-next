# Skrypt do utworzenia tabeli ustawień aplikacji w Supabase
# Należy uruchomić w konsoli Supabase lub przez psql

Write-Host "Tworzenie tabeli app_settings w Supabase..." -ForegroundColor Green

# Sprawdź czy zmienne środowiskowe są ustawione
if (-not $env:SUPABASE_DB_URL) {
    Write-Host "BŁĄD: Zmienna SUPABASE_DB_URL nie jest ustawiona!" -ForegroundColor Red
    Write-Host "Ustaw ją używając: `$env:SUPABASE_DB_URL = 'postgresql://...'" -ForegroundColor Yellow
    exit 1
}

try {
    # Sprawdź czy plik SQL istnieje
    if (-not (Test-Path "setup_app_settings_table.sql")) {
        Write-Host "BŁĄD: Plik setup_app_settings_table.sql nie został znaleziony!" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Wykonywanie migracji SQL..." -ForegroundColor Yellow
    
    # Tutaj możesz użyć psql lub innego narzędzia do wykonania SQL
    # Przykład z psql (wymaga zainstalowanego PostgreSQL client):
    # psql $env:SUPABASE_DB_URL -f "setup_app_settings_table.sql"
    
    Write-Host "Instrukcje:" -ForegroundColor Cyan
    Write-Host "1. Zaloguj się do Supabase Dashboard" -ForegroundColor White
    Write-Host "2. Przejdź do SQL Editor" -ForegroundColor White
    Write-Host "3. Skopiuj i uruchom zawartość pliku setup_app_settings_table.sql" -ForegroundColor White
    Write-Host ""
    Write-Host "Lub użyj psql:" -ForegroundColor White
    Write-Host "psql `"$env:SUPABASE_DB_URL`" -f setup_app_settings_table.sql" -ForegroundColor Green
    
} catch {
    Write-Host "BŁĄD: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "Migracja gotowa do wykonania!" -ForegroundColor Green
