import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Suspense } from 'react';
import DeletedMessageAlert from './components/DeletedMessageAlert';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function OrdersPage() {
  // 🔐 Sprawdzenie logowania
  const isLoggedIn = (await cookies()).get('admin-auth')?.value === 'true';
  if (!isLoggedIn) redirect('/login');

  // 📦 Pobierz zamówienia z danymi firm i statusem płatności
  const { data: orders } = await supabase
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
        zip,
        price
      ),
      payments (
        status
      )
    `)
    .order('created_at', { ascending: false });

  return (
    <main className=" mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📋 Zamówienia</h1>
        <Link 
          href="/dashboard" 
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Powrót do dashboardu
        </Link>
      </div>

      <Suspense fallback={null}>
        <DeletedMessageAlert />
      </Suspense>

      <div className="bg-white shadow rounded-xl w-full overflow-x-auto">
        <table className="min-w-[1200px] w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Typ</th>
              <th className="p-3">Firma</th>
              <th className="p-3">Osoba kontaktowa</th>
              <th className="p-3">Email</th>
              <th className="p-3">Telefon</th>
              <th className="p-3">NIP</th>
              <th className="p-3">Adres</th>
              <th className="p-3">Cena</th>
              <th className="p-3">Data</th>
              <th className="p-3">Status płatności</th>
              <th className="p-3">Status realizacji</th>
              <th className="p-3">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-mono">{order.id}</td>
                <td className="p-3">{order.type}</td>
                <td className="p-3">{order.companies?.name}</td>
                <td className="p-3">
                  {order.companies?.first_name} {order.companies?.last_name}
                </td>
                <td className="p-3">{order.companies?.email}</td>
                <td className="p-3">{order.companies?.phone || '—'}</td>
                <td className="p-3">{order.companies?.nip}</td>
                <td className="p-3">
                  {order.companies?.street}, {order.companies?.zip} {order.companies?.city}
                </td>
                <td className="p-3">
                  {order.companies?.price != null ? (
                    <span>{Number(order.companies.price).toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}</span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="p-3">
                  {new Date(order.created_at).toLocaleString('pl-PL', {
                    timeZone: 'Europe/Warsaw',
                  })}
                </td>
                <td className="p-3">
                   <span className={`px-2 py-1 rounded-full text-xs ${
  order.payments?.[0]?.status === 'true' ? 'bg-green-100 text-green-800' :
  order.payments?.[0]?.status === 'false' ? 'bg-yellow-100 text-yellow-800' :
  'bg-gray-100 text-gray-800'
}`}>
  {order.payments?.[0]?.status === 'true' ? 'Zapłacono' :
   order.payments?.[0]?.status === 'false' ? 'Oczekuje' :
   'Brak płatności'}
</span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.processing_status === 'zakończone' ? 'bg-green-100 text-green-800' :
                    order.processing_status === 'w trakcie' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.processing_status || 'nowe'}
                  </span>
                </td>
                <td className="p-3 flex flex-col gap-2 min-w-[120px]">
                  <Link 
                    href={`/dashboard/orders/${order.id}`}
                    className="text-[#002a5c] hover:text-[#001e47] underline"
                  >
                    Szczegóły
                  </Link>
                  <Link
                    href={`/dashboard/orders/${order.id}/edit`}
                    className="text-blue-700 hover:text-blue-900 underline"
                  >
                    Edytuj
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}