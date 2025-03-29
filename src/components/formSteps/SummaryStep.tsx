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
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Podsumowanie zamówienia
      </h2>

      <div className="">
        <h3 className=""></h3>
        <ul className="">
          <li  className=" p-2 px-2 my-1 "><strong>Nazwa:</strong> {company.name}</li>
          <li  className="opacity-70 p-2 px-2  my-1"><strong>Osoba kontaktowa:</strong> {company.first_name} {company.last_name}</li>
          <li  className="opacity-70 p-2 px-2  my-1"><strong>Email:</strong> {company.email}</li>
          <li  className="opacity-70 p-2 px-2  my-1"><strong>Telefon:</strong> {company.phone}</li>
          <li  className="opacity-70 p-2 px-2  my-1"><strong>Adres:</strong> {company.street}, {company.zip} {company.city}</li>
          <li  className="opacity-70 p-2 px-2  my-1"><strong>NIP:</strong> {company.nip}</li>
          {/* <li><strong>Liczba opinii do usunięcia:</strong> {reviews.length}</li>/ */}
        </ul>
      </div>

      {company.different_payer && payer && (
        <div className="bg-gray-50 rounded-xl p-5 mb-6 ">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Dane płatnika</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><strong>Imię i nazwisko:</strong> {payer.name}</li>
            {payer.company_name && <li><strong>Nazwa firmy:</strong> {payer.company_name}</li>}
            <li><strong>Email:</strong> {payer.email}</li>
            {payer.nip && <li><strong>NIP:</strong> {payer.nip}</li>}
            <li><strong>Adres:</strong> {payer.street}, {payer.zip} {payer.city}</li>
          </ul>
        </div>
      )}

      <div  className="p-2 px-2  my-1">
        <p className="mb-1"><strong>Opinie do usunięcia:</strong> {reviews.length}</p>
        <p className="text-lg font-semibold mb-2">Cena końcowa:</p>
        <p><strong>{totalPrice} zł</strong> (zawiera 23% VAT)</p>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-xl  border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition text-sm"
        >
          ← Wróć
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={`px-5 py-2 rounded text-sm font-medium transition 
            ${isLoading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#002a5c] hover:bg-[#001e47] text-white"}
          `}
        >
          {isLoading ? "Przetwarzanie..." : "Przejdź do płatności"}
        </button>
      </div>
    </div>
  );
}
