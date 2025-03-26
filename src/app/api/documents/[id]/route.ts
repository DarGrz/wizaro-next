// src/app/api/documents/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: documentId } = await context.params;

  if (!documentId) {
    return NextResponse.json({ error: 'Brak ID dokumentu' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('documents')
    .select('id, content, company:companies(email)')
    .eq('id', documentId)
    .maybeSingle();

  if (!data || error) {
    return NextResponse.json(
      { error: 'Nie znaleziono dokumentu' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    id: data.id,
    content: data.content,
    email: data.company?.[0]?.email || null
  });
}