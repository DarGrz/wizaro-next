import { createServerSupabaseClient } from '@/app/lib/supabase';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';

interface SearchedNIP {
  id: number;
  created_at: string;
  nip: string;
  company_name: string;
  street: string;
  city: string;
  zip: string;
  regon: string;
  krs: string | null;
  ip_address: string;
  user_agent: string;
}

export default async function SearchedNIPPage() {
  // 🔐 Sprawdzenie logowania i roli
  const isLoggedIn = (await cookies()).get('admin-auth')?.value === 'true';
  const userRole = (await cookies()).get('user-role')?.value;
  
  if (!isLoggedIn) redirect('/login');
  
  // Tylko admin ma dostęp - sub_admin przekieruj do zamówień
  if (userRole !== 'admin') {
    redirect('/dashboard/orders');
  }

  // Create Supabase client
  const supabase = createServerSupabaseClient();

  // Fetch searched NIP records
  const { data: searchedNIPs, error } = await supabase
    .from('searched_nip')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching searched NIP records:', error);
  }

  return (
    <main className="max-w-8xl mx-auto p-4 m-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🔍 Wyszukiwane NIP</h1>
        <Link 
          href="/dashboard" 
          className="bg-[#002a5c] text-white px-4 py-2 rounded-lg hover:bg-[#001e47] transition-colors"
        >
          Powrót do Dashboardu
        </Link>
      </div>

      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Data</th>
              <th className="px-4 py-2">NIP</th>
              <th className="px-4 py-2">Nazwa Firmy</th>
              <th className="px-4 py-2">Adres</th>
              <th className="px-4 py-2">REGON</th>
              <th className="px-4 py-2">KRS</th>
              <th className="px-4 py-2">IP</th>
            </tr>
          </thead>
          <tbody>
            {searchedNIPs && searchedNIPs.length > 0 ? (
              searchedNIPs.map((item: SearchedNIP) => (
                <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{new Date(item.created_at).toLocaleString('pl-PL')}</td>
                  <td className="px-4 py-2 font-medium">{item.nip}</td>
                  <td className="px-4 py-2">{item.company_name}</td>
                  <td className="px-4 py-2">
                    {[item.street, item.zip, item.city].filter(Boolean).join(', ')}
                  </td>
                  <td className="px-4 py-2">{item.regon || '-'}</td>
                  <td className="px-4 py-2">{item.krs || '-'}</td>
                  <td className="px-4 py-2">{item.ip_address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  {error ? 'Wystąpił błąd podczas pobierania danych' : 'Brak wyszukiwanych NIP'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
