'use client';

import { useState, useEffect, useCallback } from 'react';
import ReviewsTable from './ReviewsTable';

interface Review {
  id: number;
  author: string;
  content: string;
  url: string;
  date_added: string;
  created_at?: string;
  company_id: string;
  status?: 'nowa' | 'usunięta' | 'przywrócona' | 'w_trakcie' | 'brak_możliwości';
  last_modified_by?: number;
  last_modified_at?: string;
  notes?: string;
  gmb_link?: string;
  companies?: {
    name: string;
    email: string;
    gmb_url?: string;
    phone?: string;
  };
  admin_users?: {
    email: string;
  };
}

interface ReviewsSectionProps {
  initialCount: number;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  total: number;
}

export default function ReviewsSection({ initialCount }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filteredCount, setFilteredCount] = useState(initialCount);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
    limit: 50,
    total: 0
  });

  const fetchReviews = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      params.append('page', page.toString());
      params.append('limit', '50');
      
      const response = await fetch(`/api/reviews?${params.toString()}`);
      const data = await response.json();
      
      console.log('🔍 DEBUG ReviewsSection - Response:', response.status);
      console.log('🔍 DEBUG ReviewsSection - Data:', data);
      console.log('🔍 DEBUG ReviewsSection - Reviews array:', data.reviews);
      console.log('🔍 DEBUG ReviewsSection - Reviews length:', data.reviews?.length);
      
      if (response.ok) {
        setReviews(data.reviews || []);
        setFilteredCount(data.count || 0);
        setPagination(data.pagination || {
          currentPage: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
          limit: 50,
          total: 0
        });
        console.log('✅ DEBUG ReviewsSection - State updated, reviews:', data.reviews?.length);
      } else {
        console.error('❌ Błąd pobierania opinii:', data.error);
      }
    } catch (error) {
      console.error('Błąd pobierania opinii:', error);
    } finally {
      setLoading(false);
    }
  }, [dateFrom, dateTo]);

  useEffect(() => {
    fetchReviews(1); // Zawsze zacznij od strony 1 przy zmianie filtrów
  }, [fetchReviews]);

  const handleResetFilters = () => {
    setDateFrom('');
    setDateTo('');
  };

  const handlePageChange = (newPage: number) => {
    fetchReviews(newPage);
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
            `Znaleziono ${filteredCount} opinii${dateFrom || dateTo ? ' (z filtrem)' : ''} | 
             Strona ${pagination.currentPage} z ${pagination.totalPages} 
             (${pagination.limit} na stronę)`
          )}
        </div>
      </div>

      {/* Paginacja - góra */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-4 py-3 bg-gray-50 rounded-lg">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className={`px-3 py-1 rounded text-sm ${
              pagination.hasPrevPage
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            ← Poprzednia
          </button>
          
          <span className="px-3 py-1 text-sm text-gray-700">
            Strona {pagination.currentPage} z {pagination.totalPages}
          </span>
          
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className={`px-3 py-1 rounded text-sm ${
              pagination.hasNextPage
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Następna →
          </button>
        </div>
      )}

      {/* Tabela opinii */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">Ładowanie opinii...</div>
        </div>
      ) : (
        <>
          <ReviewsTable reviews={reviews} />
          
          {/* Paginacja - dół */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4 py-3 bg-gray-50 rounded-lg">
              <button
                onClick={() => handlePageChange(1)}
                disabled={pagination.currentPage === 1}
                className={`px-2 py-1 rounded text-sm ${
                  pagination.currentPage !== 1
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                1
              </button>
              
              {pagination.currentPage > 3 && (
                <span className="text-gray-500">...</span>
              )}
              
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const page = Math.max(1, pagination.currentPage - 2) + i;
                if (page > pagination.totalPages) return null;
                if (page === 1) return null; // Już pokazany wyżej
                
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-2 py-1 rounded text-sm ${
                      page === pagination.currentPage
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              
              {pagination.currentPage < pagination.totalPages - 2 && (
                <span className="text-gray-500">...</span>
              )}
              
              {pagination.totalPages > 1 && (
                <button
                  onClick={() => handlePageChange(pagination.totalPages)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`px-2 py-1 rounded text-sm ${
                    pagination.currentPage !== pagination.totalPages
                      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {pagination.totalPages}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}