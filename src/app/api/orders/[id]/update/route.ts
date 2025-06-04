import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    const data = await req.json();
    
    // Extract fields we want to update
    const {
      status,
      processing_status,
      invoice_url,
      payment_url,
      payment_status,
      // Add any other fields you want to update
    } = data;
    
    // Create an object with only the fields that are provided
    const updates: Record<string, unknown> = {};
    
    if (status !== undefined) updates.status = status;
    if (processing_status !== undefined) updates.processing_status = processing_status;
    if (invoice_url !== undefined) updates.invoice_url = invoice_url;
    if (payment_url !== undefined) updates.payment_url = payment_url;
    
    // Only proceed if there are actual updates to make
    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }
    
    // Update the document
    const { data: updatedDocument, error: documentError } = await supabase
      .from('documents')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (documentError) {
      console.error('❌ Error updating document:', documentError);
      return NextResponse.json({ error: 'Error updating document' }, { status: 500 });
    }
    
    // If payment_status is provided, update the payment status
    if (payment_status !== undefined) {
      const { error: paymentError } = await supabase
        .from('payments')
        .update({ status: payment_status })
        .eq('document_id', id);
      
      if (paymentError) {
        console.error('❌ Error updating payment status:', paymentError);
        return NextResponse.json({ error: 'Error updating payment status' }, { status: 500 });
      }
    }
    
    return NextResponse.json({
      success: true,
      data: updatedDocument
    });
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
