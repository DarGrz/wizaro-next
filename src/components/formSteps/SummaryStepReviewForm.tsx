"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface CompanyData {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  nip: string;
  phone: string;
  url: string;
  street: string;
  city: string;
  zip: string;
  different_payer: boolean;
}

interface Review {
  author: string;
  content: string;
  url: string;
  date_added: string;
}

interface PayerData {
  name: string;
  company_name?: string;
  email: string;
  nip?: string;
  street: string;
  zip: string;
  city: string;
}

interface SummaryStepProps {
  company: CompanyData;
  reviews: Review[];
  totalPrice: number;
  isLoading: boolean;
  onBack: () => void;
  onConfirm: () => void;
  payer?: PayerData;
  payer_id?: string;
}

export default function SummaryStep({
  company,
  reviews,
  totalPrice,
  isLoading,
  onBack,
  // onConfirm,
  payer,
}: SummaryStepProps) {
  const router = useRouter();
  const [regulaminAccepted, setRegulaminAccepted] = React.useState(false);

  const handleConfirm = () => {
    if (regulaminAccepted) {
      router.push("/thankyou");
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Podsumowanie zgłoszenia
      </h2>

      {/* Dane firmy */}
      <div className="space-y-2 text-gray-700">
        <h3 className="text-md font-semibold text-gray-800 mb-2">Dane firmy:</h3>
        <p><strong>Nazwa:</strong> {company.name}</p>
        <p><strong>Osoba kontaktowa:</strong> {company.first_name} {company.last_name}</p>
        <p><strong>Email:</strong> {company.email}</p>
        <p><strong>Telefon:</strong> {company.phone}</p>
        <p><strong>Adres:</strong> {company.street}, {company.zip} {company.city}</p>
        <p className="border-b pb-4"><strong>NIP:</strong> {company.nip}</p>
      </div>

      {/* Dane płatnika (jeśli inny niż firma) */}
      {company.different_payer && payer && (
        <div className="space-y-2 text-gray-700">
          <h3 className="text-md font-semibold text-gray-800 mb-2">Dane płatnika:</h3>
          {payer.company_name && <p><strong>Firma:</strong> {payer.company_name}</p>}
          <p><strong>Imię i nazwisko:</strong> {payer.name}</p>
          <p><strong>Email:</strong> {payer.email}</p>
          {payer.nip && <p><strong>NIP:</strong> {payer.nip}</p>}
          <p><strong>Adres:</strong> {payer.street}, {payer.zip} {payer.city}</p>
        </div>
      )}

      {/* Lista opinii lub profili */}
      {reviews?.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-md font-semibold text-gray-800 mb-2">
            Zgłoszone do usunięcia:
          </h3>
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-sm"
            >
              <p><strong>Firma / Autor:</strong> {review.author}</p>
              {review.content && <p><strong>Treść lub NIP:</strong> {review.content}</p>}
              {review.date_added && <p><strong>Data dodania:</strong> {review.date_added}</p>}
              {review.url && (
                <p>
                  <strong>Link:</strong>{" "}
                  <a
                    href={review.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {review.url}
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Cena */}
      <div className="text-gray-800 text-lg font-medium pt-2 border-t">
        Łączna cena: <strong>{totalPrice} zł brutto (z VAT 23%)</strong>
      </div>

      {/* Przyciski i akceptacja regulaminu */}
      <div className="flex flex-col gap-2 mt-6">
        <label className="flex items-center text-sm gap-2 mb-2">
          <input
            type="checkbox"
            checked={regulaminAccepted}
            onChange={e => setRegulaminAccepted(e.target.checked)}
            className="accent-[#002a5c]"
          />
          <span>
            Akceptuję <a href="/regulamin-zamowien" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">Regulamin składania zamówień</a>
          </span>
        </label>
        <div className="flex justify-between gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition text-sm"
          >
            ← Wróć
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading || !regulaminAccepted}
            className={`px-6 py-3 rounded text-sm flex items-center justify-center gap-2 
              ${isLoading || !regulaminAccepted ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#002a5c] hover:bg-[#001e47] text-white"}
            `}
          >
            {isLoading ? "Przetwarzanie..." : "Wyślij zlecenie"}
          </button>
        </div>
      </div>
    </div>
  );
}
