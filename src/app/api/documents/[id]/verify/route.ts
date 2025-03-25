import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/db';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const documentId = parseInt(id);
    const sessionId = req.nextUrl.searchParams.get('sessionId');

    if (!documentId || !sessionId) {
      return NextResponse.json({ error: 'Brak parametrów' }, { status: 400 });
    }

    const result = db
      .prepare(
        `SELECT * FROM payments WHERE document_id = ? AND session_id = ? AND status = 'paid'`
      )
      .get(documentId, sessionId);

    if (!result) {
      return NextResponse.json(
        { error: 'Dokument nieopłacony lub nie istnieje' },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ Błąd weryfikacji dokumentu:', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}
