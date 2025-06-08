'use client';

import { useState, useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function InfoModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500); // Show modal after 1.5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-50">
        <div className="bg-white rounded-xl shadow-2xl p-6 m-4 relative transform transition-all">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="mb-6 flex items-start gap-4">
            <div className="shrink-0">
              <AlertCircle className="w-8 h-8 text-[#002a5c]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#002a5c] mb-3">
                Ważna informacja
              </h3>
              <div className="text-gray-600 space-y-4">
                <p>
                  W związku z ostatnimi zmianami w algorytmie Google, lepszą opcją w zależności od branży i ilości opinii, może być usunięcie i założenie nowej wizytówki.
                </p>
                <p>
                  Takie rozwiązanie jest w 100% skuteczne i może okazać się bardziej korzystne finansowo. Cały proces trwa 7 dni.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end mt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Zamknij
            </button>
            <Link
              href="/resetowanie-wizytowki-formularz"
              className="px-6 py-2 bg-[#002a5c] text-white rounded-lg hover:bg-[#001e47] transition-colors"
            >
              Sprawdź szczegóły
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
