"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GuaranteeSectionModern from "./GuaranteeSectionModern";

interface GUSCompanyData {
  name: string;
  street: string;
  city: string;
  zip: string;
  nip: string;
  regon: string;
  krs?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function CompanySearchGus() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<GUSCompanyData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect for placeholder
  useEffect(() => {
    const placeholderTexts = [
      "Wpisz numer NIP...",
      "Np. 5213012345",
      "Wyszukaj w bazie GUS...",
      "Podaj 10-cyfrowy NIP..."
    ];

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeEffect = () => {
      const currentText = placeholderTexts[currentTextIndex];
      
      if (!isDeleting) {
        // Typing
        setAnimatedPlaceholder(currentText.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
          // Pause before starting to delete
          timeoutId = setTimeout(() => {
            isDeleting = true;
            typeEffect();
          }, 2000);
          return;
        }
        
        timeoutId = setTimeout(typeEffect, 100);
      } else {
        // Deleting
        setAnimatedPlaceholder(currentText.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % placeholderTexts.length;
          timeoutId = setTimeout(typeEffect, 500);
          return;
        }
        
        timeoutId = setTimeout(typeEffect, 50);
      }
    };

    // Only show animation when input is empty and not focused
    if (!searchQuery && !document.activeElement?.isSameNode(inputRef.current)) {
      typeEffect();
    } else {
      setAnimatedPlaceholder("Wpisz numer NIP...");
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchQuery]);

  // Funkcja walidacji NIP
  const validateNIP = (nip: string): boolean => {
    const cleanNip = nip.replace(/[^0-9]/g, '');
    
    if (cleanNip.length !== 10) {
      return false;
    }

    // Walidacja sumy kontrolnej NIP
    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
    let sum = 0;
    
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanNip[i]) * weights[i];
    }
    
    const checkDigit = sum % 11;
    const lastDigit = parseInt(cleanNip[9]);
    
    return checkDigit < 10 && checkDigit === lastDigit;
  };

  // Funkcja obsługująca zmianę w polu wyszukiwania
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Pozwól tylko na cyfry i myślniki/spacje (ale usuń je przy walidacji)
    const filteredValue = value.replace(/[^0-9\-\s]/g, '');
    setSearchQuery(filteredValue);
    setErrorMessage(null);
    
    // Automatyczne wyszukiwanie po wpisaniu 10 cyfr
    const cleanValue = filteredValue.replace(/[^0-9]/g, '');
    if (cleanValue.length === 10) {
      // Małe opóźnienie, żeby użytkownik widział co wpisuje
      setTimeout(() => {
        searchCompanyByNIP(filteredValue);
      }, 300);
    }
  };

  // Funkcja obsługująca focus na polu wyszukiwania
  const handleSearchFocus = () => {
    setErrorMessage(null);
  };

  // Funkcja wyszukiwania w bazie GUS
  const searchCompanyByNIP = async (nip: string) => {
    if (!nip) return;
    
    const cleanNip = nip.replace(/[^0-9]/g, '');
    
    if (!validateNIP(cleanNip)) {
      setErrorMessage("Nieprawidłowy numer NIP. NIP musi mieć 10 cyfr i poprawną sumę kontrolną.");
      return;
    }
    
    setIsSearching(true);
    setErrorMessage(null);
    setSelectedCompany(null);
    
    try {
      const response = await fetch('/api/gus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nip: cleanNip }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success && data.data) {
        setSelectedCompany(data.data);
      } else {
        setErrorMessage(data.error || "Nie znaleziono firmy o podanym numerze NIP w bazie GUS.");
      }
    } catch (error) {
      console.error("Error searching for company by NIP:", error);
      setErrorMessage("Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.");
    } finally {
      setIsSearching(false);
    }
  };

  // Funkcja do obsługi klawisza Enter
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery) {
      searchCompanyByNIP(searchQuery);
    }
  };

  // Funkcja do przekierowania na formularz profil bazy z pre-wypełnionymi danymi
  const handleProceedToForm = () => {
    if (selectedCompany) {
      // Zapisanie danych wybranej firmy w formacie oczekiwanym przez formularz profil bazy
      const companyData = {
        name: selectedCompany.name,
        nip: selectedCompany.nip,
        regon: selectedCompany.regon,
        street: selectedCompany.street,
        city: selectedCompany.city,
        zip: selectedCompany.zip,
        krs: selectedCompany.krs
      };

      // Zapisanie w localStorage z kluczem używanym przez formularz profil bazy
      localStorage.setItem('selectedGUSCompany', JSON.stringify(companyData));
      localStorage.setItem('preSelectedGUSCompany', 'true'); // flaga że firma jest już wybrana
    } else if (searchQuery) {
      // Jeśli nie ma wybranej firmy, ale jest wpisany NIP, przekaż sam NIP
      const cleanNip = searchQuery.replace(/[^0-9]/g, '');
      if (cleanNip.length === 10) {
        const nipData = {
          name: "",
          nip: cleanNip,
          regon: "",
          street: "",
          city: "",
          zip: "",
          krs: ""
        };
        
        localStorage.setItem('selectedGUSCompany', JSON.stringify(nipData));
        localStorage.setItem('preSelectedGUSCompany', 'true');
      }
    }

    // Przekierowanie na formularz profil bazy
    window.location.href = '/formularz-profil-bazy';
  };

  const clearSelection = () => {
    setSelectedCompany(null);
    setSearchQuery("");
    setErrorMessage(null);
    inputRef.current?.focus();
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-4 py-4 sm:py-16">
        <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-3xl md:text-6xl font-bold text-[#002a5c] mb-4 sm:mb-6 leading-tight px-4 mt-15">
            Potrzebujesz pomocy?<br />
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Wyszukaj swoją firmę po numerze NIP i skorzystaj z naszych profesjonalnych usług ochrony reputacji.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto relative">
          {/* Search Section - hidden when company is selected */}
          {!selectedCompany && (
            <div className="sm:bg-white/80 sm:backdrop-blur-sm rounded-none sm:rounded-3xl sm:shadow-2xl p-0 sm:p-8 border-0 sm:border sm:border-white/20 relative overflow-visible">
              {/* Subtle gradient background overlay - only on desktop */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/30 rounded-none sm:rounded-3xl hidden sm:block"></div>
              
              <div className="relative z-10 px-0 sm:px-0" ref={searchRef}>
                {/* Search field and button container */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="relative group flex-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl sm:rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300 hidden sm:block"></div>
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder={animatedPlaceholder}
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                      onFocus={handleSearchFocus}
                      onKeyPress={handleKeyPress}
                      maxLength={12} // Allow for formatting characters
                      className="relative w-full p-3 sm:p-5 text-base sm:text-lg border-2 border-slate-200 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white sm:bg-white/90 sm:backdrop-blur-sm focus:bg-white focus:shadow-xl focus:scale-[1.02] placeholder:text-slate-400 shadow-lg sm:shadow-none"
                      disabled={isSearching}
                    />
                    {/* Loading indicator inside input */}
                    {isSearching && (
                      <div className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-6 w-6 sm:h-7 sm:w-7 border-2 border-blue-200"></div>
                          <div className="animate-spin rounded-full h-6 w-6 sm:h-7 sm:w-7 border-t-2 border-blue-600 absolute top-0 left-0"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Search button */}
                  <button
                    onClick={() => searchQuery && searchCompanyByNIP(searchQuery)}
                    disabled={isSearching || !searchQuery}
                    className="group relative w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none overflow-hidden"
                  >
                    {/* Shimmer animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    <div className="flex items-center justify-center relative z-10">
                      {/* Mobile version - text with arrow */}
                      <span className="sm:hidden flex items-center">
                        {searchQuery && searchQuery.replace(/[^0-9]/g, '').length === 10 ? 'Auto-wyszukiwanie...' : 'Wyszukaj'}
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      {/* Desktop version - search icon only */}
                      <svg className="hidden sm:block w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Info about GUS database */}
              {/* <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 border border-blue-200 rounded-lg sm:rounded-xl mx-4 sm:mx-0">
                <div className="flex items-center text-blue-800">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs sm:text-sm font-medium">
                    Wyszukiwanie odbywa się w oficjalnej bazie danych Głównego Urzędu Statystycznego (GUS)
                  </span>
                </div>
              </div> */}

              {/* Error Message */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 sm:mt-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl mx-4 sm:mx-0"
                >
                  <p className="text-red-700 text-sm sm:text-base">{errorMessage}</p>
                </motion.div>
              )}

              {/* Proceed Button - show when valid NIP is entered but no company found */}
              {!selectedCompany && searchQuery && searchQuery.replace(/[^0-9]/g, '').length === 10 && validateNIP(searchQuery.replace(/[^0-9]/g, '')) && !isSearching && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 sm:mt-4 mx-4 sm:mx-0"
                >
                  <button
                    onClick={handleProceedToForm}
                    className="w-full group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:from-green-500 hover:to-emerald-400 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                   
                    <span className="relative">Wyszukiwanie</span>
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Selected Company Details */}
        {selectedCompany && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mt-4 sm:mt-8"
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-100 mx-4 sm:mx-0">
              <div className="p-4 sm:p-8">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-2xl font-bold text-[#002a5c] mb-2 pr-4">
                      {selectedCompany.name}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                      {selectedCompany.street}, {selectedCompany.zip} {selectedCompany.city}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
                      <div className="bg-blue-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                        <span className="text-blue-700 font-medium text-xs sm:text-sm">
                          📊 Baza GUS
                        </span>
                      </div>
                      
                      <div className="bg-green-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                        <span className="text-green-700 font-medium text-xs sm:text-sm">
                          ✅ Dane oficjalne
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-gray-700 text-sm sm:text-base">NIP: {selectedCompany.nip}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-gray-700 text-sm sm:text-base">REGON: {selectedCompany.regon}</span>
                      </div>
                      
                      {selectedCompany.krs && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                          </svg>
                          <span className="text-gray-700 text-sm sm:text-base">KRS: {selectedCompany.krs}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <button
                        onClick={handleProceedToForm}
                        className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <span className="relative">Przejdź do formularza</span>
                      </button>
                      
                      <button
                        onClick={clearSelection}
                        className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white/90 backdrop-blur-sm border-2 border-slate-200 text-slate-700 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:bg-white hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 hover:text-slate-800"
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 group-hover:rotate-180 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Szukaj ponownie
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Company Protection Section */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 max-w-4xl sm:max-w-6xl mx-auto"
        >
          <div className="bg-gradient-to-br from-slate-900 via-[#002a5c] to-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-16 text-center border-b border-slate-600/30">
              <div className="inline-block p-2 sm:p-3 bg-white/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4">
                Chroń Swoją Firmę
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
                Dbaj o reputację swojej firmy w internecie. Odzyskaj pozytywny wizerunek online.
              </p>
            </div>

            {/* Features Grid */}
            <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Feature 1 */}
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="inline-block p-2 sm:p-3 bg-blue-500/20 rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Kontrola Danych</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Przejmij kontrolę nad swoimi danymi firmowymi.</p>
                </div>

                {/* Feature 2 */}
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="inline-block p-2 sm:p-3 bg-green-500/20 rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:bg-green-500/30 transition-colors duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Nowy Początek</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Świeża obecność online dla Twojego biznesu.</p>
                </div>

                {/* Feature 3 */}
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="inline-block p-2 sm:p-3 bg-purple-500/20 rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Bezpieczne Rozwiązania</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Profesjonalne i legalne zarządzanie danymi.</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="px-4 sm:px-8 md:px-16 text-center mt-8 sm:mt-12 md:mt-16 pb-8 sm:pb-12 md:pb-16">
                <div className="inline-flex flex-col gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none sm:flex-row sm:w-auto">
                  <a href="tel:+48792861513" className="group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="relative">Skontaktuj się z nami</span>
                  </a>
                  <Link
                    href="/"
                    className="group inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white/20 hover:border-white/50"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Dowiedz się więcej
                  </Link>
                </div>
                <p className="text-slate-400 text-xs sm:text-sm mt-4 sm:mt-6 max-w-2xl mx-auto">
                  Bezpłatna konsultacja • Pełna dyskrecja • Gwarancja rezultatów
                </p>
              </div>
          </div>
        </motion.div>
      </div>

      {/* Guarantee Section */}
      <GuaranteeSectionModern />
    </motion.div>
  );
}