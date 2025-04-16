import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({ params }: Props) {
  // 🔐 Sprawdzenie logowania
  const isLoggedIn = (await cookies()).get('admin-auth')?.value === 'true';
  if (!isLoggedIn) redirect('/login');

  const resolvedParams = await params;

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
    .eq('id', resolvedParams.id)
    .single();

  if (!order) {
    redirect('/dashboard/orders');
  }

  // 📝 Pobierz powiązane reviews jeśli to zamówienie typu "żądanie usunięcia opinii"
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('document_id', order.id);

  // 🗑️ Pobierz powiązane profile do usunięcia jeśli to zamówienie typu "żądanie usunięcia profilu"
  const { data: profileRemovals } = await supabase
    .from('profile_removals')
    .select('*')
    .eq('company_id', order.company_id);

  return (
    <main className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📋 Szczegóły zamówienia #{order.id}</h1>
        <Link 
          href="/dashboard/orders" 
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Powrót do listy
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Informacje o zamówieniu</h2>
          <dl className="space-y-2">
            <dt className="text-sm text-gray-500">Status</dt>
            <dd>
              <span className={`px-2 py-1 rounded-full text-xs ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status}
              </span>
            </dd>
            
            <dt className="text-sm text-gray-500">Typ zamówienia</dt>
            <dd className="font-medium">{order.type}</dd>
            
            <dt className="text-sm text-gray-500">Data utworzenia</dt>
            <dd className="font-medium">
              {new Date(order.created_at).toLocaleString('pl-PL', {
                timeZone: 'Europe/Warsaw',
              })}
            </dd>
          </dl>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Dane firmy</h2>
          <dl className="space-y-2">
            <dt className="text-sm text-gray-500">Nazwa firmy</dt>
            <dd className="font-medium">{order.companies?.name}</dd>
            
            <dt className="text-sm text-gray-500">Osoba kontaktowa</dt>
            <dd className="font-medium">
              {order.companies?.first_name} {order.companies?.last_name}
            </dd>
            
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="font-medium">{order.companies?.email}</dd>
            
            <dt className="text-sm text-gray-500">Telefon</dt>
            <dd className="font-medium">{order.companies?.phone || '—'}</dd>
            
            <dt className="text-sm text-gray-500">NIP</dt>
            <dd className="font-medium">{order.companies?.nip}</dd>
            
            <dt className="text-sm text-gray-500">Adres</dt>
            <dd className="font-medium">
              {order.companies?.street}, {order.companies?.zip} {order.companies?.city}
            </dd>
          </dl>
        </div>
      </div>

      {order.type === 'żądanie usunięcia opinii' && reviews && reviews.length > 0 && (
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Opinie do usunięcia</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Autor</th>
                  <th className="p-3 text-left">Treść</th>
                  <th className="p-3 text-left">URL</th>
                  <th className="p-3 text-left">Data dodania</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id} className="border-t">
                    <td className="p-3">{review.author}</td>
                    <td className="p-3">{review.content}</td>
                    <td className="p-3">
                      <a 
                        href={review.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline"
                      >
                        {review.url}
                      </a>
                    </td>
                    <td className="p-3">{review.date_added}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {order.type === 'żądanie usunięcia profilu' && profileRemovals && profileRemovals.length > 0 && (
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Profile do usunięcia</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Nazwa firmy</th>
                  <th className="p-3 text-left">NIP</th>
                  <th className="p-3 text-left">URL</th>
                </tr>
              </thead>
              <tbody>
                {profileRemovals.map((removal) => (
                  <tr key={removal.id} className="border-t">
                    <td className="p-3">{removal.company_name}</td>
                    <td className="p-3">{removal.nip}</td>
                    <td className="p-3">
                      <a 
                        href={removal.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:underline"
                      >
                        {removal.url}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}