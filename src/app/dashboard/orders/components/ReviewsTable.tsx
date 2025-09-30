'use client';

import { useState } from 'react';
import ReviewModal from '@/components/ReviewModal';

interface Review {
  id: number;
  author: string;
  content: string;
  url: string;
  date_added: string;
  created_at?: string;
  company_id: string;
  status?: 'nowa' | 'w_trakcie' | 'usunięta' | 'przywrócona' | 'brak_możliwości';
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

interface ReviewsTableProps {
  reviews: Review[];
}

// Komponent do wyświetlania i edycji statusu opinii
function StatusBadge({ reviewId, status, notes }: { reviewId: number; status: string; notes?: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [currentNotes, setCurrentNotes] = useState(notes || '');
  const [saving, setSaving] = useState(false);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'nowa':
        return { bg: 'bg-blue-100', text: 'text-blue-800', icon: '🆕', label: 'Nowa' };
      case 'w_trakcie':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳', label: 'W trakcie' };
      case 'usunięta':
        return { bg: 'bg-red-100', text: 'text-red-800', icon: '❌', label: 'Usunięta' };
      case 'przywrócona':
        return { bg: 'bg-green-100', text: 'text-green-800', icon: '✅', label: 'Przywrócona' };
      case 'brak_możliwości':
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: '🚫', label: 'Brak możliwości' };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', icon: '❓', label: 'Nieznany' };
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/reviews/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId, status: currentStatus, notes: currentNotes }),
      });
      
      if (response.ok) {
        setIsEditing(false);
        window.location.reload(); // Odśwież stronę żeby pokazać zmiany
      } else {
        alert('Błąd przy zapisywaniu statusu');
      }
    } catch {
      alert('Błąd przy zapisywaniu statusu');
    } finally {
      setSaving(false);
    }
  };

  const config = getStatusConfig(currentStatus);

  if (isEditing) {
    return (
      <div className="flex flex-col gap-2 min-w-48">
        <select
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value)}
          className="text-xs border rounded px-2 py-1"
        >
          <option value="nowa">🆕 Nowa</option>
          <option value="w_trakcie">⏳ W trakcie</option>
          <option value="usunięta">❌ Usunięta</option>
          <option value="przywrócona">✅ Przywrócona</option>
          <option value="brak_możliwości">🚫 Brak możliwości</option>
        </select>
        <textarea
          value={currentNotes}
          onChange={(e) => setCurrentNotes(e.target.value)}
          placeholder="Notatki (opcjonalne)..."
          className="text-xs border rounded px-2 py-1 resize-none"
          rows={2}
        />
        <div className="flex gap-1">
          <button
            onClick={handleSave}
            disabled={saving}
            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? '...' : '✓ Zapisz'}
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setCurrentStatus(status);
              setCurrentNotes(notes || '');
            }}
            className="text-xs bg-gray-600 text-white px-2 py-1 rounded hover:bg-gray-700"
          >
            ✕ Anuluj
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-1">
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.icon} {config.label}
      </span>
      {notes && (
        <div className="text-xs text-gray-600 max-w-32 truncate" title={notes}>
          💬 {notes}
        </div>
      )}
      <button
        onClick={() => setIsEditing(true)}
        className="text-xs text-indigo-600 hover:text-indigo-800 underline"
      >
        ✏️ Zmień status
      </button>
    </div>
  );
}

export default function ReviewsTable({ reviews }: ReviewsTableProps) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('🔍 DEBUG ReviewsTable - Received reviews:', reviews);
  console.log('🔍 DEBUG ReviewsTable - Reviews length:', reviews?.length);
  console.log('🔍 DEBUG ReviewsTable - First review:', reviews?.[0]);

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
        <table className="min-w-[1600px] w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Profil GMB</th>
              <th className="p-3">Firma</th>
              <th className="p-3">Autor opinii</th>
              <th className="p-3">Treść opinii</th>
              <th className="p-3">Status</th>
              <th className="p-3">GMB Link</th>
              <th className="p-3">Data dodania</th>
              <th className="p-3">Ostatnia zmiana</th>
              <th className="p-3">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-t hover:bg-gray-50">
                {/* Profil GMB - pierwsza kolumna */}
                <td className="p-3">
                  <div className="text-xs max-w-48 break-words">
                    {review.url || 'Brak danych'}
                  </div>
                </td>
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
                {/* Status opinii */}
                <td className="p-3">
                  <StatusBadge 
                    reviewId={review.id} 
                    status={review.status || 'w_trakcie'} 
                    notes={review.notes}
                  />
                </td>
                {/* GMB Link */}
                <td className="p-3">
                  {review.gmb_link ? (
                    <a 
                      href={review.gmb_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-green-600 hover:text-green-800 underline truncate max-w-32 block"
                      title={review.gmb_link}
                    >
                      🏢 GMB Profile
                    </a>
                  ) : (
                    <span className="text-xs text-gray-500">Brak GMB</span>
                  )}
                </td>
                <td className="p-3">
                  {review.created_at ? 
                    new Date(review.created_at).toLocaleDateString('pl-PL') : 
                    review.date_added ? 
                      new Date(review.date_added).toLocaleDateString('pl-PL') : 
                      'Brak daty'
                  }
                </td>
                {/* Ostatnia zmiana */}
                <td className="p-3">
                  {review.last_modified_at ? (
                    <div className="text-xs">
                      <div>{new Date(review.last_modified_at).toLocaleDateString('pl-PL')}</div>
                      <div className="text-gray-500">
                        {review.admin_users?.email || 'System'} 
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-500">Brak danych</span>
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