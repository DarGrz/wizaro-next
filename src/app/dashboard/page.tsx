import { createClient } from '@supabase/supabase-js';
import VisitorsChart from '@/components/VisitorsChart';
import Link from 'next/link';
import ReviewsToggleButton from '@/components/ReviewsToggleButton';
import { checkAuth } from '@/lib/auth';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async function DashboardPage() {
  // 🔐 Sprawdzenie logowania z nowym systemem
  await checkAuth();

  // 📥 Get total visitor count directly instead of fetching all records
  const { count: totalVisitors } = await supabase
    .from('visitors')
    .select('*', { count: 'exact', head: true });

  // Get today's start timestamp
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayISOString = today.toISOString();

  // Get today's visitors
  const { data: todayVisitors, count: todayVisitorsCount } = await supabase
    .from('visitors')
    .select('*', { count: 'exact' })
    .gte('created_at', todayISOString);

  // 📦 Pobierz liczbę zamówień
  const { count: orderCount } = await supabase
    .from('documents')
    .select('*', { count: 'exact', head: true });

  // 📨 Fetch recent visitors
  const { data: recent } = await supabase
    .from('visitors')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);

  // 📊 Aggregated data for chart - hourly breakdown for today
  const chartData = todayVisitors?.reduce((acc, v) => {
    const date = new Date(v.created_at);
    const hour = date.getHours();
    // Format hour with leading zero if needed and add ":00" 
    const hourStr = `${hour.toString().padStart(2, '0')}:00`;
    
    acc[hourStr] = (acc[hourStr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Ensure all hours of the day are represented in the chart
  const chartArray = [];
  for (let i = 0; i < 24; i++) {
    const hourStr = `${i.toString().padStart(2, '0')}:00`;
    chartArray.push({
      date: hourStr,
      count: chartData?.[hourStr] || 0
    });
  }

  // Server action do wylogowania
  const handleLogout = async () => {
    'use server';
    const { cookies } = await import('next/headers');
    const { redirect } = await import('next/navigation');
    const cookieStore = await cookies();
    
    cookieStore.set('admin-auth', '', { expires: new Date(0) });
    cookieStore.set('user-role', '', { expires: new Date(0) });
    cookieStore.set('user-id', '', { expires: new Date(0) });
    
    redirect('/login');
  };

  return (
    <main className="max-w-8xl mx-auto p-4 m-2">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">📊 Dashboard – Wizaro (Admin)</h1>
        <div className="flex flex-wrap gap-2 md:gap-3 items-center">
          <Link 
            href="/dashboard/searched-nip" 
            className="bg-[rgb(212,114,27)] text-white px-3 py-2 rounded hover:bg-[#d4721b] transition-colors text-xs md:text-sm whitespace-nowrap"
          >
            Wyszukiwane NIP
          </Link>
          <Link 
            href="/dashboard/searched-gmb" 
            className="bg-[#5BA155] text-white px-3 py-2 rounded hover:bg-[#4b8446] transition-colors text-xs md:text-sm whitespace-nowrap"
          >
            Profile GMB
          </Link>
          <Link 
            href="/dashboard/orders" 
            className="bg-[#002a5c] text-white px-3 py-2 rounded hover:bg-[#001e47] transition-colors text-xs md:text-sm whitespace-nowrap"
          >
            Zamówienia
          </Link>
          
          {/* Debug API pod ikoną koła zębatego */}
          <div className="relative group">
            <Link 
              href="/debug" 
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors text-sm"
              title="Debug API"
            >
              ⚙️
            </Link>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Debug API
            </div>
          </div>
          
          <form action={handleLogout} className="inline">
            <button 
              type="submit"
              className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition-colors text-xs md:text-sm whitespace-nowrap"
            >
              Wyloguj
            </button>
          </form>
        </div>
      </div>

      {/* Sekcja zarządzania opiniami */}
      <div className="mb-6 bg-white shadow rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">⚙️ Zarządzanie usługami</h2>
        <ReviewsToggleButton />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-sm text-gray-500">Wszystkich odwiedzin</h2>
          <p className="text-3xl font-semibold">{totalVisitors ?? 0}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-sm text-gray-500">Dzisiaj</h2>
          <p className="text-3xl font-semibold">{todayVisitorsCount ?? 0}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-xl">
          <h2 className="text-sm text-gray-500">Zamówienia</h2>
          <p className="text-3xl font-semibold">{orderCount ?? 0}</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-2">📈 Odwiedziny dzisiaj (godzinowo)</h2>
      <VisitorsChart data={chartArray} />

     <h2 className="text-xl font-bold mb-2 mt-8">🕵️‍♂️ Ostatnie odwiedziny</h2>
      <div className="bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Data</th>
              <th className="p-2">IP</th>
              <th className="p-2">gclid</th>
              <th className="p-2">keyword</th>
              <th className="p-2">Referrer</th>
              <th className="p-2">Landing</th>
              <th className="p-2">UTM Source</th>
              <th className="p-2">Campaign</th>
              <th className="p-2">Lokalizacja</th>
            </tr>
          </thead>
          <tbody>
            {recent?.map((v) => {
              const ip = v.ip_address;
              return (
                <tr key={v.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    {new Date(v.created_at).toLocaleString('pl-PL', {
                      timeZone: 'Europe/Warsaw',
                    })}
                  </td>
                  <td className="p-2 font-mono">{ip || '—'}</td>
                  <td className="p-2">{v.gclid || '—'}</td>
                  <td className="p-2">{v.keyword || '—'}</td>
                  <td className="p-2">{v.referrer || '—'}</td>
                  <td className="p-2">{v.landing_page || '—'}</td>
                  <td className="p-2">{v.utm_source || '—'}</td>
                  <td className="p-2">{v.utm_campaign || '—'}</td>
                  <td className="p-2">{v.location || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}