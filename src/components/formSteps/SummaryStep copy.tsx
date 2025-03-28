
"use client";

import React from "react";

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
  links?: string[];
}

export default function SummaryStep({
  company,
  reviews,
  totalPrice,
  isLoading,
  onBack,
  onConfirm,
  payer,
}: SummaryStepProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mb-4">
        Podsumowanie
      </h2>
      <ul className="text-sm text-gray-700 space-y-2">
        <li>
          <strong>Firma:</strong> {company.name}
        </li>
        <li>
          <strong>Imię i nazwisko:</strong> {company.first_name} {company.last_name}
        </li>
        <li>
          <strong>Email:</strong> {company.email}
        </li>
        <li>
          <strong>Telefon:</strong> {company.phone}
        </li>
        <li>
          <strong>Adres:</strong> {company.street}, {company.zip} {company.city}
        </li>
        <li>
          <strong>NIP:</strong> {company.nip}
        </li>
        <li>
          <strong>Portal:</strong>{" "}
          <a
            href={company.url}
            target="_blank"
            // className="text-blue-600 underline"
          >
            {company.url}
          </a>
        </li>
        <li>
          <strong>Liczba opinii:</strong> {reviews.length}
        </li>
        <li>
          <strong>Cena:</strong> {totalPrice} zł brutto (z VAT23%)
        </li>
      </ul>

      {company.different_payer && payer && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Dane płatnika</h3>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>
              <strong>Imię i nazwisko:</strong> {payer.name}
            </li>
            {payer.company_name && (
              <li>
                <strong>Nazwa firmy:</strong> {payer.company_name}
              </li>
            )}
            <li>
              <strong>Email:</strong> {payer.email}
            </li>
            {payer.nip && (
              <li>
                <strong>NIP:</strong> {payer.nip}
              </li>
            )}
            <li>
              <strong>Adres:</strong> {payer.street}, {payer.zip} {payer.city}
            </li>
          </ul>
        </div>
      )}

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          Wróć
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={`px-4 py-2 rounded text-sm flex items-center justify-center gap-2 
            ${isLoading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#002a5c] hover:bg-[#001e47] text-white"}
          `}
        >
          {isLoading ? "Przetwarzanie..." : "Przejdź do płatności"}
        </button>
      </div>
    </div>
  );
}

