import Database from 'better-sqlite3';
import path from 'path';
// import fs from 'fs';

// 📁 Ścieżka do pliku bazy danych
const dbPath = path.join(process.cwd(), 'database.sqlite');

// 🗃️ Tworzymy bazę jeśli nie istnieje
const db = new Database(dbPath);

// 🔧 Inicjalizacja tabel jeśli nie istnieją
const initSQL = `
  CREATE TABLE IF NOT EXISTS companies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    nip TEXT NOT NULL,
    regon TEXT,
    industry TEXT,
    url TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id)
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    document_id INTEGER NOT NULL,
    session_id TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (document_id) REFERENCES documents(id)
  );
`;

db.exec(initSQL);

export default db;
