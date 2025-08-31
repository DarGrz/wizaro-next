"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

// Komponent do pobierania i użycia parametrów URL
function TrackingContent() {
  const searchParams = useSearchParams();
  const tracking_token = searchParams.get('tracking_token');
  const [copied, setCopied] = useState(false);
  
  const trackingUrl = tracking_token 
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/podglad-zlecenia/${tracking_token}`
    : null;

  const copyToClipboard = () => {
    if (trackingUrl) {
      navigator.clipboard.writeText(trackingUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {trackingUrl && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8 max-w-xl w-full ">
          <h2 className="text-lg font-semibold mb-3 text-blue-800">Śledź status swojego zlecenia</h2>
          <p className="text-gray-700 mb-4">
            Zachowaj poniższy link, aby w dowolnym momencie sprawdzić status realizacji swojego zlecenia:
          </p>
          <div className="bg-white p-3 rounded border border-blue-200 mb-3 flex justify-between items-center">
            <span className="text-blue-700 font-mono text-sm truncate overflow-hidden">
              {trackingUrl}
            </span>
            <button 
              onClick={copyToClipboard}
              className="ml-2 text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded transition-colors"
            >
              {copied ? "Skopiowano!" : "Kopiuj"}
            </button>
          </div>
          <Link href={`/podglad-zlecenia/${tracking_token}`} className="block w-full">
            <button className="w-full bg-[#002a5c] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#001e47] transition">
              Sprawdź status zlecenia
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

// Komponent zastępczy podczas ładowania
function TrackingFallback() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-5 mb-8 max-w-xl w-full">
      <h2 className="text-lg font-semibold mb-3 text-blue-800">Ładowanie danych...</h2>
      <div className="animate-pulse bg-white h-12 rounded border border-blue-200 mb-3"></div>
      <div className="animate-pulse bg-[#002a5c] h-10 rounded-lg"></div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Dziękujemy za zaufanie!</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Twoje zlecenie zostało złożone pomyślnie i od razu trafiło do realizacji.
      </p>
      
      <div  className="hidden">
        <Suspense fallback={<TrackingFallback/>}>
        <TrackingContent  />
      </Suspense>
      </div>
      
      <Link href="/" className="px-6 py-3 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition text-sm">
        Powrót na stronę główną
      </Link>
    </div>
  );
}
