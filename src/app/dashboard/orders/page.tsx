import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { Suspense } from 'react';
import DeletedMessageAlert from './components/DeletedMessageAlert';
import ReviewsSection from './components/ReviewsSection';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  // 🔐 Sprawdzenie logowania i roli
  const isLoggedIn = (await cookies()).get('admin-auth')?.value === 'true';
  const userRole = (await cookies()).get('user-role')?.value;
  
  if (!isLoggedIn) redirect('/login');
  
  // Dozwolone role: admin i sub_admin
  if (userRole !== 'admin' && userRole !== 'sub_admin') {
    redirect('/login');
  }

  // Filtrowanie zamówień
  const params = await searchParams;
  const filter = params.filter || 'all';

  // Sub_admin może tylko oglądać opinie - przekieruj jeśli próbuje dostać się do innych zakładek
  if (userRole === 'sub_admin' && filter !== 'reviews') {
    redirect('/dashboard/orders?filter=reviews');
  }

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

  // Pobierz tylko liczbę opinii dla licznika (bez pełnych danych)
  const { count: reviewsCount } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true });
  const filteredOrders = orders?.filter(order => {
    if (filter === 'removal') return order.type === 'żądanie usunięcia opinii';
    if (filter === 'profile') return order.type !== 'żądanie usunięcia opinii';
    return true;
  }) || [];

  return (
    <main className=" mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">📋 Zamówienia</h1>
          {userRole === 'sub_admin' && (
            <p className="text-sm text-gray-600 mt-1">Panel Sub-Admina - Dostęp do zamówień</p>
          )}
        </div>
        {userRole === 'admin' ? (
          <Link 
            href="/dashboard" 
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Powrót do dashboardu
          </Link>
        ) : (
          <Link 
            href="/api/logout" 
            className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
          >
            Wyloguj się
          </Link>
        )}
      </div>

      <Suspense fallback={null}>
        <DeletedMessageAlert />
      </Suspense>

      {/* Filtrowanie */}
      <div className="mb-4">
        <div className="flex gap-2">
          {/* Sub_admin widzi tylko zakładkę opinii */}
          {userRole === 'admin' && (
            <>
              <Link
                href="/dashboard/orders"
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Wszystkie ({orders?.length || 0})
              </Link>
              <Link
                href="/dashboard/orders?filter=removal"
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'removal' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Żądanie usunięcia opinii ({orders?.filter(o => o.type === 'żądanie usunięcia opinii').length || 0})
              </Link>
              <Link
                href="/dashboard/orders?filter=profile"
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  filter === 'profile' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Usuwanie profilu ({orders?.filter(o => o.type !== 'żądanie usunięcia opinii').length || 0})
              </Link>
            </>
          )}
          <Link
            href="/dashboard/orders?filter=reviews"
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              filter === 'reviews' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📝 Wszystkie opinie ({reviewsCount || '...'})
          </Link>
        </div>
      </div>

      {filter === 'reviews' ? (
        <ReviewsSection initialCount={reviewsCount || 0} />
      ) : (
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
              {filteredOrders?.map((order) => (
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
    order.payments?.[0]?.status === 'true' ? 'bg-[#5BA155] bg-opacity-10 text-white' :
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
                      order.processing_status === 'zakończone' ? 'bg-[#5BA155] bg-opacity-10 text-white' :
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
      )}
    </main>
  );
}