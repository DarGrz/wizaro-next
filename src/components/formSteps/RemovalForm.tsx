// components/formSteps/RemovalForm.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";

interface Removal {
  companyName: string;
  nip: string;
  url: string[];  // Tablica z jednym elementem dla single-select
  mapsLink?: string;
}

interface Props {
  removals: Removal[];
  expandedIndex: number;
  totalPrice: number;
  onChange: (index: number, field: keyof Removal, value: string | string[]) => void;  // Obsługuje zarówno string jak i string[]
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
  const [openPortalSelector, setOpenPortalSelector] = useState<number | null>(null);
  const portalSelectorRef = useRef<HTMLDivElement>(null);

  // Zamykanie menu portali po kliknięciu poza nim
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (portalSelectorRef.current && !portalSelectorRef.current.contains(event.target as Node)) {
        setOpenPortalSelector(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const shouldShowPrice = removals.some((r) =>
    r.url.length > 0 && /(google|goo|gow|aleo|panorama|map|pkt|finder|biznes|g.co)/i.test(r.url[0])
  );

  const portalOptions = [
    "Mapy Google",
    "Gowork",
    "Aleo",
    "Panorama Firm",
    "PKT.pl"
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Skąd chcesz usunąć dane firmy?
      </h2>
      <p className="text-center">Usuń dane firmy z Map Google, Gowork, Aleo, Panorama firm lub PKT.pl</p>
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
                placeholder={removal.url.length > 0 && removal.url[0] !== "Mapy Google" ? "NIP firmy *" : "NIP firmy"}
                required={removal.url.length > 0 && removal.url[0] !== "Mapy Google"}
                value={removal.nip}
                onChange={(e) => onChange(index, "nip", e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {removal.url.length > 0 && removal.url[0] !== "Mapy Google" && (
                <p className="text-xs text-gray-500 mt-1">* NIP jest wymagany dla tego portalu</p>
              )}
              
              <div className="w-full">
                <div 
                  className={`w-full border border-gray-300 ${openPortalSelector === index ? 'rounded-t' : 'rounded'} px-4 py-2 bg-white flex justify-between items-center cursor-pointer hover:bg-gray-50`}
                  onClick={() => setOpenPortalSelector(openPortalSelector === index ? null : index)}
                >
                  <div className="min-h-[24px]">
                    {removal.url.length === 0 ? (
                      <span className="text-gray-400">Wybierz portal</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-[#e6f0fa] text-[#002a5c] rounded px-2 py-0.5 text-sm">
                          {removal.url[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-gray-400 ml-2">
                    {openPortalSelector === index ? "▲" : "▼"}
                  </div>
                </div>
                
                {openPortalSelector === index && (
                  <div 
                    ref={portalSelectorRef}
                    className="w-full border border-gray-300 border-t-0 rounded-b bg-white"
                  >
                    <div className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm text-gray-500">Wybierz portal:</div>
                        {removal.url.length > 0 && (
                          <button
                            type="button"
                            onClick={() => onChange(index, "url", [])}
                            className="text-xs text-[#002a5c] hover:underline"
                          >
                            Wyczyść wybór
                          </button>
                        )}
                      </div>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {portalOptions.map((option) => (
                          <div key={option} className="flex items-center">
                            <input
                              type="radio"
                              id={`portal-${index}-${option}`}
                              name={`portal-selection-${index}`}
                              checked={removal.url[0] === option}
                              onChange={() => {
                                onChange(index, "url", [option]);
                                setOpenPortalSelector(null); // Zamyka dropdown po wyborze
                              }}
                              className="mr-2 accent-[#002a5c]"
                            />
                            <label htmlFor={`portal-${index}-${option}`} className="text-gray-700">
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                      {removal.url.length === 0 && (
                        <p className="text-red-500 text-sm mt-1">Wybierz jeden portal</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {removal.url[0] === "Mapy Google" && (
                <input
                  type="text"
                  placeholder="Link do profilu w Mapach Google (opcjonalnie)"
                  value={removal.mapsLink || ""}
                  onChange={(e) => onChange(index, "mapsLink", e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              )}
              
              <p className="text-sm text-center text-gray-700">
                Dodaj nazwę firmy oraz NIP w celu dokładnej weryfikacji.
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
          className="w-46 px-3 md:px-5 py-2.5 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Dodaj kolejny profil
        </button>
        <button
          type="submit"
          disabled={removals.some(r => r.url.length === 0)}
          className={`w-46 px-3 md:px-5 py-2.5 ${
            removals.some(r => r.url.length === 0) 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-[#002a5c] text-white hover:bg-[#001e47]"
          } rounded text-sm`}
        >
          Przejdź dalej
        </button>
      </div>
    </form>
  );
}
