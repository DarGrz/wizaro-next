import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendAdminNotification } from '@/app/lib/mailer';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

interface Company {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  nip: string;
  phone: string;
  url: string;
  street: string;
  city: string;
  zip: string;
}

interface Removal {
  companyName: string;
  nip: string;
  url: string;
}

export async function POST(req: NextRequest) {
  try {
    const {
      company,
      removals,
      totalPrice,
      payer_id,
    }: {
      company: Company;
      removals: Removal[];
      totalPrice: number;
      payer_id: string | null;
    } = await req.json();

    console.log('🟢 Firma:', company);
    console.log('🟢 Profile do usunięcia:', removals);
    console.log('💰 Cena całkowita:', totalPrice);
    console.log('🆔 Payer ID:', payer_id);

    if (!removals || removals.length === 0) {
      return NextResponse.json(
        { error: 'Brak profili do usunięcia' },
        { status: 400 }
      );
    }

    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert({
        ...company,
        price: totalPrice/100,
        profile_removal_count: removals.length,
        payer_id,
      })
      .select()
      .single();

    if (companyError || !companyData) {
      console.error('❌ Błąd zapisu firmy:', companyError);
      return NextResponse.json(
        { error: 'Błąd zapisu firmy', details: companyError },
        { status: 500 }
      );
    }

    const removalsWithCompanyId = removals.map((r, i) => ({
      company_name: r.companyName?.trim() || `Firma ${i + 1}`,
      nip: r.nip?.trim(),
      url: r.url?.trim() || '',
      company_id: companyData.id,
    }));

    const { error: removalError } = await supabase
      .from('profile_removals')
      .insert(removalsWithCompanyId);    if (removalError) {
      console.error('❌ Błąd zapisu profili do usunięcia:', removalError);
      return NextResponse.json(
        { error: 'Błąd zapisu profili do usunięcia', details: removalError },
        { status: 500 }
      );
    }

    // Pobierz token śledzenia dla dokumentu powiązanego z tą firmą
    const { data: documentData } = await supabase
      .from('documents')
      .select('tracking_token')
      .eq('company_id', companyData.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Wyślij powiadomienie o nowym zamówieniu
    await sendAdminNotification({
      orderType: 'profile-removal',
      companyName: company.name,
      orderId: companyData.id
    });

    return NextResponse.json({ 
      success: true, 
      company_id: companyData.id,
      tracking_token: documentData?.tracking_token,
      tracking_url: documentData?.tracking_token 
        ? `${process.env.NEXT_PUBLIC_SITE_URL || ''}/podglad-zlecenia/${documentData.tracking_token}`
        : undefined
    }, { status: 201 });
  } catch (err) {
    const error = err as Error;
    console.error('❌ Błąd ogólny:', error.message);
    return NextResponse.json(
      { error: 'Błąd ogólny', details: error.message },
      { status: 500 }
    );
  }
}