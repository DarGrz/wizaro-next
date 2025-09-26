'use client';

import { useState } from 'react';
import ReviewModal from '@/components/ReviewModal';

interface Review {
  id: number;
  author: string;
  content: string;
  url: string;
  date_added: string;
  company_id: string;
  companies?: {
    name: string;
    email: string;
    gmb_url?: string;
    phone?: string;
  };
}

interface ReviewsTableProps {
  reviews: Review[];
}

export default function ReviewsTable({ reviews }: ReviewsTableProps) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewReview = (review: Review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  return (
    <>
      <div className="bg-white shadow rounded-xl w-full overflow-x-auto">
        <table className="min-w-[1000px] w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Firma</th>
              <th className="p-3">Autor opinii</th>
              <th className="p-3">Treść opinii</th>
              <th className="p-3">Data dodania</th>
              <th className="p-3">Link GMB</th>
              <th className="p-3">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <div className="font-medium text-gray-900">
                    {review.companies?.name || 'Brak nazwy'}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {review.companies?.email}
                  </div>
                  {review.companies?.phone && (
                    <div className="text-gray-500 text-xs">
                      📞 {review.companies.phone}
                    </div>
                  )}
                </td>
                <td className="p-3">
                  {review.author || 'Brak autora'}
                </td>
                <td className="p-3 max-w-xs">
                  <div className="truncate">
                    {review.content || 'Brak treści'}
                  </div>
                  {review.content && review.content.length > 100 && (
                    <button
                      onClick={() => handleViewReview(review)}
                      className="text-xs text-blue-600 hover:text-blue-800 mt-1 underline"
                    >
                      Zobacz pełną treść ({review.content.length} znaków)
                    </button>
                  )}
                </td>
                <td className="p-3">
                  {review.date_added ? 
                    new Date(review.date_added).toLocaleDateString('pl-PL') : 
                    'Brak daty'
                  }
                </td>
                <td className="p-3">
                  {review.companies?.gmb_url ? (
                    <a 
                      href={review.companies.gmb_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                    >
                      🔗 GMB
                    </a>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Brak linku
                    </span>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => handleViewReview(review)}
                      className="text-xs text-indigo-600 hover:text-indigo-800 underline"
                    >
                      👁️ Szczegóły
                    </button>
                    {review.url && (
                      <a 
                        href={review.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-green-600 hover:text-green-800 underline"
                      >
                        📝 Link do opinii
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {reviews.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-6xl mb-4">📝</div>
            <div className="text-xl font-medium mb-2">Brak opinii</div>
            <div className="text-sm">Nie znaleziono żadnych opinii w bazie danych.</div>
          </div>
        )}
      </div>

      {/* Modal do wyświetlania szczegółów opinii */}
      {selectedReview && (
        <ReviewModal
          review={selectedReview}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}