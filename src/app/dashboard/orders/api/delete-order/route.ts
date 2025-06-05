import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get('id');
  const confirmed = formData.get('confirmed') === 'true';
  
  if (!id) return NextResponse.json({ error: 'Brak ID zamówienia' }, { status: 400 });
  if (!confirmed) return NextResponse.json({ error: 'Usunięcie musi być potwierdzone' }, { status: 400 });

  try {
    // Pobierz informacje o zamówieniu, aby móc usunąć powiązane dane
    const { data: order } = await supabase
      .from('documents')
      .select('company_id, id')
      .eq('id', id)
      .single();
    
    if (!order) {
      return NextResponse.json({ error: 'Zamówienie nie znalezione' }, { status: 404 });
    }

    // Usuń powiązane rekordy
    // 1. Usuń płatności
    await supabase.from('payments').delete().eq('document_id', order.id);
    
    // 2. Usuń opinie
    await supabase.from('reviews').delete().eq('document_id', order.id);
    
    // 3. Usuń profile do usunięcia
    await supabase.from('profile_removals').delete().eq('company_id', order.company_id);
    
    // 4. Usuń dokument
    const { error: documentError } = await supabase
      .from('documents')
      .delete()
      .eq('id', order.id);

    if (documentError) {
      throw documentError;
    }

    // 5. Usuń firmę
    const { error: companyError } = await supabase
      .from('companies')
      .delete()
      .eq('id', order.company_id);

    if (companyError) {
      throw companyError;
    }

    // Przekieruj z powrotem do listy zamówień
    return NextResponse.redirect(`${req.nextUrl.origin}/dashboard/orders`);
  } catch (err) {
    console.error('❌ Error deleting order:', err);
    return NextResponse.json({ error: 'Błąd podczas usuwania zamówienia', details: err }, { status: 500 });
  }
}
