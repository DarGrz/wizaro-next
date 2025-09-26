'use client';

import { useState } from 'react';

interface Review {
  author: string;
  content: string;
  url: string;
  date_added: string;
}

export default function DebugReviews() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<object | null>(null);
  const [error, setError] = useState<string>('');

  // Test dodawania opinii
  const testAddReviews = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    const testData = {
      company_id: 'test-company-123',
      reviews: [
        {
          author: 'Jan Kowalski',
          content: 'Bardzo dobra firma, polecam wszystkim!',
          url: 'https://example.com/review/1',
          date_added: new Date().toISOString()
        },
        {
          author: 'Anna Nowak',
          content: 'Świetna obsługa klienta, szybka realizacja zamówienia.',
          url: 'https://example.com/review/2',
          date_added: new Date().toISOString()
        }
      ] as Review[]
    };

    try {
      console.log('🚀 Wysyłam test reviews:', testData);
      
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData),
      });

      const data = await response.json();
      console.log('📥 Odpowiedź z API:', data);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
      }

      setResult(data);
    } catch (err) {
      console.error('❌ Błąd testu:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Test pobierania opinii
  const testGetReviews = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('🔍 Pobieranie reviews z API...');
      
      const response = await fetch('/api/reviews', {
        method: 'GET',
      });

      const data = await response.json();
      console.log('📥 Pobrane reviews:', data);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${data.error || 'Unknown error'}`);
      }

      setResult(data);
    } catch (err) {
      console.error('❌ Błąd pobierania:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Test tabeli reviews
  const testReviewsTable = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('📊 Sprawdzam tabelę reviews...');
      
      const response = await fetch('/api/debug/reviews', {
        method: 'GET',
      });

      const data = await response.json();
      console.log('📥 Dane z tabeli reviews:', data);

      setResult(data);
    } catch (err) {
      console.error('❌ Błąd sprawdzania tabeli reviews:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Test bezpośrednio z Supabase
  const testSupabaseConnection = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      console.log('🔗 Test połączenia z Supabase...');
      
      const response = await fetch('/api/debug/supabase', {
        method: 'GET',
      });

      const data = await response.json();
      console.log('📥 Test Supabase:', data);

      setResult(data);
    } catch (err) {
      console.error('❌ Błąd testu Supabase:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔧 Debug Reviews API</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          onClick={testAddReviews}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '⏳ Testowanie...' : '✅ Test dodawania opinii'}
        </button>
        
        <button
          onClick={testGetReviews}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? '⏳ Pobieranie...' : '📥 Test pobierania opinii'}
        </button>

        <button
          onClick={testSupabaseConnection}
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? '⏳ Testowanie...' : '🔗 Test Supabase'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
        <button
          onClick={testReviewsTable}
          disabled={loading}
          className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
        >
          {loading ? '⏳ Sprawdzanie...' : '📊 Sprawdź tabelę reviews'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <h3 className="font-bold">❌ Błąd:</h3>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h3 className="font-bold mb-2">📊 Wynik:</h3>
          <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <h3 className="font-bold text-blue-800 mb-2">ℹ️ Informacje:</h3>
        <ul className="list-disc pl-5 text-blue-700 text-sm space-y-1">
          <li>Sprawdź konsolę przeglądarki i konsoli serwera dla szczegółowych logów</li>
          <li>Test dodawania utworzy przykładowe opinie z company_id: &quot;test-company-123&quot;</li>
          <li>Test pobierania pokaże ostatnie 50 opinii z bazy</li>
          <li>Test Supabase sprawdzi podstawowe połączenie</li>
        </ul>
      </div>
    </div>
  );
}