// components/formSteps/RemovalForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useGUS } from "@/hooks/useGUS";

const PORTAL_OPTIONS = [
  { name: "ALEO", price: 699 },
  { name: "GoWork", price: 699 },
  { name: "Panorama Firm", price: 699 },
  { name: "Biznes Finder", price: 699 },
  { name: "PKT.pl", price: 699 },
  { name: "Podobne Firmy", price: 699 },
  { name: "Inne", price: 699 }
];

interface GUSCompanyData {
  name: string;
  street: string;
  city: string;
  zip: string;
  nip: string;
  regon: string;
  krs?: string;
}

interface Removal {
  companyName: string;
  nip: string;
  portal: string;
  customPortal?: string;
}

interface Props {
  removals: Removal[];
  expandedIndex: number;
  onChange: (index: number, field: keyof Removal, value: string | string[]) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onExpand: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
  onGUSDataReceived?: (gusData: GUSCompanyData) => void;
  onPortalMultiselect?: (portalName: string, isChecked: boolean) => void;
}

export default function RemovalForm({
  removals,
  expandedIndex,
  onChange,
 
  onExpand,
  onSubmit,
  onGUSDataReceived,
  onPortalMultiselect,
}: Props) {
  const { data: gusData, loading: gusLoading, error: gusError, searchByNIP, reset: resetGUS } = useGUS();  // No longer need these as we only have a single NIP input
  // const [searchingIndex, setSearchingIndex] = useState<number | null>(null);
  // const [gusDataForIndex, setGusDataForIndex] = useState<{[key: number]: GUSCompanyData}>({});
  const [nipInput, setNipInput] = useState<string>("");
  const [validatedNIP, setValidatedNIP] = useState<boolean>(false);
  const [isCompanyType, setIsCompanyType] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    onSubmit(e);
    // Scroll to top after form submission
    setTimeout(() => {
      scrollToTop();
    }, 100);
  };
  const handleNIPSearch = async (nip: string) => {
    if (nip.length >= 10 && !gusLoading) {
      console.log('Starting NIP search for NIP:', nip);
      resetGUS(); // Reset previous data
      await searchByNIP(nip);
    }
  };
  // Update gusDataForIndex when gusData changes
  useEffect(() => {
    if (gusData && !validatedNIP) {
      console.log('GUS data received:', gusData);
      // Check if it's a company
      const companyStatus = gusData.krs ? true : (gusData.name && gusData.name.toLowerCase().includes('spółka'));
      setIsCompanyType(!!companyStatus);
      
      // Set validated NIP to true
      setValidatedNIP(true);
      
      // Automatically fill NIP for all selections
      if (removals.length > 0) {
        removals.forEach((removal, index) => {
          onChange(index, "nip", gusData.nip);
          onChange(index, "companyName", gusData.name);
        });
      }
      
      // Przekaż dane GUS do komponentu rodzica
      if (onGUSDataReceived) {
        console.log('Calling onGUSDataReceived with data:', gusData);
        onGUSDataReceived(gusData);
      }
    }
  }, [gusData, onChange, onGUSDataReceived, removals, validatedNIP]);

  // Reset validated flag when there's an error
  useEffect(() => {
    if (gusError) {
      setValidatedNIP(false);
      setIsCompanyType(false);
    }
  }, [gusError]);
  const handleNIPChange = (value: string) => {
    setNipInput(value);
    
    // Only reset validation when NIP changes manually
    if (validatedNIP) {
      setValidatedNIP(false);
      setIsCompanyType(false);
    }
  };

  const handlePortalChange = (portalName: string, isChecked: boolean) => {
    if (onPortalMultiselect) {
      onPortalMultiselect(portalName, isChecked);
    }
  };

  const getSelectedPortalPrice = (portal: string) => {
    const portalOption = PORTAL_OPTIONS.find(p => p.name === portal);
    return portalOption?.price || 0;
  };

  const getTotalPriceForProfile = (removal: Removal) => {
    return removal.portal ? getSelectedPortalPrice(removal.portal) : 0;
  };
  const shouldShowPrice = removals.some((r) => r.portal);

  const calculateTotalPrice = () => {
    return removals.reduce((total, removal) => {
      return total + getTotalPriceForProfile(removal);
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Usuwanie danych firmy z portali internetowych
      </h2>
      
      {/* NIP Input Section - Show this first */}
      <div className="space-y-3 mb-6 p-4 border border-gray-300 rounded-xl">
        <h4 className="font-medium text-gray-800">Podaj NIP firmy do weryfikacji:</h4>
        <div className="relative">          <input
            type="text"
            required
            placeholder="NIP firmy (10 cyfr)"
            value={nipInput}
            onChange={(e) => handleNIPChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                // Prevent form submission on Enter key but don't trigger search
              }
            }}
            className="w-full border border-gray-300 rounded px-4 py-2 pr-24"
          />          <button
            type="button"
            onClick={() => {
              const nip = nipInput.replace(/[^0-9]/g, '');
              if (nip.length >= 10) {
                handleNIPSearch(nip);
              }
            }}
            disabled={nipInput.replace(/[^0-9]/g, '').length < 10 || gusLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#002a5c] text-white px-3 py-1 rounded text-xs hover:bg-[#001e47] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {gusLoading ? (
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
            ) : (
              'Wyszukaj'
            )}
          </button>
          {validatedNIP && (
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
              <span className="text-[#5BA155] text-sm">✓</span>
            </div>
          )}
        </div>        <p className="text-xs text-gray-500">
          Podaj NIP firmy (10 cyfr) - kliknij przycisk &quot;Wyszukaj&quot;, aby pobrać dane z rejestru GUS
        </p>
        
        {gusError && (
          <p className="text-red-500 text-xs mt-1">{gusError}</p>
        )}

        {validatedNIP && gusData && (
          <div className={`border rounded p-3 mt-2 ${
            isCompanyType
              ? 'bg-orange-50 border-orange-200' 
              : ' border-[#5BA155] border-opacity-20'
          }`}>            <p className={`text-sm font-medium ${
              isCompanyType
                ? 'text-orange-700' 
                : 'text-[#5BA155]'
            }`}>
              {isCompanyType ? 'ℹ️' : '✓'} Dane pobrane z rejestru:
            </p>
            <p className={`text-xs mt-1 ${
              isCompanyType
                ? 'text-orange-600' 
                : 'text-[#5BA155]'
            }`}>
              <strong>Nazwa:</strong> {gusData.name}<br/>
              {gusData.street && <><strong>Adres:</strong> {gusData.street}, {gusData.zip} {gusData.city}<br/></>}
              {gusData.regon && <><strong>REGON:</strong> {gusData.regon}<br/></>}
              {gusData.krs && <><strong>KRS:</strong> {gusData.krs}</>}
            </p>
            {isCompanyType && (
              <div className="mt-2 p-2 bg-yellow-50 border border-yellow-300 rounded">
                <p className="text-xs text-yellow-800 font-medium">
                  💬 Wymagana konsultacja
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Dla tego typu podmiotów oferujemy indywidualną wycenę i doradztwo.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Only show portal selection if NIP is validated and it's not a company */}
      {validatedNIP && !isCompanyType && (
        <>
          <h4 className="font-medium text-gray-800">Wybierz portale do usunięcia:</h4>
          <p className="text-center">Wybierz portale z których chcesz usunąć dane firmy. Każdy zaznaczony portal automatycznie dodaje go do usunięcia.</p>
          
          {/* Multiselect Portal Selector */}
          <div className="space-y-3 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTAL_OPTIONS.map((portal) => {
                const isSelected = removals.some(r => r.portal === portal.name);
                const selectedRemoval = removals.find(r => r.portal === portal.name);
                const hasCompanyData = selectedRemoval && (selectedRemoval.companyName || selectedRemoval.nip);
                
                return (
                  <label key={portal.name} className={`flex items-center justify-between p-3 border rounded ${
                    isSelected ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50 cursor-pointer'
                  }`}>
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handlePortalChange(portal.name, e.target.checked)}
                        className="rounded border-gray-300 flex-shrink-0"
                      />
                      <span className="text-sm font-medium truncate">
                        {portal.name}
                      </span>
                      {hasCompanyData && (
                        <span className="text-xs px-2 py-0.5 bg-[#5BA155] bg-opacity-10 text-[#5BA155] rounded-full flex-shrink-0">OK</span>
                      )}
                    </div>
                    <span className="font-semibold text-sm ml-2 flex-shrink-0" style={{ color: '#5EA154' }}>
                      {portal.price} zł
                    </span>
                  </label>
                );
              })}
            </div>
            <p className="text-xs text-gray-500">
              Każdy zaznaczony portal utworzy osobny profil do skonfigurowania poniżej.
            </p>
          </div>
          
          {/* Profile Configuration */}
          {removals.filter(r => r.portal).map((removal) => {
            const actualIndex = removals.indexOf(removal);
            return (
              <div key={actualIndex} className="p-3 border-gray-300 rounded-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div className="text-sm text-gray-700 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="font-medium">
                        Portal: {removal.portal === "Inne" && removal.customPortal ? removal.customPortal : removal.portal}
                      </span>
                      {removal.portal && (
                        <span className="font-semibold text-sm px-2 py-1 rounded" style={{ color: '#5EA154', backgroundColor: '#f0f9f0' }}>
                          {getTotalPriceForProfile(removal)} zł
                        </span>
                      )}
                    </div>
                    {removal.companyName && (
                      <p className="text-gray-600 text-sm mt-1 truncate">
                        {removal.companyName}
                      </p>
                    )}
                    {expandedIndex !== actualIndex && removal.nip && (
                      <p className="text-gray-500 text-sm truncate">NIP: {removal.nip}</p>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <button
                      type="button"
                      className="text-sm text-white bg-[#002a5c] hover:bg-[#001e47] px-3 py-1 rounded flex items-center"
                      onClick={() => onExpand(actualIndex)}
                    >
                      {expandedIndex === actualIndex ? "Zwiń" : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {expandedIndex === actualIndex && (
                  <>
                    {removal.portal === "Inne" && (
                      <input
                        type="text"
                        placeholder="Wpisz nazwę portalu"
                        value={removal.customPortal || ""}
                        onChange={(e) => onChange(actualIndex, "customPortal", e.target.value)}
                        className="w-full border border-gray-300 rounded px-4 py-2 mt-2"
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}

          {shouldShowPrice && (
            <p className="text-sm text-center text-gray-700">
              cena: <strong className="text-lg" style={{ color: '#5EA154' }}>{calculateTotalPrice()} zł brutto (z VAT 23%)</strong>
            </p>
          )}
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={removals.filter(r => r.portal).length === 0}
              className={`w-46 px-3 md:px-5 py-2.5 rounded text-sm ${
                removals.filter(r => r.portal).length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#002a5c] text-white hover:bg-[#001e47]'
              }`}
            >
              Przejdź dalej
            </button>
          </div>
        </>
      )}
      
      {/* For company type - show consultation message */}
      {validatedNIP && isCompanyType && (
        <div className="flex justify-center">
          <button
            type="button"
            className="w-46 px-3 md:px-5 py-2.5 rounded text-sm bg-orange-200 text-orange-700 cursor-not-allowed border border-orange-300"
          >
            Wymagana konsultacja
          </button>
        </div>
      )}
    </form>
  );
}