'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function deleteOrder(formData: FormData) {
  const id = formData.get('id') as string;
  const confirmed = formData.get('confirmed') === 'true';
  
  if (!id) throw new Error('Brak ID zamówienia');
  if (!confirmed) throw new Error('Usunięcie musi być potwierdzone');

  try {
    // Pobierz informacje o zamówieniu, aby móc usunąć powiązane dane
    const { data: order } = await supabase
      .from('documents')
      .select('company_id, id')
      .eq('id', id)
      .single();
    
    if (!order) {
      throw new Error('Zamówienie nie znalezione');
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
    }    // Odśwież dane na stronie
    revalidatePath('/dashboard/orders');
    
    // Przekieruj z powrotem do listy zamówień z parametrem sukcesu
    redirect('/dashboard/orders?deleted=true');
  } catch (err) {
    console.error('❌ Error deleting order:', err);
    throw err;
  }
}
