"use client";

import React from "react";

interface Company {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  nip: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  different_payer: boolean;
}

interface Payer {
  name: string;
  company_name?: string;
  email: string;
  nip?: string;
  street: string;
  zip: string;
  city: string;
}

interface RemovalItem {
  companyName: string;
  nip: string;
  portal: string;
  customPortal?: string;
  price: number;
}

interface Props {
  company: Company;
  removals: RemovalItem[];
  totalPrice: number;
  isLoading: boolean;
  onBack: () => void;
  onConfirm: () => void;
  payer?: Payer;
  payer_id?: string;
}

export default function SummaryStepRemovalBazy({
  company,
  removals,
  totalPrice,
  isLoading,
  onBack,
  onConfirm,
  payer,
}: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Podsumowanie zlecenia
      </h2>
      
      {/* Company Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">Dane firmy</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Nazwa:</strong> {company.name}</p>
          <p><strong>Kontakt:</strong> {company.first_name} {company.last_name}</p>
          <p><strong>Email:</strong> {company.email}</p>
          <p><strong>Telefon:</strong> {company.phone}</p>
          <p><strong>NIP:</strong> {company.nip}</p>
          <p><strong>Adres:</strong> {company.street}, {company.zip} {company.city}</p>
        </div>
      </div>

      {/* Payer Information */}
      {payer && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">Dane płatnika</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p><strong>Nazwa:</strong> {payer.name}</p>
            {payer.company_name && <p><strong>Firma:</strong> {payer.company_name}</p>}
            <p><strong>Email:</strong> {payer.email}</p>
            {payer.nip && <p><strong>NIP:</strong> {payer.nip}</p>}
            <p><strong>Adres:</strong> {payer.street}, {payer.zip} {payer.city}</p>
          </div>
        </div>
      )}

      {/* Removal Items */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">Portale do usunięcia profili</h3>
        <div className="space-y-3">
          {removals.map((removal, index) => (
            <div key={index} className="bg-white p-3 rounded border">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {/* <p className="font-medium text-gray-800">
                    {removal.companyName}
                  </p>
                  <p className="text-sm text-gray-600">
                    NIP: {removal.nip}
                  </p> */}
                  <p className="text-sm text-gray-600">
                    Portal: <span className="font-medium">
                      {removal.portal === "Inne" && removal.customPortal 
                        ? removal.customPortal 
                        : removal.portal}
                    </span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">
                    {removal.price/100} zł
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Price */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-800">
            Łączna kwota:
          </span>
          <span className="text-xl font-bold text-blue-600">
            {totalPrice} zł brutto
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          (zawiera VAT 23%)
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm font-medium"
          disabled={isLoading}
        >
          Wróć
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-[#002a5c] text-white hover:bg-[#001e47] rounded text-sm font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Przetwarzanie...
            </div>
          ) : (
            "Wyślij zlecenie"
          )}
        </button>
      </div>

      {/* Additional Information */}
      <div className="text-xs text-gray-500 text-center space-y-1">
        <p>
          Po potwierdzeniu otrzymasz email z potwierdzeniem zlecenia.
        </p>
        <p>
          Realizacja usługi: 7-14 dni roboczych.
        </p>
      </div>
    </div>
  );
}
