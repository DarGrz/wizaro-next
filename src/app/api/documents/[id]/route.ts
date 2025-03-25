import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documentId = parseInt(params.id);

    const document = db.prepare(`
      SELECT d.id, d.content, c.email, c.name, c.url
      FROM documents d
      JOIN companies c ON d.company_id = c.id
      WHERE d.id = ?
    `).get(documentId);

    if (!document) {
      return NextResponse.json({ error: 'Nie znaleziono dokumentu' }, { status: 404 });
    }

    return NextResponse.json(document);
  } catch (err) {
    console.error('❌ Błąd pobierania dokumentu:', err);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
