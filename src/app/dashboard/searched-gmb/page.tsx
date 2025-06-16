import { createServerSupabaseClient } from '@/app/lib/supabase';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';

interface SearchedGMB {
  id: number;
  created_at: string;
  name: string;
  address: string;
  place_id: string;
  phone_number: string | null;
  website: string | null;
  google_maps_url: string;
  business_status: string | null;
  rating: number | null;
  ip_address: string;
  user_agent: string;
}

export default async function SearchedGMBPage() {
  // 🔐 Sprawdzenie logowania
  const isLoggedIn = (await cookies()).get('admin-auth')?.value === 'true';
  if (!isLoggedIn) redirect('/login');

  // Create Supabase client
  const supabase = createServerSupabaseClient();

  // Fetch searched GMB profiles
  const { data: searchedGMB, error } = await supabase
    .from('searched_gmb')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching searched GMB profiles:', error);
  }

  return (
    <main className="max-w-8xl mx-auto p-4 m-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🔍 Wyszukiwane Profile GMB</h1>
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
              <th className="px-4 py-2">Nazwa</th>
              <th className="px-4 py-2">Adres</th>
              <th className="px-4 py-2">Telefon</th>
              <th className="px-4 py-2">Ocena</th>
              <th className="px-4 py-2">IP</th>
              <th className="px-4 py-2">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {searchedGMB && searchedGMB.length > 0 ? (
              searchedGMB.map((item: SearchedGMB) => (
                <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{new Date(item.created_at).toLocaleString('pl-PL')}</td>
                  <td className="px-4 py-2 font-medium">{item.name}</td>
                  <td className="px-4 py-2">{item.address}</td>
                  <td className="px-4 py-2">{item.phone_number || '-'}</td>
                  <td className="px-4 py-2">{item.rating ? `${item.rating.toFixed(1)}/5` : '-'}</td>
                  <td className="px-4 py-2">{item.ip_address}</td>
                  <td className="px-4 py-2">
                    <a 
                      href={item.google_maps_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      Zobacz profil
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                  {error ? 'Wystąpił błąd podczas pobierania danych' : 'Brak wyszukiwanych profili GMB'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
