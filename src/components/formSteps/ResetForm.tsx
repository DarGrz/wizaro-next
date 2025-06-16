// components/formSteps/RemovalForm.tsx
"use client";

import React from "react";

interface Removal {
  companyName: string;
  nip: string;
  url: string;
}

interface Props {
  removals: Removal[];
  expandedIndex: number;
  totalPrice: number;
  onChange: (index: number, field: keyof Removal, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onExpand: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function RemovalForm({
  removals,
  expandedIndex,
  totalPrice,
  onChange,
  onAdd,
  onRemove,
  onExpand,
  onSubmit,
}: Props) {
  const shouldShowPrice = removals.some((r) =>
    /(google|goo|gow|aleo|panorama|map|pkt|finder|biznes)/i.test(r.url)
  );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
       Resetowanie Wizytówki Google
      </h2>
      <p className="text-center">Usuń i ponownie dodaj firmę do Map Google z czystym kontem opinii</p>
      {removals.map((removal, index) => (
        <div key={index} className="p-2 border-gray-300 rounded-xl space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              <p className="font-medium">
                Profil #{index + 1} {removal.companyName && `– ${removal.companyName}`}
              </p>
              {expandedIndex !== index && removal.nip && (
                <p className="text-gray-500 truncate text-sm">NIP: {removal.nip}</p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {removals.length > 1 && (
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
                value={removal.companyName}
                onChange={(e) => onChange(index, "companyName", e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                placeholder="NIP firmy"
                
                value={removal.nip}
                onChange={(e) => onChange(index, "nip", e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <input
                type="text"
                required
                placeholder="Link do profilu Google (np. https://maps.google.com/...)"
                value={removal.url}
                onChange={(e) => onChange(index, "url", e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              <p className="text-sm text-center text-gray-700">
                Dodaj nazwę firmy oraz NIP w celu dokładnej weryfikacji. W polu powyżej wpisz link do profilu Google, nie nazwę firmy.
              </p>
            </>
          )}
        </div>
      ))}
      
      {shouldShowPrice && (
        <p className="text-sm text-center text-gray-700">
          Cena: <strong className="text-lg">{totalPrice} zł brutto (z VAT 23%)</strong>
        </p>
      )}
      <div className="flex justify-between gap-3">
        <button
          type="button"
          onClick={onAdd}
          className="px-5 py-2.5 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Dodaj profil
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
