import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import { randomUUID } from 'crypto';

export async function GET() {
  return NextResponse.json({ message: 'Endpoint główny dokumentów działa' });
}

export async function POST(req: NextRequest) {
  try {
    const { company_id, type } = await req.json();

    if (!company_id || !type) {
      return NextResponse.json({ error: 'Brak wymaganych pól' }, { status: 400 });
    }    const document_id = randomUUID();
    // Generuj tracking_token dla wszystkich dokumentów
    const tracking_token = randomUUID();

    const { error } = await supabase.from('documents').insert({
      id: document_id,
      company_id,
      type,
      status: 'draft',
      tracking_token
    });    if (error) {
      console.error('❌ Błąd zapisu dokumentu:', error);
      return NextResponse.json({ error: 'Błąd zapisu dokumentu' }, { status: 500 });
    }

    return NextResponse.json({ 
      id: document_id, 
      tracking_token,
      tracking_url: `${process.env.NEXT_PUBLIC_SITE_URL || ''}/podglad-zlecenia/${tracking_token}`,
      message: 'Dokument utworzony' 
    });
  } catch (err) {
    console.error('❌ Błąd przetwarzania żądania:', err);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}