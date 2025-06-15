// components/formSteps/ReviewForm.tsx
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
  onChange: (index: number, field: keyof Review, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onExpand: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function ReviewForm({
  reviews,
  expandedIndex,
  totalPrice,
  onChange,
  onAdd,
  onRemove,
  onExpand,
  onSubmit,
}: Props) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
        Opinie do usunięcia
      </h2>
      {reviews.map((review, index) => (
        <div
          key={index}
          className="p-2  border-gray-300 rounded-xl space-y-3"
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
                onClick={() => onExpand(index)}
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
              />
              <input
                type="text"
                placeholder="Nazwa portalu lub link do opinii"
                required
                value={review.url}
                onChange={(e) => onChange(index, "url", e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
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
      <p className="text-sm text-center text-gray-700">
        Dodaj autora i datę opinii w celu dokładnej weryfikacji.
      </p>
      <p className="text-sm text-center text-gray-700">
        Cena: <strong className="text-lg">{totalPrice} zł brutto (z VAT 23%)</strong>
      </p>
      <div className="flex justify-between gap-3">
        <div>
          {reviews.some(r => r.author && r.url) && (
            <button
              type="button"
              onClick={onAdd}
              className="px-3 py-3 bg-gray-200 hover:bg-gray-300 rounded-full text-[#002a5c] flex items-center justify-center"
              aria-label="Dodaj kolejną opinię"
              title="Dodaj kolejną opinię"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 bg-[#002a5c] text-white hover:bg-[#001e47] rounded text-sm"
        >
          Przejdź dalej
        </button>
      </div>
    </form>
  );
}
