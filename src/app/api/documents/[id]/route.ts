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

  // Pobierz dokument z firmą i company_id
  const { data: docData, error: docError } = await supabase
    .from('documents')
    .select('id, content, company_id, company:companies(email)')
    .eq('id', documentId)
    .maybeSingle();

  if (!docData || docError) {
    return NextResponse.json(
      { error: 'Nie znaleziono dokumentu' },
      { status: 404 }
    );
  }

  // Pobierz profile do usunięcia powiązane z firmą
  const { data: removals, error: removalsError } = await supabase
    .from('profile_removals')
    .select('company_name, nip, url')
    .eq('company_id', docData.company_id);

  if (removalsError) {
    console.error('❌ Błąd pobierania profili:', removalsError);
  }

  // Pobierz opinie do usunięcia powiązane z dokumentem
  const { data: reviews, error: reviewsError } = await supabase
    .from('reviews')
    .select('author, content, url, date_added')
    .eq('document_id', documentId);

  if (reviewsError) {
    console.error('❌ Błąd pobierania opinii:', reviewsError);
  }

  return NextResponse.json({
    id: docData.id,
    content: docData.content,
    email: docData.company?.[0]?.email || null,    removals: removals || [],
    reviews: reviews || [],
  });
}
