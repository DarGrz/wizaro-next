import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import VisitorsChart from '@/components/VisitorsChart';

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
    .limit(10);

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

  // 🔁 Zlicz IP
  const ipCounts: Record<string, number> = {};
  allVisitors?.forEach((v) => {
    const ip = v.ip_address;
    if (!ip) return;
    ipCounts[ip] = (ipCounts[ip] || 0) + 1;
  });

  return (
    <main className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard – Wizaro</h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-sm text-gray-500">Wszystkich odwiedzin</h2>
          <p className="text-3xl font-semibold">{allVisitors?.length ?? 0}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-sm text-gray-500">Ostatnie 7 dni</h2>
          <p className="text-3xl font-semibold">{last7Days?.length ?? 0}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2 mt-8">📈 Wykres odwiedzin</h2>
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
            </tr>
          </thead>
          <tbody>
            {recent?.map((v) => {
              const ip = v.ip_address;
              const isSuspicious = ip && ipCounts[ip] > 5;
              return (
                <tr
                  key={v.id}
                  className={`border-t ${isSuspicious ? 'bg-red-100' : ''}`}
                >
                  <td className="p-2 font-mono">{ip || '—'}</td>
                  <td className="p-2">{v.location || '—'}</td>
                  <td className="p-2">
                    {new Date(v.created_at).toLocaleString()}
                  </td>
                  <td className="p-2">{v.referrer || '—'}</td>
                  <td className="p-2">{v.landing_page}</td>
                  <td className="p-2">{v.utm_source || '—'}</td>
                  <td className="p-2">{v.utm_campaign || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
