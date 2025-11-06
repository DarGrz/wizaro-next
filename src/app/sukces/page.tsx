"use client";

import Link from "next/link";

// Komponent prostego podziękowania
function ThankYouContent() {
  return (
    <div className="bg-green-50 border border-green-100 rounded-lg p-5 mb-8 max-w-xl w-full">
      <h2 className="text-lg font-semibold mb-3 text-green-800">Zlecenie zostało przyjęte</h2>
      <p className="text-gray-700 mb-4">
        Twoje zlecenie zostało złożone pomyślnie i od razu trafiło do realizacji.
      </p>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Dziękujemy za zaufanie!</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        W razie dodatkowych pytań, jesteśmy do dyspozycji.
      </p>
      
      <ThankYouContent />
      
      <Link href="/" className="px-6 py-3 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition text-sm">
        Powrót na stronę główną
      </Link>
    </div>
  );
}
