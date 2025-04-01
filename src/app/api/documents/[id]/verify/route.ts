// src/app/api/documents/[id]/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase-admin';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await context.params;
  const documentId = resolvedParams.id;
  const sessionId = req.nextUrl.searchParams.get('sessionId');

  if (!documentId || !sessionId) {
    return NextResponse.json({ error: 'Brak parametrów' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('payments')
    .select('*')
    .eq('document_id', documentId)
    .eq('session_id', sessionId)
    .eq('status', 'paid')
    .maybeSingle();

  if (!data || error) {
    return NextResponse.json(
      { error: 'Dokument nieopłacony lub nie istnieje' },
      { status: 403 }
    );
  }

  return NextResponse.json({ success: true });
}