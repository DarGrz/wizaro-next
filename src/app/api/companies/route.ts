import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      first_name,
      last_name,
      email,
      nip,
      regon,
      industry,
      url
    } = body;

    const stmt = db.prepare(`
      INSERT INTO companies (name, first_name, last_name, email, nip, regon, industry, url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, first_name, last_name, email, nip, regon, industry, url);

    return NextResponse.json({ id: result.lastInsertRowid });
  } catch (error) {
    console.error('❌ Error in POST /api/companies:', error);
    return NextResponse.json({ error: 'Błąd serwera przy dodawaniu firmy' }, { status: 500 });
  }
}
