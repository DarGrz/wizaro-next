'use client';

import { useState, useEffect } from 'react';
import ReviewsTable from './ReviewsTable';

interface Review {
  id: number;
  author: string;
  content: string;
  url: string;
  date_added: string;
  created_at?: string;
  company_id: string;
  companies?: {
    name: string;
    email: string;
    gmb_url?: string;
    phone?: string;
  };
}

interface ReviewsSectionProps {
  initialCount: number;
}

export default function ReviewsSection({ initialCount }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filteredCount, setFilteredCount] = useState(initialCount);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (dateFrom) params.append('dateFrom', dateFrom);
        if (dateTo) params.append('dateTo', dateTo);
        
        const response = await fetch(`/api/reviews?${params.toString()}`);
        const data = await response.json();
        
        console.log('🔍 DEBUG ReviewsSection - Response:', response.status);
        console.log('🔍 DEBUG ReviewsSection - Data:', data);
        console.log('🔍 DEBUG ReviewsSection - Reviews array:', data.reviews);
        console.log('🔍 DEBUG ReviewsSection - Reviews length:', data.reviews?.length);
        
        if (response.ok) {
          setReviews(data.reviews || []);
          setFilteredCount(data.count || 0);
          console.log('✅ DEBUG ReviewsSection - State updated, reviews:', data.reviews?.length);
        } else {
          console.error('❌ Błąd pobierania opinii:', data.error);
        }
      } catch (error) {
        console.error('Błąd pobierania opinii:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [dateFrom, dateTo]);

  const handleResetFilters = () => {
    setDateFrom('');
    setDateTo('');
  };

  return (
    <div>
      {/* Filtry daty */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Filtruj opinie po dacie:</h3>
        <div className="flex gap-4 items-end">
          <div>
            <label htmlFor="dateFrom" className="block text-xs text-gray-600 mb-1">
              Od daty:
            </label>
            <input
              type="date"
              id="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="dateTo" className="block text-xs text-gray-600 mb-1">
              Do daty:
            </label>
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Wyczyść filtry
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          {loading ? (
            'Ładowanie...'
          ) : (
            `Znaleziono ${filteredCount} opinii${dateFrom || dateTo ? ' (z filtrem)' : ''}`
          )}
        </div>
      </div>

      {/* Tabela opinii */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">Ładowanie opinii...</div>
        </div>
      ) : (
        <ReviewsTable reviews={reviews} />
      )}
    </div>
  );
}