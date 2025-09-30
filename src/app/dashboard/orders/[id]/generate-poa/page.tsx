import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import PrintButtons from './components/PrintButtons';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GeneratePowerOfAttorneyPage({ params }: Props) {
  // 🔐 Sprawdzenie logowania i roli
  const isLoggedIn = (await cookies()).get('admin-auth')?.value === 'true';
  const userRole = (await cookies()).get('user-role')?.value;
  
  if (!isLoggedIn) redirect('/login');
  
  // Dozwolone role: admin i sub_admin
  if (userRole !== 'admin' && userRole !== 'sub_admin') {
    redirect('/dashboard/orders');
  }

  // Rozpakuj parametry dynamiczne
  const { id } = await params;
  
  // 📦 Pobierz zamówienie z danymi firmy
  const { data: order } = await supabase
    .from('documents')
    .select(`
      *,
      companies (
        name,
        first_name,
        last_name,
        email,
        phone,
        nip,
        street,
        city,
        zip
      )
    `)
    .eq('id', id)
    .single();

  if (!order) {
    redirect('/dashboard/orders');
  }

  // Formatuj dzisiejszą datę w formacie polskim
  const today = format(new Date(), 'd MMMM yyyy', { locale: pl });

  return (    <main className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📋 Pełnomocnictwo</h1>
        <PrintButtons orderId={id} />
      </div>

      <div className="bg-white shadow rounded-xl p-8 mb-8 print:shadow-none print:p-0" id="poa-document">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold uppercase">PEŁNOMOCNICTWO</h2>
          <p className="mt-2">z dnia {today}</p>
        </div>

        <div className="space-y-6 text-justify">
          <p>Ja, niżej podpisany/a:</p>
          
          <div className="pl-8 space-y-2">
            <p>
              <span className="font-semibold">Imię i nazwisko:</span> {order.companies?.first_name} {order.companies?.last_name}
            </p>
            <p>
              <span className="font-semibold">Firma (jeśli dotyczy):</span> {order.companies?.name}
            </p>
            <p>
              <span className="font-semibold">NIP:</span> {order.companies?.nip}
            </p>
            <p>
              <span className="font-semibold">Adres e-mail:</span> {order.companies?.email}
            </p>
            <p>
              <span className="font-semibold">Telefon:</span> {order.companies?.phone}
            </p>
          </div>

          <p>niniejszym upoważniam:</p>

          <div className="pl-8 space-y-2">
            <p>
              <span className="font-semibold">Dariusza Grzegorczyka</span>, prowadzącego działalność gospodarczą pod nazwą <span className="font-semibold">Wizaro.pl</span>,
            </p>
            <p>
              <span className="font-semibold">NIP:</span> 6782978644,
            </p>
            <p>
              <span className="font-semibold">adres:</span> os. Oświecenia 57/12, 31-636 Kraków,
            </p>
            <p>
              <span className="font-semibold">adres e-mail:</span> kontakt@wizaro.pl
            </p>
          </div>

          <p>
            do podjęcia wszelkich czynności niezbędnych do usunięcia lub wyrejestrowania profilu mojej działalności gospodarczej 
            z portalu GoWork.pl, w tym w szczególności do:
          </p>

          <ul className="list-disc pl-12 space-y-2">
            <li>występowania w moim imieniu w kontaktach z administratorem portalu GoWork.pl,</li>
            <li>składania stosownych pism, zgłoszeń i oświadczeń,</li>
            <li>używania w tym celu utworzonego konta e-mail zawierającego moje dane.</li>
          </ul>

          <p>
            Pełnomocnictwo obowiązuje od dnia podpisania i wygasa z chwilą zakończenia realizacji zlecenia.
          </p>          <div className="mt-20 flex justify-between pt-8">
            <div className="text-center">
              <p>Miejscowość, data</p>
              <div className="mt-8 border-t border-black w-48"></div>
            </div>
            <div className="text-center">
              <p>Podpis</p>
              <div className="mt-8 border-t border-black w-48"></div>
            </div>          </div>
        </div>
      </div>
    </main>
  );
}
