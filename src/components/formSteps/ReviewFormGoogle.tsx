"use client";

import React from "react";

interface Review {
  author: string;
  content: string;
  url: string;
  date_added: string;
}

interface Props {
  reviews: Review[];
  expandedIndex: number;
  totalPrice: number;
  businessCardName: string;
  reviewsEnabled?: boolean; // Nowa właściwość
  onChange: (index: number, field: keyof Review, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onExpand: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  onProfileRemoval?: () => void; // Nowa funkcja dla usunięcia profilu
}

export default function ReviewFormGoogle({
  reviews,
  expandedIndex,
  totalPrice,
  businessCardName,
  reviewsEnabled = true, // Domyślnie włączone
  onChange,
  onAdd,
  onRemove,
  onExpand,
  onSubmit,
  onProfileRemoval,
//   onBack,
}: Props) {
  // Auto-fill the URL field with the business card name when expanding a review
  const handleExpand = (index: number) => {
    onExpand(index);
    
    // If expanding and the URL is empty, auto-fill with business card name
    if (expandedIndex !== index && !reviews[index].url) {
      onChange(index, "url", businessCardName);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
        Wpisz opinie do usunięcia z Google Maps
      </h2>
      
      {/* Display selected business card info */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h6M7 3h10M7 7h10M7 11h10" />
          </svg>
          <span className="font-medium text-blue-800 text-sm">Wybrana wizytówka:</span>
        </div>
        <span className="text-blue-700 text-sm font-medium">{businessCardName}</span>
      </div>

      {/* Komunikat o wyłączonych opiniach */}
      {!reviewsEnabled && (
        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-orange-800">
                Usługa chwilowo wstrzymana
              </h3>
              <div className="mt-2 text-sm text-orange-700">
                <p>Z powodu zmian w algorytmie Google obecnie nie przyjmujemy nowych zleceń na usuwanie pojedynczych opinii.</p>
                <p className="mt-2 font-medium">Proponujemy usunięcie całej Wizytówki Google lub zresetowanie czyli usunięcie wszystkich opinii.</p>
                
              </div>
              {onProfileRemoval && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={onProfileRemoval}
                    className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700 transition-colors"
                  >
                    Przejdź do usunięcia całej wizytówki
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lista opinii - wyblurowana gdy wyłączone */}
      <div className={!reviewsEnabled ? 'blur-sm pointer-events-none opacity-50' : ''}>
        {reviews.map((review, index) => (
          <div
            key={index}
            className="p-2 border-gray-300 rounded-xl space-y-3"
          >
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-700">
                <p className="font-medium">
                  Opinia #{index + 1} {review.author && `– ${review.author}`}
                </p>
                {expandedIndex !== index && review.content && (
                  <p className="text-gray-500 truncate text-sm">
                    {review.content.slice(0, 60)}...
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {reviews.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="text-[#002a5c] text-sm hover:underline mr-4"
                  >
                    Usuń
                  </button>
                )}
                <button
                  type="button"
                  className="text-sm text-white bg-[#002a5c] hover:bg-[#001e47] px-3 py-1 rounded"
                  onClick={() => handleExpand(index)}
                >
                  {expandedIndex === index ? "Zwiń" : "Rozwiń"}
                </button>
              </div>
            </div>
            {expandedIndex === index && (
              <>
                <input
                  type="text"
                  placeholder="Autor opinii"
                  required
                  value={review.author}
                  onChange={(e) => onChange(index, "author", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
                <textarea
                  placeholder="Treść opinii"
                  value={review.content}
                  onChange={(e) => onChange(index, "content", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  rows={3}
                />
                <input
                  type="text"
                  placeholder="Portal (automatycznie uzupełniony nazwą wizytówki)"
                  required
                  value={review.url}
                  onChange={(e) => onChange(index, "url", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-50"
                  readOnly
                />
                <input
                  type="date"
                  placeholder="Data dodania opinii"
                  value={review.date_added}
                  onChange={(e) => onChange(index, "date_added", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </>
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-center text-gray-700">
        Dodaj autora i datę opinii w celu dokładnej weryfikacji.
      </p>
      <p className="text-sm text-center text-gray-700">
        Cena: <strong className="text-lg">{totalPrice} zł brutto (z VAT 23%)</strong>
      </p>
      <div className="flex justify-between gap-3">
        {/* <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Wróć do wyboru wizytówki
        </button> */}
        <button
          type="button"
          onClick={onAdd}
          disabled={!reviewsEnabled}
          className={`px-5 py-2.5 rounded text-sm ${
            reviewsEnabled 
              ? 'bg-gray-200 hover:bg-gray-300' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Dodaj kolejną opinię
        </button>
        <button
          type="submit"
          disabled={!reviewsEnabled}
          className={`px-12 py-2.5 rounded text-sm ${
            reviewsEnabled 
              ? 'bg-[#002a5c] text-white hover:bg-[#001e47]' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Przejdź dalej
        </button>
      </div>
    </form>
  );
}
