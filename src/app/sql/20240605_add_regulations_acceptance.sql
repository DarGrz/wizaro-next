-- Skrypt dodający kolumny związane z akceptacją regulaminu do tabeli companies
-- Data utworzenia: 06.06.2025

-- Dodanie kolumny regulation_accepted (czy regulamin został zaakceptowany)
ALTER TABLE companies 
ADD COLUMN regulation_accepted BOOLEAN DEFAULT FALSE;

-- Dodanie kolumny regulation_version (wersja zaakceptowanego regulaminu)
ALTER TABLE companies 
ADD COLUMN regulation_version VARCHAR(10);

-- Dodanie kolumny regulation_accepted_at (data i czas akceptacji regulaminu)
ALTER TABLE companies 
ADD COLUMN regulation_accepted_at TIMESTAMP;