# Skrypt migracji - Dodanie śledzenia wysyłania emaili RODO
# Data: 2025-10-21
# Autor: Asystent AI

Write-Host "🚀 Rozpoczynanie migracji: Dodanie śledzenia wysyłania emaili RODO..." -ForegroundColor Green

# Sprawdź czy skrypt SQL istnieje
$sqlFile = "src\app\sql\add_email_sent_tracking.sql"

if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ Nie znaleziono pliku SQL: $sqlFile" -ForegroundColor Red
    exit 1
}

Write-Host "📄 Znaleziono plik SQL: $sqlFile" -ForegroundColor Yellow

# Sprawdź zmienne środowiskowe
if (-not $env:SUPABASE_URL -or -not $env:SUPABASE_SERVICE_KEY) {
    Write-Host "❌ Brak wymaganych zmiennych środowiskowych:" -ForegroundColor Red
    Write-Host "   - SUPABASE_URL" -ForegroundColor Red
    Write-Host "   - SUPABASE_SERVICE_KEY" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Ustaw zmienne w pliku .env.local:" -ForegroundColor Yellow
    Write-Host "   SUPABASE_URL=your_supabase_url" -ForegroundColor Gray
    Write-Host "   SUPABASE_SERVICE_KEY=your_service_key" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Zmienne środowiskowe ustawione" -ForegroundColor Green

# Wczytaj zawartość pliku SQL
$sqlContent = Get-Content $sqlFile -Raw

Write-Host "📖 Wczytano zawartość SQL ($($sqlContent.Length) znaków)" -ForegroundColor Yellow

# Wykonaj migrację przez API Supabase
try {
    Write-Host "🔄 Wykonywanie migracji..." -ForegroundColor Yellow
    
    $headers = @{
        "Authorization" = "Bearer $env:SUPABASE_SERVICE_KEY"
        "Content-Type" = "application/json"
        "apikey" = "$env:SUPABASE_SERVICE_KEY"
    }
    
    # Podziel SQL na osobne komendy (po średnikach)
    $sqlCommands = $sqlContent -split ";" | Where-Object { $_.Trim() -ne "" -and -not $_.Trim().StartsWith("--") }
    
    foreach ($command in $sqlCommands) {
        $trimmedCommand = $command.Trim()
        if ($trimmedCommand -ne "" -and -not $trimmedCommand.StartsWith("--")) {
            Write-Host "   Wykonywanie: $($trimmedCommand.Substring(0, [Math]::Min(50, $trimmedCommand.Length)))..." -ForegroundColor Gray
            
            $body = @{
                query = $trimmedCommand
            } | ConvertTo-Json
            
            $response = Invoke-RestMethod -Uri "$env:SUPABASE_URL/rest/v1/rpc/exec_sql" -Method Post -Headers $headers -Body $body
            
            Write-Host "   ✅ Wykonano pomyślnie" -ForegroundColor Green
        }
    }
    
    Write-Host ""
    Write-Host "🎉 Migracja zakończona pomyślnie!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Sprawdź wyniki w dashboardzie Supabase:" -ForegroundColor Yellow
    Write-Host "   - Tabela: documents" -ForegroundColor Gray
    Write-Host "   - Nowa kolumna: email_sent_at" -ForegroundColor Gray
    Write-Host "   - Nowe indeksy: idx_documents_email_sent_at, idx_documents_status_email_sent" -ForegroundColor Gray
    
} catch {
    Write-Host "❌ Błąd podczas migracji:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Możliwe rozwiązania:" -ForegroundColor Yellow
    Write-Host "   1. Sprawdź poprawność zmiennych środowiskowych" -ForegroundColor Gray
    Write-Host "   2. Upewnij się, że masz uprawnienia ADMIN w Supabase" -ForegroundColor Gray
    Write-Host "   3. Wykonaj migrację ręcznie w SQL Editor w Supabase" -ForegroundColor Gray
    exit 1
}

Write-Host ""
Write-Host "🔍 Kolejne kroki:" -ForegroundColor Cyan
Write-Host "   1. Zrestartuj aplikację Next.js" -ForegroundColor Gray
Write-Host "   2. Przetestuj wysyłanie emaila RODO" -ForegroundColor Gray
Write-Host "   3. Sprawdź czy email wysyła się tylko raz" -ForegroundColor Gray