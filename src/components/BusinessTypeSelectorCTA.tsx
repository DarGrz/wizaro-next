'use client';

import React from 'react';
import Link from 'next/link';

export default function BusinessTypeSelectorCTA() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Usuń niechciane informacje o swojej firmie
          </h2>
          <p className="text-gray-600 text-lg">
            Wybierz odpowiednią opcję i odzyskaj kontrolę nad wizerunkiem swojej firmy
          </p>
        </div>

        <div className="flex flex-col gap-6 mt-2">
          <Link
            href="/formularz-profil"
            className="group relative block w-full p-6 bg-[#002a5c] text-white rounded-lg hover:bg-[#001e47] transition-all transform hover:scale-[1.02] hover:shadow-md"
          >
            <div className="flex flex-col">
              <span className="text-xl font-semibold mb-2">Usuń profil firmy</span>
              <span className="text-sm opacity-90">Usuń profil firmy wraz ze wszystkimi opiniami →</span>
            </div>
          </Link>

          <Link
            href="/formularz-opinie"
            className="group relative block w-full p-6 bg-white border-2 border-[#002a5c] text-[#002a5c] rounded-lg hover:bg-gray-50 transition-all transform hover:scale-[1.02] hover:shadow-md"
          >
            <div className="flex flex-col">
              <span className="text-xl font-semibold mb-2">Usuń opinie</span>
              <span className="text-sm opacity-90">Usuń wybrane opinie o Twojej firmie →</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
