import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';


export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
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
    
    // If payment_status is provided, check if payment exists and update or create
    if (payment_status !== undefined) {
      // First check if payment record exists
      const { data: existingPayment, error: checkError } = await supabase
        .from('payments')
        .select('id')
        .eq('document_id', id)
        .maybeSingle();
      
      if (checkError) {
        console.error('❌ Error checking payment status:', checkError);
        return NextResponse.json({ error: 'Error checking payment status' }, { status: 500 });
      }
      
      // If payment exists, update it, otherwise create a new one
      if (existingPayment) {
        // Update existing payment
        const { error: updateError } = await supabase
          .from('payments')
          .update({ status: payment_status })
          .eq('document_id', id);
        
        if (updateError) {
          console.error('❌ Error updating payment status:', updateError);
          return NextResponse.json({ error: 'Error updating payment status' }, { status: 500 });
        }
      } else {
        // Create new payment record
        const { error: insertError } = await supabase
          .from('payments')
          .insert({
            document_id: id,
            status: payment_status,
            created_at: new Date().toISOString(),
            session_id: `api_update_${Date.now()}` // Generate a unique session ID for API updates
          });
        
        if (insertError) {
          console.error('❌ Error creating payment record:', insertError);
          return NextResponse.json({ error: 'Error creating payment record' }, { status: 500 });
        }
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
