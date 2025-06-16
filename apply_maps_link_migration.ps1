#!/usr/bin/env pwsh

# Ten skrypt zastosuje migrację dodającą kolumnę maps_link do tabeli profile_removals

# Pobierz dane uwierzytelniające z pliku .env lub innych zmiennych środowiskowych
$SUPABASE_URL = $env:SUPABASE_URL
$SUPABASE_KEY = $env:SUPABASE_SERVICE_KEY  # Używamy klucza serwisowego dla operacji administracyjnych

if (-not $SUPABASE_URL -or -not $SUPABASE_KEY) {
    Write-Error "Brak zmiennych środowiskowych SUPABASE_URL lub SUPABASE_SERVICE_KEY"
    exit 1
}

# Ścieżka do pliku SQL
$SQL_FILE = ".\src\app\sql\20250616_add_maps_link_to_profile_removals.sql"

if (-not (Test-Path $SQL_FILE)) {
    Write-Error "Nie znaleziono pliku SQL: $SQL_FILE"
    exit 1
}

# Odczytaj zawartość pliku SQL
$SQL_CONTENT = Get-Content -Path $SQL_FILE -Raw

# Wykonaj zapytanie SQL przez REST API Supabase
$headers = @{
    "apikey" = $SUPABASE_KEY
    "Authorization" = "Bearer $SUPABASE_KEY"
    "Content-Type" = "application/json"
    "Prefer" = "params=single-object"
}

$body = @{
    query = $SQL_CONTENT
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$SUPABASE_URL/rest/sql" -Method POST -Headers $headers -Body $body
    Write-Host "Migracja wykonana pomyślnie!"
    Write-Host $response
} catch {
    Write-Error "Błąd podczas wykonywania migracji:"
    Write-Error $_
    exit 1
}
