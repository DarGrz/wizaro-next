import { createClient } from '@supabase/supabase-js';
import { checkAuth, getUserRole } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function ReviewsOnlyDashboard() {
  await checkAuth();
  const userRole = await getUserRole();
  
  // Jeśli admin, przekieruj na pełny dashboard
  if (userRole === 'admin') {
    redirect('/dashboard');
  }

  // Pobierz tylko zamówienia związane z opiniami (żądanie usunięcia opinii)
  const { data: orders } = await supabase
    .from('documents')
    .select(`
      *,
      companies (*),
      payments (*),
      reviews (*)
    `)
    .eq('type', 'żądanie usunięcia opinii')
    .order('created_at', { ascending: false });

  const handleLogout = async () => {
    'use server';
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    
    cookieStore.set('admin-auth', '', { expires: new Date(0) });
    cookieStore.set('user-role', '', { expires: new Date(0) });
    cookieStore.set('user-id', '', { expires: new Date(0) });
    
    redirect('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Panel Opinii
            </h1>
            <form action={handleLogout}>
              <button 
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Wyloguj
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Statystyki */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Zamówienia opinii
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {orders?.length || 0}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Opłacone
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {orders?.filter(order => order.payments?.[0]?.status === 'true').length || 0}
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Oczekujące
              </h3>
              <p className="text-3xl font-bold text-yellow-600">
                {orders?.filter(order => order.payments?.[0]?.status !== 'true').length || 0}
              </p>
            </div>
          </div>

          {/* Lista zamówień */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Zamówienia usunięcia opinii
              </h3>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Firma
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status płatności
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Liczba opinii
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data utworzenia
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Akcje
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders?.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {order.companies?.name || 'Brak nazwy'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.companies?.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            order.payments?.[0]?.status === 'true' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.payments?.[0]?.status === 'true' ? 'Zapłacono' : 'Oczekuje'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.reviews?.length || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString('pl-PL')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Zobacz szczegóły
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {(!orders || orders.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    Brak zamówień usunięcia opinii
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}