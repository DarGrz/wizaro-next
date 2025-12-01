"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GuaranteeSectionModernPayment from "./GuaranteeSectionModernPayment";

interface GmbLocation {
  id: string;
  name: string;
  address: string;
  placeId: string;
}

interface PlaceDetails {
  id: string;
  name: string;
  address: string;
  phoneNumber?: string;
  website?: string;
  googleMapsUrl: string;
  photos: string[];
  businessStatus?: string;
  types?: string[];
  rating?: number;
  user_ratings_total?: number;
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

export default function CompanySearchOchronaWizerunku() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<GmbLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect for placeholder
  useEffect(() => {
    const placeholderTexts = [
      "Wpisz nazwę firmy...",
      "Np. Restauracja Roma",
      "Wyszukaj w Google...",
      "Podaj nazwę lub adres..."
    ];

    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeEffect = () => {
      const currentText = placeholderTexts[currentTextIndex];
      
      if (!isDeleting) {
        setAnimatedPlaceholder(currentText.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            typeEffect();
          }, 2000);
          return;
        }
        
        timeoutId = setTimeout(typeEffect, 100);
      } else {
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

    if (!searchQuery && !document.activeElement?.isSameNode(inputRef.current)) {
      typeEffect();
    } else {
      setAnimatedPlaceholder("Wpisz nazwę firmy...");
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchQuery]);

  // Search for GMB locations
  const searchLocations = async (query: string) => {
    if (!query || query.length < 2) return;
    
    setIsSearching(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch(`/api/gmb-search?query=${encodeURIComponent(query)}&_=${Date.now()}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      
      if (!response.ok) {
        const status = response.status;
        
        if (status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const waitSeconds = retryAfter ? parseInt(retryAfter, 10) : 60;
          throw new Error(`Przekroczono limit zapytań. Spróbuj ponownie za ${waitSeconds} sekund.`);
        }
        
        throw new Error(`Błąd serwera: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.results && Array.isArray(data.results)) {
        setLocations(data.results);
        setShowResults(data.results.length > 0);
        
        if (data.results.length === 0) {
          setErrorMessage("Nie znaleziono żadnych firm Google dla wpisanej frazy.");
        }
      } else if (data.error) {
        setErrorMessage(data.error);
        setLocations([]);
        setShowResults(false);
      } else {
        setLocations([]);
        setShowResults(false);
        setErrorMessage("Nie znaleziono żadnych firm Google dla wpisanej frazy.");
      }
    } catch (error) {
      console.error("Error searching for locations:", error);
      setLocations([]);
      setShowResults(false);
      setErrorMessage(error instanceof Error ? error.message : "Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.");
    } finally {
      setIsSearching(false);
    }
  };

  // Fetch place details
  const fetchPlaceDetails = async (placeId: string) => {
    setIsLoadingDetails(true);
    
    try {
      const response = await fetch(`/api/places-details?placeId=${placeId}`);
      
      if (!response.ok) {
        const status = response.status;
        
        if (status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const waitSeconds = retryAfter ? parseInt(retryAfter, 10) : 60;
          throw new Error(`Przekroczono limit zapytań. Spróbuj ponownie za ${waitSeconds} sekund.`);
        }
        
        throw new Error(`Błąd serwera: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.details) {
        setSelectedPlace(data.details);
        
        // Save to database
        try {
          await fetch('/api/searched-gmb', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: data.details.name,
              address: data.details.address,
              placeId: data.details.id,
              phoneNumber: data.details.phoneNumber,
              website: data.details.website,
              googleMapsUrl: data.details.googleMapsUrl,
              businessStatus: data.details.businessStatus,
              rating: data.details.rating,
              types: data.details.types,
            }),
          });
        } catch (error) {
          console.error('Error saving GMB data to database:', error);
        }
      } else if (data.error) {
        console.error(data.error);
        setSelectedPlace(null);
        setErrorMessage(data.error);
      } else {
        console.error("No place details returned");
        setSelectedPlace(null);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      setSelectedPlace(null);
      setErrorMessage(error instanceof Error ? error.message : "Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setErrorMessage(null);
  };

  // Handle search focus
  const handleSearchFocus = () => {
    setErrorMessage(null);
    if (searchQuery.length >= 2) {
      setShowResults(true);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery && searchQuery.length >= 2) {
      searchLocations(searchQuery);
    }
  };

  // Select location
  const selectLocation = async (location: GmbLocation) => {
    setSearchQuery(location.name);
    setShowResults(false);
    await fetchPlaceDetails(location.placeId);
  };

  // Proceed to form with selected place
  const handleProceedToForm = () => {
    if (selectedPlace) {
      // Build URL with query parameters
      const params = new URLSearchParams({
        businessName: selectedPlace.name,
        googleMapsUrl: selectedPlace.googleMapsUrl,
        address: selectedPlace.address,
        ...(selectedPlace.phoneNumber && { phone: selectedPlace.phoneNumber }),
        ...(selectedPlace.website && { website: selectedPlace.website }),
        ...(selectedPlace.rating && { rating: selectedPlace.rating.toString() }),
        ...(selectedPlace.user_ratings_total && { userRatingsTotal: selectedPlace.user_ratings_total.toString() }),
      });
      
      // Redirect to the form with pre-filled data
      window.location.href = `/formularz-profil-google?${params.toString()}`;
    }
  };

  // Clear selection
  const clearSelection = () => {
    setSelectedPlace(null);
    setSearchQuery("");
    setErrorMessage(null);
    inputRef.current?.focus();
  };

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery && searchQuery.length >= 2) {
        searchLocations(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle clicking outside search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-4 py-4 sm:py-16">
        <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <svg className="w-4 h-4 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm font-semibold text-blue-700">Zweryfikowana firma</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#002a5c] mb-3 sm:mb-5 leading-tight px-4">
            Potrzebujesz pomocy?
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 mb-6">
            <span className="text-gray-700">Znajdź profil swojej firmy i skorzystaj z naszych profesjonalnych usług.</span>
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto relative">
          {/* Search Section - hidden when company is selected */}
          {!selectedPlace && (
            <div className="sm:bg-white/80 sm:backdrop-blur-sm rounded-none sm:rounded-3xl sm:shadow-2xl p-0 sm:p-8 border-0 sm:border sm:border-white/20 relative overflow-visible">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/30 rounded-none sm:rounded-3xl hidden sm:block"></div>
              
              <div className="relative z-10 px-0 sm:px-0" ref={searchRef}>
                <h3 className="text-lg sm:text-xl font-bold text-[#002a5c] mb-4 text-center px-4">
                  Wyszukaj swoją firmę
                </h3>
                
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
                      className="relative w-full p-3 sm:p-5 text-base sm:text-lg border-2 border-slate-200 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white sm:bg-white/90 sm:backdrop-blur-sm focus:bg-white focus:shadow-xl focus:scale-[1.02] placeholder:text-slate-400 shadow-lg sm:shadow-none"
                      disabled={isSearching}
                    />
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
                    onClick={() => searchQuery && searchLocations(searchQuery)}
                    disabled={isSearching || !searchQuery || searchQuery.length < 2}
                    className="group relative w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    <div className="flex items-center justify-center relative z-10">
                      <span className="sm:hidden flex items-center">
                        Wyszukaj
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                      <svg className="hidden sm:block w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </button>
                </div>

                {/* Search Results Dropdown */}
                {showResults && locations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 max-h-96 overflow-y-auto"
                  >
                    {locations.map((location) => (
                      <button
                        key={location.placeId}
                        onClick={() => selectLocation(location)}
                        className="w-full p-4 text-left hover:bg-blue-50 transition-colors duration-200 border-b border-slate-100 last:border-b-0"
                      >
                        <div className="font-semibold text-gray-900">{location.name}</div>
                        <div className="text-sm text-gray-600">{location.address}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </div>

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

              {/* Link when company not found */}
              <div className="mt-4 text-center px-4 sm:px-0">
                <p className="text-gray-600 text-sm sm:text-base">
                  Nie możesz znaleźć swojej firmy?{" "}
                  <Link
                    href="/formularz-profil"
                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors duration-200"
                  >
                    Kliknij tutaj
                  </Link>
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Selected Place Details */}
        {selectedPlace && (
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
                      {selectedPlace.name}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                      {selectedPlace.address}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
                      <div className="bg-blue-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                        <span className="text-blue-700 font-medium text-xs sm:text-sm">
                          🗺️ Google Maps
                        </span>
                      </div>
                      
                      {selectedPlace.rating && (
                        <div className="bg-yellow-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                          <span className="text-yellow-700 font-medium text-xs sm:text-sm">
                            ⭐ {selectedPlace.rating} {selectedPlace.user_ratings_total && `(${selectedPlace.user_ratings_total} opinii)`}
                          </span>
                        </div>
                      )}

                      {selectedPlace.businessStatus === 'OPERATIONAL' && (
                        <div className="bg-green-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                          <span className="text-green-700 font-medium text-xs sm:text-sm">
                            ✅ Aktywna
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {selectedPlace.phoneNumber && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-gray-700 text-sm sm:text-base">{selectedPlace.phoneNumber}</span>
                        </div>
                      )}
                      
                      {selectedPlace.website && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          <a href={selectedPlace.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm sm:text-base truncate">
                            {selectedPlace.website}
                          </a>
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

                    {/* Preview Photos */}
                    {selectedPlace.photos && selectedPlace.photos.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Zdjęcia z wizytówki:</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedPlace.photos.slice(0, 3).map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`${selectedPlace.name} - zdjęcie ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Loading State */}
        {isLoadingDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto mt-4 sm:mt-8 flex justify-center items-center p-8"
          >
            <div className="text-center">
              <div className="relative inline-block">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0 left-0"></div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Pobieranie szczegółów...</p>
            </div>
          </motion.div>
        )}

        {/* Information sections - shown only when no place is selected */}
        {!selectedPlace && !isLoadingDetails && (
          <>
            {/* Testimonials Section */}
            {/* Social Proof Section */}
                    <motion.div
                      variants={fadeInUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      className="mt-16 max-w-4xl sm:max-w-6xl mx-auto"
                    >
                      <div className="bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 rounded-2xl sm:rounded-3xl shadow-xl border border-blue-100/50 overflow-hidden">
                        <div className="px-4 sm:px-8 py-8 sm:py-12 text-center">
                          {/* Quote Icon */}
                          <div className="inline-block p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 sm:mb-8">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                          </div>
                          
                          {/* Testimonial */}
                          <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                            <span className="inline-block text-blue-500 mr-1">❝</span>
                            Dzięki Wizaro.pl pozbyliśmy się problemu raz na zawsze
                            <span className="inline-block text-blue-500 ml-1">❞</span>
                          </blockquote>
                          
                          {/* Author */}
                          <div className="flex items-center justify-center">
                            <div className="w-8 h-8 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                              <span className="text-white font-bold text-lg sm:text-xl">M</span>
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-slate-800 text-base sm:text-lg">Michał K.</div>
                              <div className="text-slate-600 text-sm sm:text-base">Właściciel firmy</div>
                            </div>
                          </div>
                          
                          {/* Stars */}
                          <div className="flex justify-center mt-4 sm:mt-6">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>


            {/* Why Choose Us Section */}
            <motion.div
              variants={fadeInUp}
              className="mt-16 sm:mt-24 max-w-4xl sm:max-w-6xl mx-auto"
            >
              <div className="text-center mb-8 sm:mb-12 px-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#002a5c] mb-3">
                  Dlaczego My
                </h2>
                <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto">
                  Profesjonalne usługi z gwarancją rezultatów
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Feature 1 */}
                <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                        Gwarancja Sukcesu
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        100% skuteczności 
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                        Szybka Realizacja
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Średni czas realizacji to 1-7 dni roboczych
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                        Pełna Dyskrecja
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Bezpieczne procedury i pełna poufność danych
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="bg-white rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                        Wsparcie 24/7
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Zawsze dostępni do kontaktu i aktualizacji statusu zlecenia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
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
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-3 sm:mb-5 leading-tight px-4">
                Chroń Swoją Reputację Online
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
                Odzyskaj kontrolę nad tym, jak Twoja firma jest widziana w internecie. Profesjonalne wsparcie w ochronie wizerunku.
              </p>
            </div>

            {/* Features Grid */}
            <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Feature 1 */}
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="inline-block p-2 sm:p-3 bg-blue-500/20 rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Ochrona Wizerunku</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Skuteczna ochrona reputacji Twojej firmy.</p>
                </div>

                {/* Feature 2 */}
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="inline-block p-2 sm:p-3 bg-green-500/20 rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:bg-green-500/30 transition-colors duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Ochrona Danych</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Bezpieczeństwo i poufność Twoich danych.</p>
                </div>

                {/* Feature 3 */}
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="inline-block p-2 sm:p-3 bg-purple-500/20 rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Ekspresowa Realizacja</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Szybka i skuteczna realizacja zlecenia.</p>
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
      <GuaranteeSectionModernPayment />
    </motion.div>
  );
}
