import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { company_id, type } = body;

    if (!company_id || !type) {
      return NextResponse.json({ error: 'Brak wymaganych danych' }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO documents (company_id, type)
      VALUES (?, ?)
    `);

    const result = stmt.run(company_id, type);

    return NextResponse.json({ id: result.lastInsertRowid });
  } catch (error) {
    console.error('❌ Błąd podczas tworzenia dokumentu:', error);
    return NextResponse.json({ error: 'Błąd serwera przy tworzeniu dokumentu' }, { status: 500 });
  }
}
