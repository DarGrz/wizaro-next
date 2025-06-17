import { useState } from 'react';

interface GUSCompanyData {
  name: string;
  street: string;
  city: string;
  zip: string;
  nip: string;
  regon: string;
  krs?: string;
}

interface UseGUSResult {
  data: GUSCompanyData | null;
  loading: boolean;
  error: string | null;
  searchByNIP: (nip: string) => Promise<void>;
  reset: () => void;
}

export function useGUS(): UseGUSResult {
  const [data, setData] = useState<GUSCompanyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchByNIP = async (nip: string) => {
    if (!nip || nip.length < 10) {
      setError('NIP musi mieć co najmniej 10 cyfr');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch('/api/gus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nip }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Błąd podczas pobierania danych');
      }

      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError('Nie znaleziono firmy o podanym NIP');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    searchByNIP,
    reset,
  };
}
