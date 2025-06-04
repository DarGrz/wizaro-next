import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Typy App Routera
interface Props {
  params: Promise<{
    token: string;
  }>;
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const { data: order } = await supabase
    .from('documents')
    .select(`*, companies (*), payments (*)`)
    .eq('tracking_token', resolvedParams.token)
    .single();

  if (!order) {
    return (
      <main className="max-w-xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Nie znaleziono zlecenia</h1>
        <p>Sprawdź poprawność linku lub skontaktuj się z obsługą.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          Powrót na stronę główną
        </Link>
      </main>
    );
  }

  // Fetch reviews if this is a review removal order
  const { data: reviews } = order.type === 'żądanie usunięcia opinii' 
    ? await supabase
        .from('reviews')
        .select('*')
        .eq('document_id', order.id)
    : { data: null };

  // Fetch profile removals if this is a profile removal order
  const { data: profileRemovals } = order.type === 'żądanie usunięcia profilu'
    ? await supabase
        .from('profile_removals')
        .select('*')
        .eq('company_id', order.company_id)
    : { data: null };

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Podgląd zlecenia</h1>
      
      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Informacje o zamówieniu</h2>
        <div className="mb-4 space-y-2">
          <div><strong>ID zamówienia:</strong> {order.id}</div>
          <div>
            <strong>Status płatności:</strong> 
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              order.payments?.[0]?.status === 'paid' ? 'bg-green-100 text-green-800' :
              order.payments?.[0]?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {order.payments?.[0]?.status || 'brak płatności'}
            </span>
          </div>
          <div><strong>Firma:</strong> {order.companies?.name}</div>
          <div><strong>Email:</strong> {order.companies?.email}</div>
          <div><strong>Telefon:</strong> {order.companies?.phone}</div>
          <div><strong>Data utworzenia:</strong> {new Date(order.created_at).toLocaleString('pl-PL')}</div>
          <div><strong>Typ zamówienia:</strong> {order.type}</div>
          <div><strong>Cena:</strong> {order.companies?.price ? `${order.companies.price} PLN` : '—'}</div>
        </div>
      </div>

      {/* Display reviews if this is a review removal order */}
      {order.type === 'żądanie usunięcia opinii' && reviews && reviews.length > 0 && (
        <div className="bg-white shadow rounded-xl p-6 mb-6">
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

      {/* Display profile removals if this is a profile removal order */}
      {order.type === 'żądanie usunięcia profilu' && profileRemovals && profileRemovals.length > 0 && (
        <div className="bg-white shadow rounded-xl p-6 mb-6">
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

      {/* Add message when no items to remove are found */}
      {((order.type === 'żądanie usunięcia opinii' && (!reviews || reviews.length === 0)) ||
        (order.type === 'żądanie usunięcia profilu' && (!profileRemovals || profileRemovals.length === 0))) && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
          <p className="text-yellow-700">
            Nie znaleziono jeszcze elementów do usunięcia dla tego zlecenia. Być może dane są w trakcie przetwarzania. 
            Prosimy sprawdzić ponownie później lub skontaktować się z nami, jeśli problem będzie się powtarzał.
          </p>
        </div>
      )}

      <div className="mt-6">
        <Link href="/" className="text-blue-600 hover:underline">
          Powrót na stronę główną
        </Link>
      </div>
    </main>
  );
}
