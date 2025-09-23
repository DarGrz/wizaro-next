"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import GuaranteeSectionModern from "./GuaranteeSectionModern";

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
  reviewCount?: number;
  placeId?: string;
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

export default function CompanySearchUnozg() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<GmbLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<PlaceDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect for placeholder
  useEffect(() => {
    const placeholderTexts = [
      "Wpisz nazwę firmy...",
      "Wpisz adres firmy...",
      "Znajdź swoją firmę...",
      "Szukaj w Google Maps..."
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
      setAnimatedPlaceholder("Wpisz nazwę firmy lub adres...");
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchQuery]);

  // Debounce search function
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery && searchQuery.length >= 2) {
        searchLocations(searchQuery);
      }
    }, 1050);

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

  // Call the API to search for GMB locations
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
      const data = await response.json();
      
      if (response.ok && data.results) {
        setLocations(data.results);
        setShowResults(data.results.length > 0);
        
        // Show message if no results found
        if (data.results.length === 0) {
          setErrorMessage("Nie znaleziono żadnych firm Google My Business dla wpisanej frazy.");
        }
      } else if (data.error) {
        // Handle specific error messages from the API
        setErrorMessage(data.error);
        setLocations([]);
        setShowResults(false);
      } else {
        setLocations([]);
        setShowResults(false);
        setErrorMessage("Nie znaleziono żadnych firm Google My Business dla wpisanej frazy.");
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

  // Get place details
  const fetchPlaceDetails = async (placeId: string) => {
    setIsLoadingDetails(true);
    
    try {
      const response = await fetch(`/api/places-details?placeId=${placeId}`);
      
      // Handle rate limiting and other errors
      if (!response.ok) {
        const status = response.status;
        
        // Handle rate limiting (429 Too Many Requests)
        if (status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const waitSeconds = retryAfter ? parseInt(retryAfter, 10) : 60;
          throw new Error(`Przekroczono limit zapytań. Spróbuj ponownie za ${waitSeconds} sekund.`);
        }
        
        throw new Error(`Błąd serwera: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.details) {
        // Ensure user_ratings_total is always available
        if (data.details.user_ratings_total === undefined) {
          data.details.user_ratings_total = 0; // Default to 0 if not provided
        }
        
        setSelectedPlaceDetails(data.details);
        setShowResults(false);
        
        // Save the searched GMB profile to Supabase
        try {
          await fetch('/api/searched-gmb', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: data.details.name,
              address: data.details.address,
              placeId: placeId, // Fixed: changed from place_id to placeId
              googleMapsUrl: data.details.googleMapsUrl,
              phoneNumber: data.details.phoneNumber,
              website: data.details.website,
              rating: data.details.rating,
              businessStatus: data.details.businessStatus,
              types: data.details.types || []
            }),
          });
        } catch (saveError) {
          console.error('Error saving GMB profile to database:', saveError);
          // Continue execution even if save fails
        }
        
      } else {
        throw new Error("Nie udało się pobrać szczegółów miejsca.");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      setErrorMessage(error instanceof Error ? error.message : "Wystąpił błąd podczas pobierania szczegółów miejsca.");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleLocationClick = (location: GmbLocation) => {
    fetchPlaceDetails(location.placeId);
    setSearchQuery(location.name);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length < 2) {
      setShowResults(false);
      setLocations([]);
      setErrorMessage(null);
    }
  };

  const handleSearchFocus = () => {
    if (locations.length > 0 && searchQuery.length >= 2) {
      setShowResults(true);
    }
  };

  // Funkcja do przekierowania na formularz opinii Google z pre-wypełnioną wizytówką
  const handleProceedToForm = () => {
    if (selectedPlaceDetails) {
      // Zapisanie danych wybranej wizytówki w formacie oczekiwanym przez formularz opinii
      const businessCardData = {
        name: selectedPlaceDetails.name,
        googleMapsUrl: selectedPlaceDetails.googleMapsUrl,
        address: selectedPlaceDetails.address,
        phoneNumber: selectedPlaceDetails.phoneNumber,
        rating: selectedPlaceDetails.rating,
        user_ratings_total: selectedPlaceDetails.user_ratings_total,
        placeId: selectedPlaceDetails.placeId
      };

      // Zapisanie w localStorage z kluczem używanym przez formularz opinii
      localStorage.setItem('selectedBusinessCard', JSON.stringify(businessCardData));
      localStorage.setItem('preSelectedBusiness', 'true'); // flaga że wizytówka jest już wybrana
      // Usunięto flagę skipToStep2 - użytkownik zacznie od kroku 1 ale z pre-wypełnionymi danymi

      // Przekierowanie na formularz opinii Google
      window.location.href = '/formularz-opinie-google';
    }
  };

  const clearSelection = () => {
    setSelectedPlaceDetails(null);
    setSearchQuery("");
    setShowResults(false);
    setLocations([]);
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
            Znajdź profil swojej firmy i skorzystaj z naszych profesjonalnych usług.
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto relative">
          {/* Search Section - hidden when business is selected */}
          {!selectedPlaceDetails && (
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
                      className="relative w-full p-3 sm:p-5 text-base sm:text-lg border-2 border-slate-200 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white sm:bg-white/90 sm:backdrop-blur-sm focus:bg-white focus:shadow-xl focus:scale-[1.02] placeholder:text-slate-400 shadow-lg sm:shadow-none"
                      disabled={isSearching || isLoadingDetails}
                    />
                    {/* Loading indicator inside input */}
                    {(isSearching || isLoadingDetails) && (
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
                    onClick={() => searchQuery && searchQuery.length >= 2 && searchLocations(searchQuery)}
                    disabled={isSearching || isLoadingDetails || !searchQuery || searchQuery.length < 2}
                    className="group relative w-full sm:w-auto px-5 sm:px-8 py-3 sm:py-5 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none overflow-hidden"
                  >
                    {/* Shimmer animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                    <div className="flex items-center justify-center relative z-10">
                      {/* Mobile version - text with arrow */}
                      <span className="sm:hidden flex items-center">
                        Wyszukaj
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

                {/* Search Results Dropdown */}
                {showResults && locations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-[100] top-0 mt-16 left-0 w-full sm:top-full sm:mt-3 bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-2xl max-h-60 sm:max-h-80 overflow-y-auto"
                  style={{ 
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {locations.map((location) => (
                    <button
                      key={location.id}
                      onClick={() => handleLocationClick(location)}
                      className="w-full p-2 sm:p-4 text-left hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 border-b border-slate-100 last:border-b-0 transition-all duration-200 first:rounded-t-xl sm:first:rounded-t-2xl last:rounded-b-xl sm:last:rounded-b-2xl group"
                    >
                      <div className="font-semibold text-sm sm:text-base text-slate-800 group-hover:text-blue-700 transition-colors">{location.name}</div>
                      <div className="text-xs sm:text-sm text-slate-500 mt-1 group-hover:text-slate-600 transition-colors">{location.address}</div>
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
          </div>
          )}</motion.div>

        {/* Selected Business Card Details */}
        {selectedPlaceDetails && (
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
                      {selectedPlaceDetails.name}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{selectedPlaceDetails.address}</p>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6">
                      {selectedPlaceDetails.rating && (
                        <div className="flex items-center bg-yellow-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="font-semibold text-gray-800 text-sm sm:text-base">
                            {selectedPlaceDetails.rating.toFixed(1)}
                          </span>
                          <span className="text-gray-600 ml-1 text-xs sm:text-sm">
                            ({selectedPlaceDetails.user_ratings_total} opinii)
                          </span>
                        </div>
                      )}
                      
                      {selectedPlaceDetails.businessStatus && (
                        <div className="bg-green-50 px-2 sm:px-3 py-1 sm:py-2 rounded-lg">
                          <span className="text-green-700 font-medium text-xs sm:text-sm">
                            {selectedPlaceDetails.businessStatus === 'OPERATIONAL' ? 'Czynne' : selectedPlaceDetails.businessStatus}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      {selectedPlaceDetails.phoneNumber && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-gray-700 text-sm sm:text-base">{selectedPlaceDetails.phoneNumber}</span>
                        </div>
                      )}
                      
                      {selectedPlaceDetails.website && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                          </svg>
                          <a 
                            href={selectedPlaceDetails.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#002a5c] hover:underline text-sm sm:text-base"
                          >
                            Strona internetowa
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
                        <span className="relative">Przejdź dalej</span>
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

                {/* Business Photos */}
                {selectedPlaceDetails.photos && selectedPlaceDetails.photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    {selectedPlaceDetails.photos.slice(0, 4).map((photo, index) => (
                      <div key={index} className="aspect-square rounded-lg sm:rounded-xl overflow-hidden bg-gray-100">
                        <Image
                          src={photo}
                          alt={`${selectedPlaceDetails.name} - zdjęcie ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Business Control Section */}
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
              <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mb-4 sm:mb-6 rounded-full"></div>
              <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light px-4">
                Dbaj o Swoją Obecność w Google
              </p>
              <p className="text-sm sm:text-lg text-slate-400 mt-3 sm:mt-4 max-w-3xl mx-auto px-4">
                Odzyskaj pełną kontrolę nad wizerunkiem online
              </p>
            </div>

            {/* Features Grid */}
            <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                {/* Feature 1 */}
                <div className="group">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full transition-all duration-300 hover:from-white/20 hover:to-white/10 hover:-translate-y-1 hover:shadow-xl">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg sm:rounded-xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 text-center">
                      Kontrola Danych
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-center text-xs sm:text-sm">
                      Przejmij kontrolę nad swoimi danymi firmowymi w Google.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="group">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full transition-all duration-300 hover:from-white/20 hover:to-white/10 hover:-translate-y-1 hover:shadow-xl">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg sm:rounded-xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 text-center">
                      Nowy Początek
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-center text-xs sm:text-sm">
                      Świeża obecność online dla Twojego biznesu.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="group">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 h-full transition-all duration-300 hover:from-white/20 hover:to-white/10 hover:-translate-y-1 hover:shadow-xl">
                    <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-lg sm:rounded-xl w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-2 sm:mb-3 text-center">
                      Bezpieczne Rozwiązania
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-center text-xs sm:text-sm">
                      Profesjonalne i legalne zarządzanie danymi.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center mt-8 sm:mt-12 md:mt-16">
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
                <p className="text-slate-400 text-xs sm:text-sm mt-4 sm:mt-6 max-w-2xl mx-auto px-4">
                  Bezpłatna konsultacja • Pełna dyskrecja • Gwarancja rezultatów
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
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
                &ldquo;Dzięki Wizaro.pl w końcu mam spokój z konkurencją&rdquo;
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg sm:text-xl">M</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-800 text-base sm:text-lg">Michał K.</div>
                  <div className="text-slate-600 text-sm sm:text-base">Właściciel restauracji</div>
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
        
        {/* Guarantee Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 max-w-4xl sm:max-w-6xl mx-auto"
        >
          <GuaranteeSectionModern />
        </motion.div>
      </div>
    </motion.div>
  );
}