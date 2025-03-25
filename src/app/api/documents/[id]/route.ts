import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // np. /api/documents/123 -> "123"

    if (!id) {
      return NextResponse.json({ error: 'Brak ID dokumentu' }, { status: 400 });
    }

    const documentId = parseInt(id);

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
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('❌ Błąd pobierania dokumentu:', err.message);
    } else {
      console.error('❌ Nieznany błąd:', err);
    }

    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
