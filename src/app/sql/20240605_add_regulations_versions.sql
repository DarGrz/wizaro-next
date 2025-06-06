-- Skrypt dodający tabelę do śledzenia wersji regulaminów
-- Data utworzenia: 06.06.2025

-- Utworzenie tabeli regulation_versions do przechowywania historii wersji regulaminów
CREATE TABLE regulation_versions (
    id SERIAL PRIMARY KEY,
    version VARCHAR(10) NOT NULL,
    effective_from TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    content TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Dodanie pierwszej wersji regulaminu
INSERT INTO regulation_versions (version, effective_from, description, content)
VALUES ('1.1', '2025-06-06', 'Pierwsza wersja regulaminu z dodanymi sekcjami §11-§16', 'Pełna treść regulaminu...');

-- Utworzenie indeksu dla szybkiego wyszukiwania wersji
CREATE INDEX idx_regulation_versions_version ON regulation_versions(version);
CREATE INDEX idx_regulation_versions_effective_from ON regulation_versions(effective_from);