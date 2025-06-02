import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import VisitorsChart from '@/components/VisitorsChart';
import Link from 'next/link';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function DashboardPage() {
  // 🔐 Sprawdzenie logowania
  const isLoggedIn = (await cookies()).get('admin-auth')?.value === 'true';
  if (!isLoggedIn) redirect('/login');

  // 📥 Pobierz dane z Supabase
  const { data: allVisitors } = await supabase.from('visitors').select('*');
  const { data: last7Days } = await supabase
    .from('visitors')
    .select('*')
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
  const { data: recent } = await supabase
    .from('visitors')
    .select('*')
    .order('created_at', { ascending: false })
    

  // 📦 Pobierz liczbę zamówień
  const { count } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true });

  // 📊 Wykres z ostatnich 7 dni
  const chartData = last7Days?.reduce((acc, v) => {
    const day = new Date(v.created_at).toLocaleDateString('pl-PL');
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartArray = Object.entries(chartData || {}).map(([date, count]) => ({
    date,
    count: Number(count),
  }));

  return (
    <main className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📊 Dashboard – Wizaro</h1>
        <Link 
          href="/dashboard/orders" 
          className="bg-[#002a5c] text-white px-4 py-2 rounded-lg hover:bg-[#001e47] transition-colors"
        >
          Zobacz zamówienia
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-sm text-gray-500">Wszystkich odwiedzin</h2>
          <p className="text-3xl font-semibold">{allVisitors?.length ?? 0}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-sm text-gray-500">Ostatnie 7 dni</h2>
          <p className="text-3xl font-semibold">{last7Days?.length ?? 0}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-sm text-gray-500">Zamówienia</h2>
          <p className="text-3xl font-semibold">{count ?? 0}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2">📈 Wykres odwiedzin</h2>
      <VisitorsChart data={chartArray} />

      <h2 className="text-xl font-bold mb-2 mt-8">🕵️‍♂️ Ostatnie odwiedziny</h2>
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">IP</th>
              <th className="p-2">Lokalizacja</th>
              <th className="p-2">Data</th>
              <th className="p-2">Referrer</th>
              <th className="p-2">Landing</th>
              <th className="p-2">UTM Source</th>
              <th className="p-2">Campaign</th>
              <th className="p-2">gclid</th>
              <th className="p-2">keyword</th>
            </tr>
          </thead>
          <tbody>
            {recent?.map((v) => {
              const ip = v.ip_address;
              return (
                <tr key={v.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 font-mono">{ip || '—'}</td>
                  <td className="p-2">{v.location || '—'}</td>
                  <td className="p-2">
                    {new Date(v.created_at).toLocaleString('pl-PL', {
                      timeZone: 'Europe/Warsaw',
                    })}
                  </td>
                  <td className="p-2">{v.referrer || '—'}</td>
                  <td className="p-2">{v.landing_page}</td>
                  <td className="p-2">{v.utm_source || '—'}</td>
                  <td className="p-2">{v.utm_campaign || '—'}</td>
                  <td className="p-2">{v.gclid || '—'}</td>
                  <td className="p-2">{v.keyword || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}