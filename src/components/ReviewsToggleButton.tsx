"use client";

import { useState, useEffect } from 'react';

export default function ReviewsToggleButton() {
  const [reviewsEnabled, setReviewsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Pobierz aktualny stan ustawień przy ładowaniu komponentu
  useEffect(() => {
    fetchReviewsStatus();
  }, []);

  const fetchReviewsStatus = async () => {
    try {
      const response = await fetch('/api/reviews-settings');
      const data = await response.json();
      setReviewsEnabled(data.reviews_enabled);
    } catch (error) {
      console.error('Error fetching reviews status:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const toggleReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/reviews-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviews_enabled: !reviewsEnabled
        }),
      });

      if (response.ok) {
        setReviewsEnabled(!reviewsEnabled);
      } else {
        throw new Error('Failed to update setting');
      }
    } catch (error) {
      console.error('Error updating reviews status:', error);
      alert('Wystąpił błąd podczas aktualizacji ustawień');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="text-sm text-gray-500">Ładowanie ustawień...</div>;
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium text-gray-900">Przyjmowanie zgłoszeń opinii</h3>
        <p className="text-sm text-gray-500">
          {reviewsEnabled 
            ? "Obecnie przyjmujemy nowe zgłoszenia na usuwanie opinii" 
            : "Zgłoszenia opinii są obecnie wstrzymane"}
        </p>
      </div>
      <button
        onClick={toggleReviews}
        disabled={loading}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
          ${reviewsEnabled ? 'bg-green-600' : 'bg-gray-200'}
          ${loading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${reviewsEnabled ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
}
