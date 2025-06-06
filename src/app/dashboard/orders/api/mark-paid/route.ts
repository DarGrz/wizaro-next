import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const id = formData.get('id');
  if (!id) return NextResponse.json({ error: 'Brak ID zamówienia' }, { status: 400 });

  // Check if payment exists
  const { data: existingPayment, error: checkError } = await supabase
    .from('payments')
    .select('id')
    .eq('document_id', id)
    .maybeSingle();
  
  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 });
  }

  let error;
  
  if (existingPayment) {
    // Update existing payment - using boolean true for paid status
    const updateResult = await supabase
      .from('payments')
      .update({ status: true })
      .eq('document_id', id);
    
    error = updateResult.error;
  } else {
    // Create new payment record
    const insertResult = await supabase
      .from('payments')
      .insert({
        document_id: id,
        status: true,
        created_at: new Date().toISOString(),
        session_id: `manual_payment_${Date.now()}` // Generate a unique session ID for manual payments
      });
    
    error = insertResult.error;
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.redirect(`${req.nextUrl.origin}/dashboard/orders/${id}`);
}
