"use client";

import React from "react";

interface GoogleReset {
  companyName: string;
  nip: string;
  googleUrl: string;
}

interface Props {
  resets: GoogleReset[];
  expandedIndex: number;
  onChange: (index: number, field: keyof GoogleReset, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onExpand: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function GoogleResetForm({
  resets,
  expandedIndex,
  onChange,
  onAdd,
  onRemove,
  onExpand,
  onSubmit,
}: Props) {
  const fixedPrice = 2199;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Resetowanie wizytówki Google
      </h2>
      <p className="text-center">
        Całkowite resetowanie wizytówki Google Business Profile (dawniej Google Moja Firma)
      </p>
      
      {resets.map((reset, index) => (
        <div key={index} className="p-2 border-gray-300 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              <p className="font-medium">
                Wizytówka #{index + 1} {reset.companyName && `– ${reset.companyName}`}
              </p>
              {expandedIndex !== index && reset.nip && (
                <p className="text-gray-500 truncate text-sm">NIP: {reset.nip}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {resets.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="text-[#002a5c] text-sm hover:underline mr-4"
                >
                  Usuń
                </button>
              )}
              <button
                type="button"
                className="text-sm text-white bg-[#002a5c] hover:bg-[#001e47] px-3 py-1 rounded"
                onClick={() => onExpand(index)}
              >
                {expandedIndex === index ? "Zwiń" : "Rozwiń"}
              </button>
            </div>
          </div>
          {expandedIndex === index && (
            <>
              <input
                type="text"
                placeholder="Nazwa firmy"
                required
                value={reset.companyName}
                onChange={(e) => onChange(index, "companyName", e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="NIP firmy"
                required
                value={reset.nip}
                onChange={(e) => onChange(index, "nip", e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                required
                placeholder="Link do wizytówki Google"
                value={reset.googleUrl}
                onChange={(e) => onChange(index, "googleUrl", e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <p className="text-sm text-center text-gray-700">
                Dodaj dokładne dane firmy w celu prawidłowej weryfikacji wizytówki.
              </p>
            </>
          )}
        </div>
      ))}
      
      <p className="text-sm text-center text-gray-700 mt-4">
        Cena: <strong className="text-lg">{fixedPrice} zł brutto (z VAT 23%)</strong>
      </p>
      
      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={onAdd}
          className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Dodaj wizytówkę
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-[#002a5c] text-white hover:bg-[#001e47] rounded text-sm ms-auto"
        >
          Przejdź dalej
        </button>
      </div>
    </form>
  );
}
