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
  const { data: gusData, loading: gusLoading, error: gusError, searchByNIP, reset: resetGUS } = useGUS();
  const [searchingIndex, setSearchingIndex] = useState<number | null>(null);
  const [gusDataForIndex, setGusDataForIndex] = useState<{[key: number]: GUSCompanyData}>({});

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

  const handleNIPSearch = async (index: number, nip: string) => {
    if (nip.length >= 10) {
      console.log('Starting NIP search for index:', index, 'NIP:', nip);
      setSearchingIndex(index);
      resetGUS(); // Reset previous data
      await searchByNIP(nip);
    }
  };

  // Update gusDataForIndex when gusData changes
  useEffect(() => {
    if (gusData && searchingIndex !== null) {
      console.log('GUS data received:', gusData);
      console.log('Updating index:', searchingIndex);
      
      setGusDataForIndex(prev => ({
        ...prev,
        [searchingIndex]: gusData
      }));
        // Auto-fill company name from GUS data
      console.log('Auto-filling company name:', gusData.name);
      onChange(searchingIndex, "companyName", gusData.name);
      
      // Przekaż dane GUS do komponentu rodzica (dla każdego profilu)
      if (onGUSDataReceived) {
        console.log('Calling onGUSDataReceived with data:', gusData);
        onGUSDataReceived(gusData);
      }
      
      // Reset searching index after successful data retrieval
      setSearchingIndex(null);
    }
  }, [gusData, searchingIndex, onChange, onGUSDataReceived]);

  // Reset searching index when there's an error
  useEffect(() => {
    if (gusError && searchingIndex !== null) {
      setSearchingIndex(null);
    }
  }, [gusError, searchingIndex]);
  const handleNIPChange = (index: number, value: string) => {
    onChange(index, "nip", value);
    
    // Reset GUS data for this index when NIP is changed
    if (gusDataForIndex[index]) {
      setGusDataForIndex(prev => {
        const newData = { ...prev };
        delete newData[index];
        return newData;
      });
    }  };  const handlePortalChange = (portalName: string, isChecked: boolean) => {
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
  };  const shouldShowPrice = removals.some((r) => r.portal);

  const calculateTotalPrice = () => {
    return removals.reduce((total, removal) => {
      return total + getTotalPriceForProfile(removal);
    }, 0);
  };
  // Sprawdź czy któraś firma ma KRS (spółka) lub w nazwie jest słowo "spółka" - wtedy usunięcie niemożliwe
  const hasCompanyWithKRS = () => {
    return Object.values(gusDataForIndex).some(gusData => {
      if (!gusData) return false;
      // Sprawdź czy ma KRS
      if (gusData.krs) return true;
      // Sprawdź czy w nazwie jest słowo "spółka" (wielkość liter nieważna)
      if (gusData.name && gusData.name.toLowerCase().includes('spółka')) return true;
      return false;
    });
  };

  // Sprawdź czy konkretna firma jest spółką (ma KRS lub w nazwie słowo "spółka")
  const isCompany = (gusData: GUSCompanyData) => {
    if (gusData.krs) return true;
    if (gusData.name && gusData.name.toLowerCase().includes('spółka')) return true;
    return false;
  };  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
        Skąd chcesz usunąć dane firmy?
      </h2>
      <p className="text-center">Wybierz portale z których chcesz usunąć dane firmy. Każdy zaznaczony portal automatycznie dodaje go do usunięcia.</p>
      
      {/* Multiselect Portal Selector */}
      <div className="space-y-3 mb-6">
        <h4 className="font-medium text-gray-800">Wybierz portale do usunięcia:</h4>        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex-shrink-0">OK</span>
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
      </div>      {/* Profile Configuration */}
      {removals.filter(r => r.portal).map((removal) => {
        const actualIndex = removals.indexOf(removal);
        return (          <div key={actualIndex} className="p-3 border-gray-300 rounded-xl space-y-3">
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
              <div className="flex items-center space-x-2 flex-shrink-0"><button
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
                <div className="space-y-2 mt-10">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="NIP firmy (10 cyfr)"
                      value={removal.nip}
                      onChange={(e) => handleNIPChange(actualIndex, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const nip = removal.nip.replace(/[^0-9]/g, '');
                          if (nip.length >= 10) {
                            handleNIPSearch(actualIndex, nip);
                          }
                        }
                      }}
                      onBlur={(e) => {
                        const nip = e.target.value.replace(/[^0-9]/g, '');
                        if (nip.length === 10) {
                          handleNIPSearch(actualIndex, nip);
                        }
                      }}
                      className="w-full border border-gray-300 rounded px-4 py-2 pr-24"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const nip = removal.nip.replace(/[^0-9]/g, '');
                        if (nip.length >= 10) {
                          handleNIPSearch(actualIndex, nip);
                        }
                      }}
                      disabled={removal.nip.replace(/[^0-9]/g, '').length < 10 || gusLoading}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#002a5c] text-white px-2 py-1 rounded text-xs hover:bg-[#001e47] disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {searchingIndex === actualIndex && gusLoading ? (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      ) : (
                        'Szukaj'
                      )}
                    </button>
                    {gusDataForIndex[actualIndex] && (
                      <div className="absolute right-16 top-1/2 transform -translate-y-1/2">
                        <span className="text-green-500 text-sm">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    Podaj NIP firmy (10 cyfr) - automatycznie pobierzemy dane z rejestru GUS
                  </p>
                </div>
                {gusError && searchingIndex === actualIndex && (
                  <p className="text-red-500 text-xs mt-1">{gusError}</p>
                )}

                {gusDataForIndex[actualIndex] && (
                  <div className={`border rounded p-3 mt-2 ${
                    isCompany(gusDataForIndex[actualIndex])
                      ? 'bg-orange-50 border-orange-200' 
                      : 'bg-green-50 border-green-200'
                  }`}>
                    <p className={`text-sm font-medium ${
                      isCompany(gusDataForIndex[actualIndex])
                        ? 'text-orange-700' 
                        : 'text-green-700'
                    }`}>
                      {isCompany(gusDataForIndex[actualIndex]) ? 'ℹ️' : '✓'} Dane pobrane z rejestru:
                    </p>
                    <p className={`text-xs mt-1 ${
                      isCompany(gusDataForIndex[actualIndex])
                        ? 'text-orange-600' 
                        : 'text-green-600'
                    }`}>
                      <strong>Nazwa:</strong> {gusDataForIndex[actualIndex].name}<br/>
                      {gusDataForIndex[actualIndex].street && <><strong>Adres:</strong> {gusDataForIndex[actualIndex].street}, {gusDataForIndex[actualIndex].zip} {gusDataForIndex[actualIndex].city}<br/></>}
                      {gusDataForIndex[actualIndex].regon && <><strong>REGON:</strong> {gusDataForIndex[actualIndex].regon}<br/></>}
                      {gusDataForIndex[actualIndex].krs && <><strong>KRS:</strong> {gusDataForIndex[actualIndex].krs}</>}
                    </p>
                    {isCompany(gusDataForIndex[actualIndex]) && (
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

                {removal.portal === "Inne" && (
                  <input
                    type="text"
                    placeholder="Wpisz nazwę portalu"
                    value={removal.customPortal || ""}
                    onChange={(e) => onChange(actualIndex, "customPortal", e.target.value)}
                    disabled={gusDataForIndex[actualIndex] && isCompany(gusDataForIndex[actualIndex])}
                    className="w-full border border-gray-300 rounded px-4 py-2 mt-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
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
          disabled={hasCompanyWithKRS() || removals.filter(r => r.portal).length === 0}
          className={`w-46 px-3 md:px-5 py-2.5 rounded text-sm ${
            hasCompanyWithKRS() 
              ? 'bg-orange-200 text-orange-700 cursor-not-allowed border border-orange-300' 
              : removals.filter(r => r.portal).length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#002a5c] text-white hover:bg-[#001e47]'
          }`}
        >
          {hasCompanyWithKRS() ? 'Wymagana konsultacja' : 'Przejdź dalej'}
        </button>
      </div>
    </form>
  );
}