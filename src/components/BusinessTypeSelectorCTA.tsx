'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function BusinessTypeSelectorCTA() {
  const [businessType, setBusinessType] = useState<'jdg' | 'spolka' | null>(null);

  const getLink = (type: 'profil' | 'opinie') => {
    if (businessType === 'spolka') {
      return type === 'profil' ? '/formularz-profil-spolka' : '/formularz-opinie';
    }
    if (businessType === 'jdg') {
      return type === 'profil' ? '/formularz-profil' : '/formularz-opinie';
    }
    return '#';
  };

  return (
    <div className="relative px-4 w-full max-w-lg mx-auto">
      <div className="bg-white rounded shadow-md p-8 flex flex-col gap-6 text-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Usuń informacje o swojej firmie
          </h2>
          <p className="text-gray-600 text-sm mt-1">Wybierz rodzaj działalności</p>
        </div>

        {!businessType ? (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setBusinessType('jdg')}
              className="w-full h-12 rounded bg-[#002a5c] text-white hover:bg-[#001e47] transition"
            >
              Jednoosobowa działalność
            </button>
            <button
              onClick={() => setBusinessType('spolka')}
              className="w-full h-12 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Spółka
            </button>
          </div>
        ) : (
          <>
            <div>
              <p className="text-gray-700 text-sm mb-2">Co chcesz usunąć?</p>
            </div>
            <div className="flex flex-col gap-4">
              <Link
                href={getLink('profil')}
                className="block w-full h-12 bg-[#002a5c] text-white rounded hover:bg-[#001e47] transition flex items-center justify-center"
              >
                Profil z opiniami
              </Link>
              <Link
                href={getLink('opinie')}
                className="block w-full h-12 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition flex items-center justify-center text-sm"
              >
                Pojedyncze opinie
              </Link>
              <button
                onClick={() => setBusinessType(null)}
                className="text-sm text-gray-500 hover:text-gray-700 transition mt-2"
              >
                ← Wróć do wyboru działalności
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
