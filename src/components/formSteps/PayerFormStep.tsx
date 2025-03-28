
"use client";

import React from "react";

interface PayerData {
  name: string;
  company_name?: string;
  email: string;
  nip?: string;
  street: string;
  zip: string;
  city: string;
}

interface PayerFormStepProps {
  payer: PayerData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

export default function PayerFormStep({ payer, onChange, onSubmit, onBack }: PayerFormStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Dane płatnika
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Imię i nazwisko"
        value={payer.name}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="text"
        name="company_name"
        placeholder="Nazwa firmy (opcjonalnie)"
        value={payer.company_name}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
      />

      <input
        type="email"
        name="email"
        placeholder="Adres e-mail"
        value={payer.email}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="text"
        name="nip"
        placeholder="NIP (opcjonalnie)"
        value={payer.nip}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
      />

      <input
        type="text"
        name="street"
        placeholder="Ulica i numer"
        value={payer.street}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="text"
        name="zip"
        placeholder="Kod pocztowy"
        value={payer.zip}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="text"
        name="city"
        placeholder="Miasto"
        value={payer.city}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Wróć
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-[#002a5c] text-white hover:bg-[#001e47] rounded text-sm"
        >
          Przejdź dalej
        </button>
      </div>
    </form>
  );
}
