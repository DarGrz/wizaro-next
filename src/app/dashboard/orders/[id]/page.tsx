import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import DeleteOrderButton from '@/app/dashboard/orders/components/DeleteOrderButton';
import PowerOfAttorneyDropdown from '@/app/dashboard/orders/components/PowerOfAttorneyDropdown';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailsPage({ params }: Props) {
  // 🔐 Sprawdzenie logowania
  const isLoggedIn = (await cookies()).get('admin-auth')?.value === 'true';
  if (!isLoggedIn) redirect('/login');

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
        zip,
        price
      ),
      payments (
        status
      )
    `)
    .eq('id', id)
    .single();

  // Pobierz tracking_token jeśli istnieje
  const trackingToken = order?.tracking_token;
  const trackingUrl = trackingToken ? `${process.env.NEXT_PUBLIC_SITE_URL || ''}/podglad-zlecenia/${trackingToken}` : null;

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
            {order.tracking_token && (
              <>
                <dt className="text-sm text-gray-500">Link do podglądu realizacji</dt>
                <dd>
                  <a
                    href={trackingUrl ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline break-all"
                  >
                    {trackingUrl}
                  </a>
                </dd>
              </>
            )}
            <dt className="text-sm text-gray-500">Status płatności</dt>
            <dd>
              <span className={`px-2 py-1 rounded-full text-xs ${
  order.payments?.[0]?.status === 'true' ? 'bg-[#5BA155] bg-opacity-10 text-white' :
  order.payments?.[0]?.status === 'false' ? 'bg-yellow-100 text-yellow-800' :
  'bg-gray-100 text-gray-800'
}`}>
  {order.payments?.[0]?.status === 'true' ? 'Zapłacono' :
   order.payments?.[0]?.status === 'false' ? 'Oczekuje' :
   'Brak płatności'}
</span>
            </dd>
            
            <dt className="text-sm text-gray-500">Status realizacji</dt>
            <dd>
              <span className={`px-2 py-1 rounded-full text-xs ${
                order.processing_status === 'zakończone' ? 'bg-[#5BA155] bg-opacity-10 text-white' :
                order.processing_status === 'w trakcie' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.processing_status || 'nowe'}
              </span>
            </dd>
            
            <dt className="text-sm text-gray-500">Typ zamówienia</dt>
            <dd className="font-medium">{order.type}</dd>
            
            <dt className="text-sm text-gray-500">Cena</dt>
            <dd className="font-medium">
              {order.companies?.price != null ? (
                <span>{Number(order.companies.price).toLocaleString('pl-PL', { style: 'currency', currency: 'PLN' })}</span>
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </dd>
            
            <dt className="text-sm text-gray-500">Data utworzenia</dt>
            <dd className="font-medium">
              {new Date(order.created_at).toLocaleString('pl-PL', {
                timeZone: 'Europe/Warsaw',
              })}
            </dd>
            
            {order.proforma_invoice_url && (
              <>
                <dt className="text-sm text-gray-500">Faktura proforma</dt>
                <dd>
                  <a
                    href={order.proforma_invoice_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline break-all"
                  >
                    Pobierz fakturę proforma
                  </a>
                </dd>
              </>
            )}
            
            {order.invoice_url && (
              <>
                <dt className="text-sm text-gray-500">Faktura VAT</dt>
                <dd>
                  <a
                    href={order.invoice_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline break-all"
                  >
                    Pobierz fakturę VAT
                  </a>
                  {order.payments?.[0]?.status !== 'paid' && (
                    <p className="text-xs text-gray-500 mt-1 italic">
                      Faktura VAT będzie dostępna po dokonaniu wpłaty
                    </p>
                  )}
                </dd>
              </>
            )}
            
            {order.payment_url && (
              <>
                <dt className="text-sm text-gray-500">Link do płatności</dt>
                <dd>
                  <a
                    href={order.payment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline break-all"
                  >
                    Przejdź do płatności
                  </a>
                </dd>
              </>
            )}
            
            <dt className="text-sm text-gray-500 pt-3">Akcje</dt>
            <dd className="flex gap-2 flex-wrap">
              <Link
                href={`/dashboard/orders/${order.id}/edit`}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                Edytuj zamówienie
              </Link>
              
              {order.payments?.[0]?.status !== 'paid' && (
                <form action={`/dashboard/orders/api/mark-paid`} method="POST" className="inline">
                  <input type="hidden" name="id" value={order.id} />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Oznacz jako opłacone
                  </button>
                </form>
              )}
              
              {order.processing_status !== 'w trakcie' && order.processing_status !== 'zakończone' && (
                <form action={`/dashboard/orders/api/mark-in-progress`} method="POST" className="inline">
                  <input type="hidden" name="id" value={order.id} />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    Oznacz jako &quot;w trakcie&quot;
                  </button>
                </form>
              )}
              
              {order.processing_status !== 'zakończone' && (
                <form action={`/dashboard/orders/api/mark-completed`} method="POST" className="inline">
                  <input type="hidden" name="id" value={order.id} />
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                  >
                    Oznacz jako &quot;zakończone&quot;
                  </button>
                </form>
              )}
              
              {/* Przyciski pełnomocnictw */}
              {(order.type === 'żądanie usunięcia profilu' || 
                order.type?.toLowerCase().includes('gowork') || 
                order.type?.toLowerCase().includes('aleo')) && (
                <PowerOfAttorneyDropdown 
                  orderId={order.id}
                  showGoWork={order.type === 'żądanie usunięcia profilu' || order.type?.toLowerCase().includes('gowork')}
                  showAleo={order.type === 'żądanie usunięcia profilu' || order.type?.toLowerCase().includes('aleo')}
                />
              )}
              
              <DeleteOrderButton orderId={order.id} />
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

      {/* Resetownanie Wizytówki Google */}
      {order.type === 'Resetowanie Wizytówki Google' && profileRemovals && profileRemovals.length > 0 && (
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

      {/* Usuwanie Wizytówki Google */}
      {order.type === 'Usuwanie Wizytówki Google' && profileRemovals && profileRemovals.length > 0 && (
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



      {/* Szybkie dodawanie linków do faktury i płatności */}
      <div className="bg-white shadow rounded-xl p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">Szybkie dodawanie linków</h2>
        <form action="/dashboard/orders/api/update-urls" method="POST" className="grid md:grid-cols-2 gap-4">
          <input type="hidden" name="id" value={order.id} />
          
          <div>
            <label className="block text-sm font-medium mb-1">Link do faktury proforma</label>
            <input
              name="proforma_invoice_url"
              defaultValue={order.proforma_invoice_url || ''}
              placeholder="https://example.com/faktura-proforma.pdf"
              className="w-full border rounded px-3 py-2"
            />
            <p className="text-xs text-gray-500 mt-1">Przed dokonaniem płatności</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Link do faktury VAT</label>
            <input
              name="invoice_url"
              defaultValue={order.invoice_url || ''}
              placeholder="https://example.com/faktura.pdf"
              className="w-full border rounded px-3 py-2"
            />
            <p className="text-xs text-gray-500 mt-1">Dostępna po dokonaniu wpłaty</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link do płatności</label>
            <input
              name="payment_url"
              defaultValue={order.payment_url || ''}
              placeholder="https://pay.example.com/payment"
              className="w-full border rounded px-3 py-2"
            />
          </div>
          
          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-[#002a5c] text-white px-6 py-2 rounded hover:bg-[#001e47]"
            >
              Aktualizuj linki
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}