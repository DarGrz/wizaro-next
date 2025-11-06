import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendAdminNotification } from '@/app/lib/mailer';
// Importujemy wersję regulaminu z osobnego pliku, który działa po stronie serwera
import { REGULAMIN_VERSION } from '@/app/constants/regulamin-version';

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
  url: string | string[];
  mapsLink?: string;
  portal?: string;
  customPortal?: string;
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
    console.log('💰 Cena całkowita (przed podziałem przez 100):', totalPrice);
    console.log('🆔 Payer ID:', payer_id);

    if (!removals || removals.length === 0) {
      return NextResponse.json(
        { error: 'Brak profili do usunięcia' },
        { status: 400 }
      );
    }

    // 🔍 DEBUGOWANIE RLS - sprawdź połączenie z bazą
    console.log('🔐 Supabase URL:', process.env.SUPABASE_URL);
    console.log('🔑 Supabase Key type:', process.env.SUPABASE_ANON_KEY ? 'ANON_KEY present' : 'ANON_KEY missing');
    
    // 🔍 Test połączenia z bazą
    try {
      const { data: testData, error: testError } = await supabase
        .from('companies')
        .select('count', { count: 'exact', head: true });
      
      console.log('📊 Test połączenia z companies:', { testData, testError });
    } catch (testErr) {
      console.error('❌ Błąd testu połączenia:', testErr);
    }

    // 🔍 Przygotuj dane do zapisu
    const companyDataToInsert = {
      ...company,
      price: totalPrice / 100, // Dzielimy cenę przez 100 przed zapisem
      profile_removal_count: removals.length,
      payer_id,
      // Dodaj akceptację regulaminu bezpośrednio przy tworzeniu
      regulation_accepted: true,
      regulation_version: REGULAMIN_VERSION,
      regulation_accepted_at: new Date().toISOString(),
    };
    
    console.log('📝 Dane do zapisu w companies:', JSON.stringify(companyDataToInsert, null, 2));
    
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .insert(companyDataToInsert)
      .select()
      .single();

    if (companyError || !companyData) {
      console.error('❌ Błąd zapisu firmy:', companyError);
      console.error('🔍 Szczegóły błędu RLS:');
      console.error('  - Code:', companyError?.code);
      console.error('  - Message:', companyError?.message);
      console.error('  - Details:', companyError?.details);
      console.error('  - Hint:', companyError?.hint);
      
      return NextResponse.json(
        { 
          error: 'Błąd zapisu firmy', 
          details: companyError,
          debug: {
            supabaseUrl: process.env.SUPABASE_URL,
            hasAnonKey: !!process.env.SUPABASE_ANON_KEY,
            insertData: companyDataToInsert
          }
        },
        { status: 500 }
      );
    }

    const removalsWithCompanyId = removals.map((r, i) => ({
      company_name: r.companyName?.trim() || `Firma ${i + 1}`,
      nip: r.nip?.trim(),
      url: Array.isArray(r.url) ? r.url[0] || '' : r.url?.trim() || '',
      maps_link: r.mapsLink?.trim(),
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
    // Wyślij powiadomienie o nowym zamówieniu z pełnymi szczegółami
    await sendAdminNotification({
      orderType: 'profile-removal',
      companyName: company.name,
      orderId: companyData.id,
      company: company,
      reviews: removals.map(r => ({
        author: r.companyName || 'Brak nazwy',
        content: `URL: ${Array.isArray(r.url) ? r.url.join(', ') : r.url}`,
        url: Array.isArray(r.url) ? r.url[0] : r.url,
        date_added: '',
        portal: r.portal,
        customPortal: r.customPortal
      })),
      totalPrice: totalPrice
    });

    return NextResponse.json({ 
      success: true, 
      company_id: companyData.id
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