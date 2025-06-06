# Skrypt PowerShell do wykonania skryptów SQL w bazie danych Supabase
# Data utworzenia: 06.06.2025

# Konfiguracja
$supabaseUrl = "Tutaj-wstaw-URL-Supabase"
$supabaseKey = "Tutaj-wstaw-klucz-serwisowy-Supabase"
$scriptsDir = "c:\Users\dgrze\Desktop\Wizaro - MAIN\src\app\sql"

# Lista skryptów do wykonania
$scripts = @(
    "20240605_add_regulations_acceptance.sql",
    "20240605_add_regulations_versions.sql"
)

Write-Host "Rozpoczynam wykonywanie skryptów SQL..." -ForegroundColor Cyan

foreach ($script in $scripts) {
    $scriptPath = Join-Path -Path $scriptsDir -ChildPath $script
    Write-Host "Wykonuję skrypt: $script" -ForegroundColor Yellow
    
    # Odczytaj zawartość skryptu
    $sqlContent = Get-Content -Path $scriptPath -Raw
    
    # Tutaj należy dodać kod wykonujący zapytanie SQL w Supabase
    # Ponieważ Supabase nie ma bezpośredniego klienta PowerShell, możemy użyć API REST
    
    Write-Host "Zawartość skryptu do wykonania w Supabase:" -ForegroundColor Green
    Write-Host $sqlContent
    
    Write-Host "UWAGA: Aby faktycznie wykonać ten skrypt w bazie danych Supabase:" -ForegroundColor Red
    Write-Host "1. Zaloguj się do panelu administracyjnego Supabase" -ForegroundColor Magenta
    Write-Host "2. Przejdź do zakładki SQL Editor" -ForegroundColor Magenta
    Write-Host "3. Utwórz nowy zapytanie i wklej powyższą zawartość skryptu" -ForegroundColor Magenta
    Write-Host "4. Wykonaj zapytanie" -ForegroundColor Magenta
    Write-Host ""
}

Write-Host "Zakończono przygotowanie skryptów do wykonania." -ForegroundColor Cyan
Write-Host "Aby zastosować zmiany, wykonaj te skrypty w panelu Supabase SQL Editor." -ForegroundColor Green
