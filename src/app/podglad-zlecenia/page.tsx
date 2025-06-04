import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function TrackingPage({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token;

  if (!token) {
    return (
      <main className="max-w-xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Brak tokena śledzącego</h1>
        <p>Nieprawidłowy link lub brak tokena w adresie URL.</p>
      </main>
    );
  }

  // Pobierz zamówienie po tracking_token
  const { data: order } = await supabase
    .from('documents')
    .select(`*, companies(*), payments(*)`)
    .eq('tracking_token', token)
    .single();

  if (!order) {
    return notFound();
  }

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Podgląd realizacji zlecenia</h1>
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Status zamówienia</h2>
        <p className="mb-2">
          <span className={`px-2 py-1 rounded-full text-xs ${
            order.payments?.[0]?.status === 'paid' ? 'bg-green-100 text-green-800' :
            order.payments?.[0]?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {order.payments?.[0]?.status || 'brak płatności'}
          </span>
        </p>
        <p className="text-sm text-gray-500">Typ: {order.type}</p>
        <p className="text-sm text-gray-500">Data utworzenia: {new Date(order.created_at).toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-2">Dane firmy</h2>
        <p className="mb-1 font-medium">{order.companies?.name}</p>
        <p className="mb-1">NIP: {order.companies?.nip}</p>
        <p className="mb-1">Email: {order.companies?.email}</p>
        <p className="mb-1">Telefon: {order.companies?.phone || '—'}</p>
        <p className="mb-1">Adres: {order.companies?.street}, {order.companies?.zip} {order.companies?.city}</p>
      </div>

      {order.type === 'żądanie usunięcia opinii' && (
        <OrderReviews documentId={order.id} />
      )}
      {order.type === 'żądanie usunięcia profilu' && (
        <OrderProfileRemovals companyId={order.company_id} />
      )}

      <div className="mt-8 text-center">
        <Link href="/" className="text-blue-700 underline">Powrót na stronę główną</Link>
      </div>
    </main>
  );
}

// Komponent do pobierania i wyświetlania opinii
async function OrderReviews({ documentId }: { documentId: string }) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('document_id', documentId);

  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold mb-2">Opinie do usunięcia</h2>
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
                  <a href={review.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
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
  );
}

// Komponent do pobierania i wyświetlania profili do usunięcia
async function OrderProfileRemovals({ companyId }: { companyId: string }) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
  );
  const { data: profileRemovals } = await supabase
    .from('profile_removals')
    .select('*')
    .eq('company_id', companyId);

  if (!profileRemovals || profileRemovals.length === 0) return null;

  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold mb-2">Profile do usunięcia</h2>
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
                  <a href={removal.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {removal.url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
