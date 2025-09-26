'use client';

interface Review {
  id: number;
  author: string;
  content: string;
  url: string;
  date_added: string;
  companies?: {
    name: string;
    email: string;
    gmb_url?: string;
    phone?: string;
  };
}

interface ReviewModalProps {
  review: Review;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ review, isOpen, onClose }: ReviewModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              📝 Szczegóły opinii
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Firma */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">🏢 Informacje o firmie</h3>
            <div className="space-y-1 text-sm">
              <div><strong>Nazwa:</strong> {review.companies?.name || 'Brak nazwy'}</div>
              <div><strong>Email:</strong> {review.companies?.email || 'Brak emaila'}</div>
              {review.companies?.phone && (
                <div><strong>Telefon:</strong> {review.companies.phone}</div>
              )}
              {review.companies?.gmb_url && (
                <div>
                  <strong>GMB:</strong>{' '}
                  <a 
                    href={review.companies.gmb_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    Zobacz profil GMB
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Opinia */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">👤 Autor opinii</h3>
            <p className="text-sm text-gray-700">{review.author || 'Brak autora'}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">💬 Treść opinii</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {review.content || 'Brak treści opinii'}
              </p>
            </div>
          </div>

          {/* Metadane */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">📅 Data dodania</h4>
              <p className="text-sm text-gray-600">
                {review.date_added ? 
                  new Date(review.date_added).toLocaleDateString('pl-PL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 
                  'Brak daty'
                }
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">🆔 ID opinii</h4>
              <p className="text-sm text-gray-600 font-mono">#{review.id}</p>
            </div>
          </div>

          {/* Linki */}
          <div className="flex flex-col sm:flex-row gap-3">
            {review.url && (
              <a 
                href={review.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                📝 Zobacz opinię na oryginalnej stronie
              </a>
            )}
            {review.companies?.gmb_url && (
              <a 
                href={review.companies.gmb_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔗 Zobacz profil GMB
              </a>
            )}
          </div>

          {/* Zamknij */}
          <div className="mt-6 pt-4 border-t">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}