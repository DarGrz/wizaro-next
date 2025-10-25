"use client";

import Link from "next/link";
import PaymentSection from "@/components/PaymentSection";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

// Komponent prostego podziękowania
function ThankYouContent() {
  return (
    <div className="bg-green-50 border border-green-100 rounded-lg p-5 mb-8 max-w-xl w-full">
      <h2 className="text-lg font-semibold mb-3 text-green-800">Zlecenie zostało przyjęte</h2>
      <p className="text-gray-700 mb-4">
        Twoje zlecenie zostało pomyślnie złożone i trafiło do realizacji.
      </p>
    </div>
  );
}

// Komponent który obsługuje parametry URL
function PaymentSectionWrapper() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount') ? parseInt(searchParams.get('amount')!) : 299;
  const description = searchParams.get('description') || "Zapłać za swoją usługę i miej spokój";

  console.log('PaymentSectionWrapper - URL params:', {
    orderId,
    amountFromURL: searchParams.get('amount'),
    amountParsed: amount,
    description
  });

  return <PaymentSection orderId={orderId || undefined} amount={amount} description={description} />;
}

export default function ThankYouPage() {
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Dziękujemy za zaufanie!</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
          W razie dodatkowych pytań, jesteśmy do dyspozycji.
      </p>
      
      <ThankYouContent />
      
      {/* Przycisk płatności */}
      {!showPaymentForm && (
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowPaymentForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
          >
            💳 Zapłać od razu i miej to z głowy!
          </button>
          
          {/* Korzyści z wcześniejszej płatności */}
          <div className="mt-4 text-sm text-gray-600 max-w-md mx-auto">
            <p className="mb-2 font-medium">Dlaczego warto zapłacić teraz?</p>
            <ul className="text-left space-y-1">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Natychmiastowe rozpoczęcie realizacji
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Priorytetowe traktowanie zlecenia
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Szybsze efekty i rezultaty
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Bezpieczna płatność przez Stripe
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Sekcja płatności - pokazuje się po kliknięciu */}
      {showPaymentForm && (
        <Suspense fallback={<div>Ładowanie...</div>}>
          <PaymentSectionWrapper />
        </Suspense>
      )}
      
      <div className="mt-8">
        <Link href="/" className="px-6 py-3 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition text-sm">
          Powrót na stronę główną
        </Link>
      </div>
    </div>
  );
}
