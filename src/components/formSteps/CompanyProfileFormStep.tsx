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

interface CompanyFormStepProps {
  company: CompanyData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  reviewCount: number;
  totalPrice: number;
}

export default function CompanyFormStep({
  company,
  onChange,
  onSubmit,
  onBack,
  reviewCount,
  totalPrice,
}: CompanyFormStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Dane firmy
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Nazwa firmy"
        value={company.name}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="text"
        name="first_name"
        placeholder="Imię osoby kontaktowej"
        value={company.first_name}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="text"
        name="last_name"
        placeholder="Nazwisko osoby kontaktowej"
        value={company.last_name}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Adres e-mail"
        value={company.email}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Numer telefonu"
        value={company.phone}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="text"
        name="nip"
        placeholder="NIP"
        value={company.nip}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="text"
        name="street"
        placeholder="Ulica i numer"
        value={company.street}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="text"
        name="zip"
        placeholder="Kod pocztowy"
        value={company.zip}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      <input
        type="text"
        name="city"
        placeholder="Miasto"
        value={company.city}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        required
      />

      {/* <input
        type="url"
        name="url"
        placeholder="Link do profilu (np. Google Maps)"
        value={company.url}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-4 py-2"
        
      /> */}

      {/* <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="different_payer"
          checked={company.different_payer}
          onChange={(e) =>
            onChange({
              ...e,
              target: {
                ...e.target,
                name: "different_payer",
                value: String(e.target.checked),
              },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
        Dane płatnika różnią się od danych firmy
      </label> */}

      <p className="text-sm text-center text-gray-700 mt-6">
        Do usunięcia: <strong>{reviewCount}</strong>
        <br />
        Cena łączna: <strong className="text-lg">{totalPrice} zł brutto (z VAT 23%)</strong>
      </p>

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

