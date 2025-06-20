// components/formSteps/RemovalForm.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Removal {
  companyName: string;
  nip: string;
  url: string;
}

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locations, setLocations] = useState<GmbLocation[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<PlaceDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(false);
  const [isResetMode, setIsResetMode] = useState<boolean>(false);
  const [modeChangeNotification, setModeChangeNotification] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Dodajemy referencję do poprzedniej liczby profili, aby wykryć dodanie nowego
  const previousRemovalsLength = useRef<number>(removals.length);
  
  // Check if there's a pre-filled business from URL parameters
  useEffect(() => {
    // If there's already a company name and URL in the first removal, try to create a PlaceDetails object
    if (removals.length > 0 && removals[0].companyName && removals[0].url) {
      // Get address from URL if possible
      const urlParams = new URLSearchParams(window.location.search);
      const address = urlParams.get('address');
      const phone = urlParams.get('phone');
      
      if (!selectedPlaceDetails) {
        // Pobierz dodatkowe informacje z URL, jeśli są dostępne
        const rating = urlParams.get('rating');
        const userRatingsTotal = urlParams.get('userRatingsTotal');
        const website = urlParams.get('website');
        
        // Create a placeholder PlaceDetails object from the URL data
        const placeDetails: PlaceDetails = {
          id: '',
          name: removals[0].companyName,
          address: address || '',
          googleMapsUrl: removals[0].url,
          phoneNumber: phone || '',
          website: website || undefined,
          photos: [],
          businessStatus: 'OPERATIONAL',
          types: [],
          rating: rating ? parseFloat(rating) : undefined,
          user_ratings_total: userRatingsTotal ? parseInt(userRatingsTotal, 10) : undefined
        };
        
        setSelectedPlaceDetails(placeDetails);
      }
    }
  }, [removals, selectedPlaceDetails]);
  
  // Efekt obsługujący dodanie nowego profilu
  useEffect(() => {
    if (removals.length > previousRemovalsLength.current) {
      // Jeśli dodano nowy profil, resetujemy selectedPlaceDetails
      if (expandedIndex === removals.length - 1) {
        setSelectedPlaceDetails(null);
      }
    }
    previousRemovalsLength.current = removals.length;
  }, [removals.length, expandedIndex]);

  // Call the API to search for GMB locations
  const searchLocations = async (query: string) => {
    if (!query || query.length < 2) return;
    
    setIsSearching(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch(`/api/gmb-search?query=${encodeURIComponent(query)}`);
      
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
      
      // Check if results array exists and has items
      if (data.results && Array.isArray(data.results)) {
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
        setSelectedPlaceDetails(data.details);
        
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
          console.error('Error saving searched GMB data:', error);
        }
      } else if (data.error) {
        // Handle specific error messages from the API
        console.error(data.error);
        setSelectedPlaceDetails(null);
        setErrorMessage(data.error);
      } else {
        console.error("No place details returned");
        setSelectedPlaceDetails(null);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      setSelectedPlaceDetails(null);
      setErrorMessage(error instanceof Error ? error.message : "Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.");
    } finally {
      setIsLoadingDetails(false);
    }
  };

  // Debounce search function
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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length < 2) {
      setLocations([]);
      setShowResults(false);
      setErrorMessage(null);
    }
  };

  // Select a location from search results
  const selectLocation = (location: GmbLocation, index: number) => {
    // Generate Google Maps URL with additional query parameters for better identification
    const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${location.placeId}&query=${encodeURIComponent(location.name)}`;
    
    // Update the removal data
    onChange(index, "companyName", location.name);
    onChange(index, "url", googleMapsUrl);
    
    // Zawsze używaj stałej wartości "-" dla pola nip
    onChange(index, "nip", "-");

    // Clear the search
    setSearchQuery("");
    setShowResults(false);
    setErrorMessage(null);
    
    // Fetch more details about the place and store in state
    // The fetchPlaceDetails function will also save the data to Supabase
    fetchPlaceDetails(location.placeId);
  };

  // Generate star rating display
  const renderStarRating = (rating?: number) => {
    if (!rating) return null;
    
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const starColor = rating < 4.0 ? "text-red-600" : "text-[#5DA157]";
    
    return (
      <div className="flex items-center mt-1">
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className={`w-4 h-4 md:w-5 md:h-5 ${starColor}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
        {halfStar && (
          <svg className={`w-4 h-4 md:w-5 md:h-5 ${starColor}`} fill="currentColor" viewBox="0 0 20 20">
            <defs>
              <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#d1d5db" />
              </linearGradient>
            </defs>
            <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 md:w-5 md:h-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        
        <span className={`ml-1 text-xs md:text-sm ${rating < 4.0 ? 'text-red-600 font-medium' : 'text-gray-600'}`}>({rating.toFixed(1)})</span>
      </div>
    );
  };

  // Handle mode change and show notification
  const handleModeChange = (newMode: boolean) => {
    setIsResetMode(newMode);
    setModeChangeNotification(
      newMode 
        ? "Zmieniono tryb na resetowanie opinii. Cena: 2199 zł."
        : "Zmieniono tryb na usuwanie profilu. Cena: 1299 zł."
    );
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setModeChangeNotification(null);
    }, 3000);
  };

  // Sprawdź czy tryb resetowania jest określony w URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const resetParam = urlParams.get('reset');
    
    if (resetParam === 'true') {
      setIsResetMode(true);
      setModeChangeNotification("Wybrano tryb resetowania opinii. Cena: 2199 zł.");
      
      // Ukryj powiadomienie po 3 sekundach
      setTimeout(() => {
        setModeChangeNotification(null);
      }, 3000);
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className="space-y-2 mt-5 md:mt-0">
      <h2 className="text-2xl md:text-2xl font-bold text-center text-gray-800 mb-3 md:mb-6">
        {isResetMode ? "Resetuj Opinie na Profilu firmy w Mapach Google" : "Usuń Profil Firmy z Map Google"}
      </h2>

      {/* Mode toggle switch with fluid animation */}
      <div className="flex justify-center mb-4">
        <div className="relative flex items-center bg-gray-100 p-1 rounded-lg overflow-hidden">
          {/* Fluid background animation */}
          <div 
            className={`absolute top-1 bottom-1 rounded-md transition-all duration-300 ease-in-out z-0 bg-[#0D2959]
              ${isResetMode ? 'right-1 left-[calc(50%_-_8px)]' : 'left-1 right-[calc(50%_-_8px)]'}
            `}
            style={{
              boxShadow: '0 0 8px rgba(13, 41, 89, 0.4)',
              transform: isResetMode ? 'translateX(4px)' : 'translateX(-4px)',
            }}
          >
            {/* Fluid bubble effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute rounded-full w-8 h-8 bg-white/30 animate-float" style={{ top: '-10%', left: '10%' }}></div>
                <div className="absolute rounded-full w-6 h-6 bg-white/30 animate-float-delay" style={{ top: '40%', right: '15%' }}></div>
                <div className="absolute rounded-full w-4 h-4 bg-white/30 animate-float-slow" style={{ bottom: '20%', left: '30%' }}></div>
              </div>
            </div>
          </div>
          
          {/* Button for profile removal */}
          <button
            type="button"
            className={`px-3 py-1.5 text-sm rounded-md transition-colors relative z-10 ${
              !isResetMode 
                ? 'text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => handleModeChange(false)}
          >
            Usuwanie profilu
          </button>
          
          {/* Button for review reset */}
          <button
            type="button"
            className={`px-3 py-1.5 text-sm rounded-md transition-colors relative z-10 ${
              isResetMode 
                ? 'text-white' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => handleModeChange(true)}
          >
            Resetowanie opinii
          </button>
        </div>
      </div>

      {/* Mode change notification */}
      {modeChangeNotification && (
        <div className="fixed top-4 right-4 bg-[#0D2959] text-white px-4 py-2 rounded shadow-md z-50 animate-fade-in-out">
          {modeChangeNotification}
        </div>
      )}

      {/* Description based on selected mode */}
      <div className="text-center mb-4 text-sm text-[#5DA157]">
        {isResetMode ? (
          <p>Usuwamy starą wizytówkę ze wszystkimi opiniami firmy z Map Google i na jej miejsce zakładamy nową wizytówkę.</p>
        ) : (
          <p>Usługa usuwania profilu całkowicie usuwa wizytówkę firmy z Map Google.</p>
        )}
      </div>

      {removals.map((removal, index) => (
        <div key={index} className="bg-white mb-2 md:mb-4">
          <div className="flex justify-between items-center">
            <div className="text-gray-700 flex-grow overflow-hidden">
              {expandedIndex !== index ? (
                <div className="flex items-center">
                  <span className="font-medium">
                    {removal.companyName ? removal.companyName : `Profil #${index + 1}`}
                  </span>
                  {removal.companyName && selectedPlaceDetails && (
                    <span className="ml-2 text-xs px-2 py-0.5 bg-[#5DA157]/10 text-[#5DA157] rounded-full">Wybrano</span>
                  )}
                </div>
              ) : (
                <p className="font-medium">
                  Profil #{index + 1} {removal.companyName && `– ${removal.companyName}`}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-3">
              {/* Usuń wizytówkę - pokazuje się zawsze dla wielu wizytówek lub gdy wybrano wizytówkę */}
              {(removals.length > 1 || (selectedPlaceDetails && removal.companyName)) && (
                <button
                  type="button"
                  onClick={() => {
                    if (selectedPlaceDetails && removal.companyName) {
                      // Jeśli wybrano wizytówkę, resetujemy dane
                      setSelectedPlaceDetails(null);
                      onChange(index, "companyName", "");
                      onChange(index, "url", "");
                      onChange(index, "nip", "-");
                    } else {
                      // Standardowe usuwanie wizytówki
                      onRemove(index);
                    }
                  }}
                  className="text-[#0D2959] text-sm hover:underline mr-2"
                >
                  Usuń
                </button>
              )}
              {/* Przycisk Rozwiń/Zwiń - pokazuje się tylko gdy wybrano wizytówkę */}
              {removal.companyName && (
                <button
                  type="button"
                  className="text-sm text-white bg-[#0D2959] hover:bg-[#0a1f40] px-3 py-1 rounded"
                  onClick={() => onExpand(index)}
                >
                  {expandedIndex === index ? "Zwiń" : "Rozwiń"}
                </button>
              )}
            </div>
          </div>

          {/* When profile is collapsed but has details, we show only minimal information */}
          {expandedIndex !== index && selectedPlaceDetails && removal.companyName && (
            <div className="mt-2 text-sm text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{selectedPlaceDetails.address}</span>
            </div>
          )}

          {/* Pokazujemy wyszukiwarkę gdy profil jest rozwinięty LUB gdy profil nie ma jeszcze wybranych danych */}
          {(expandedIndex === index || !removal.companyName) && (
            <>
              {/* Wyszukiwanie i link "Nie możesz znaleźć" pokazywane tylko gdy nie wybrano wizytówki */}
              {!selectedPlaceDetails && (
                <>
                  <div className="relative" ref={searchRef}>
                    {/* <label className="block text-gray-700 text-sm font-medium mb-1 mt-3">
                      Wyszukaj firmę w Google (wpisz minimum 3 znaki)
                    </label> */}
                    <div className="relative my-6 md:my-12">
                      <input
                        type="text"
                        placeholder="Wpisz nazwę firmy, aby wyszukać..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="w-full rounded-lg px-4 text-md md:text-xl py-4 md:py-3 pl-10 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D2959]/30 transition-all duration-200"
                      />
                      <div className="absolute left-3 top-2.5 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-4zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {isSearching && (
                        <div className="absolute right-3 top-3">
                          <div className="w-4 h-4 border-t-2 border-[#0D2959] rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    
                    {/* Link do formularza ogólnego */}
                    <div className="text-center mb-4">
                      <p className="text-sm text-gray-600">
                        Nie możesz znaleźć swojej firmy? <a href="/formularz-profil" className="text-[#0D2959] hover:text-[#0a1f40] font-medium">Kliknij tutaj</a>
                      </p>
                    </div>
                    
                    {/* Wyniki wyszukiwania wyświetlane nad sekcją informacji */}
                    {showResults && locations.length > 0 && (
                      <div className="absolute z-20 left-0 right-0 top-16 md:top-24 bg-white shadow-lg rounded-md max-h-60 md:max-h-80 overflow-auto border border-gray-200">
                        <div className="p-2 bg-gray-50 text-xs text-gray-500 flex items-center sticky top-0">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-[#0D2959]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                          </svg>
                          Znaleziono {locations.length} firm - kliknij, aby wybrać
                        </div>
                        {locations.map((location) => (
                          <div
                            key={location.id}
                            onClick={() => selectLocation(location, index)}
                            className="p-2 md:p-3 hover:bg-[#0D2959]/5 cursor-pointer border-b border-gray-50 transition-colors duration-150"
                          >
                            <div className="font-medium text-gray-900">{location.name}</div>
                            <div className="text-xs md:text-sm text-gray-600 mt-1 flex items-start">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span>{location.address}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Komunikat o błędzie wyświetlany nad sekcją informacji */}
                    {errorMessage && searchQuery.length >= 3 && !isSearching && !showResults && (
                      <div className="absolute z-20 left-0 right-0 top-16 md:top-24 bg-white shadow-lg border border-gray-200 rounded-md p-3 md:p-4">
                        <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
                          <div className="flex-shrink-0 flex justify-center">
                            <div className="bg-yellow-100 rounded-full p-2 md:p-3">
                              <svg className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-xs md:text-sm font-medium text-yellow-800">
                              {errorMessage}
                            </h3>
                            <div className="mt-1 md:mt-2 text-xs md:text-sm text-yellow-700">
                              <p>
                                Nie wszystkie wizytówki Google są dostępne w wyszukiwarce. Jeśli nie możesz znaleźć swojej firmy, skorzystaj z formularza ogólnego.
                              </p>
                            </div>
                            <div className="mt-2 md:mt-4">
                              <a 
                                href="/formularz-profil" 
                                className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 border border-transparent text-xs md:text-sm font-medium rounded-md shadow-sm text-white bg-[#0D2959] hover:bg-[#0a1f40] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D2959] transition-colors duration-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                </svg>
                                Przejdź do formularza dla wszystkich profili
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Najważniejsze punkty */}
                    <div className="bg-gray-50 rounded-lg p-3 md:p-4 mb-3 md:mb-6">
                      <h3 className="text-sm md:text-sm font-medium text-gray-700 mb-2 md:mb-3">Najważniejsze informacje:</h3>
                      <ul className="space-y-1 md:space-y-2">
                        <li className="flex items-start">
                          <svg className="h-4 md:h-5 w-4 md:w-5 text-[#5DA157] mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm md:text-sm text-gray-600">
                            <strong className="text-gray-800">Płatność dopiero po usunięciu wizytówki</strong> - zapłacisz tylko za skuteczną usługę
                          </span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-4 md:h-5 w-4 md:w-5 text-[#5DA157] mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm md:text-sm text-gray-600">
                            <strong className="text-gray-800">Gwarancja skuteczności</strong> - używamy sprawdzonych metod
                          </span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-4 md:h-5 w-4 md:w-5 text-[#5DA157] mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm md:text-sm text-gray-600">
                            <strong className="text-gray-800">Szybka realizacja</strong> - usunięcie profilu w ciągu 7 dni roboczych
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* <div className="mt-3 text-center">
                    <a 
                      href="/formularz-profil" 
                      className="inline-flex items-center justify-center px-4 py-2 text-[#5DA157] bg-[#5DA157]/5 hover:bg-[#5DA157]/10 rounded-md text-sm font-medium w-full md:w-auto transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#5DA157]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Nie możesz znaleźć swojej firmy? Kliknij tutaj
                    </a>
                  </div> */}
                </>
              )}

              {/* Place Details Card - displayed after selection */}
              {isLoadingDetails && (
                <div className="flex items-center justify-center py-3 md:py-4 mt-2 md:mt-3 rounded bg-gray-50">
                  <div className="w-4 md:w-5 h-4 md:h-5 border-t-2 border-[#0D2959] rounded-full animate-spin mr-2"></div>
                  <span className="text-gray-600 text-xs md:text-sm">Ładowanie szczegółów...</span>
                </div>
              )}

              {selectedPlaceDetails && !isLoadingDetails && (
                <div className="mt-3 md:mt-4 bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="bg-[#0D2959]/5 p-2 md:p-3 flex justify-between items-center">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 md:h-4 w-3 md:w-4 text-[#0D2959] mr-1 md:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium text-gray-800 text-xs md:text-sm">Wybrana wizytówka Google</span>
                    </div>
                    <a 
                      href={selectedPlaceDetails.googleMapsUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0D2959] hover:text-[#0a1f40] text-xs flex items-center"
                    >
                      <svg className="h-2.5 md:h-3 w-2.5 md:w-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      <span>Zobacz na Mapach</span>
                    </a>
                  </div>
                  <div className="p-3 md:p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedPlaceDetails.name}</h3>
                        {renderStarRating(selectedPlaceDetails.rating)}
                      </div>
                      {/* <div className="text-xs px-2 py-1 bg-[#5DA157]/10 text-[#5DA157] rounded-full">
                        Wybrano
                      </div> */}
                    </div>
                    
                    <div className="mt-2 md:mt-3 space-y-1.5 md:space-y-2 text-xs md:text-sm">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 md:h-4 w-3.5 md:w-4 text-gray-500 mr-1.5 md:mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{selectedPlaceDetails.address}</span>
                      </div>
                      
                      {selectedPlaceDetails.phoneNumber && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 md:h-4 w-3.5 md:w-4 text-gray-500 mr-1.5 md:mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          <a href={`tel:${selectedPlaceDetails.phoneNumber}`} className="text-[#0D2959] hover:text-[#0a1f40]">
                            {selectedPlaceDetails.phoneNumber}
                          </a>
                        </div>
                      )}
                      
                      {selectedPlaceDetails.website && (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 md:h-4 w-3.5 md:w-4 text-gray-500 mr-1.5 md:mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                          </svg>
                          <a href={selectedPlaceDetails.website} target="_blank" rel="noopener noreferrer" className="text-[#0D2959] hover:text-[#0a1f40] truncate">
                            {selectedPlaceDetails.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Simplified photos section */}
                    {selectedPlaceDetails.photos && selectedPlaceDetails.photos.length > 0 && (
                      <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-50">
                        <div className="flex flex-wrap gap-1.5 md:gap-2">
                          {selectedPlaceDetails.photos.slice(0, 3).map((photoUrl, i) => (
                            <div key={i} className="h-12 md:h-14 w-12 md:w-14 rounded overflow-hidden shadow-sm">
                              <Image 
                                src={photoUrl} 
                                alt={`${selectedPlaceDetails.name} - zdjęcie ${i+1}`}
                                width={56}
                                height={56}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-gray-50 text-xxs md:text-xs text-gray-600">
                      <p>
                        To jest wizytówka Google, którą chcesz usunąć.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <input
                type="hidden"
                name="companyName"
                required
                value={removal.companyName}
                onChange={(e) => onChange(index, "companyName", e.target.value)}
              />

              <input
                type="hidden"
                name="nip"
                value={removal.nip}
                onChange={(e) => onChange(index, "nip", e.target.value)}
              />

              <input
                type="hidden"
                name="url"
                required
                value={removal.url}
                onChange={(e) => onChange(index, "url", e.target.value)}
              />

              <div className="mt-4">
                {/* <p className="text-xs text-center text-gray-600">
                  Wyszukaj i wybierz firmę, której profil Google chcesz usunąć.
                </p> */}
              </div>
            </>
          )}
        </div>
      ))}

      {removals.some(r => r.companyName && r.url) && (
        <div className="mt-3 md:mt-4 p-2 md:p-4 text-center">
          <p className="text-gray-700 text-sm md:text-base">
            Cena: <strong>{isResetMode ? "2199" : totalPrice} zł brutto</strong> <span className="text-xxs md:text-xs text-gray-500">(z VAT 23%)</span>
          </p>
        </div>
      )}

      {!removals.some(r => r.companyName && r.url) && (
        <div className="mt-2 md:mt-3 text-center">
          <p className="text- md:text-xs">
            Wybierz przynajmniej jeden profil, aby kontynuować.
          </p>
        </div>
      )}

      <div className="flex justify-between gap-2 md:gap-3 mt-3 md:mt-4">
        <div>
          {removals.some(r => r.companyName && r.url) && (
            <button
              type="button"
              onClick={() => {
                onAdd();
                // Rozwijamy nowo dodany profil - przekazujemy indeks, który będzie miał nowy profil
                onExpand(removals.length);
              }}
              className="w-46 px-2 md:px-4 py-2.5 md:py-2.5 bg-gray-100 hover:bg-gray-200 rounded text-sm md:text-sm"
            >
              Dodaj kolejny profil
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!removals.some(r => r.companyName && r.url)}
          className={`w-40 px-3 md:px-4 py-2.5 md:py-2,5 rounded text-sm md:text-sm ${
            !removals.some(r => r.companyName && r.url)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-[#0D2959] text-white hover:bg-[#0a1f40]'
          }`}
          onClick={() => {
            // Store the mode in localStorage for other components to access
            localStorage.setItem("profileOperationMode", isResetMode ? "reset" : "removal");
            // Store the service description for summary page
            localStorage.setItem("serviceDescription", isResetMode 
              ? "Resetowanie opinii na profilu firmy w Mapach Google" 
              : "Usuwanie profilu firmy z Map Google");
          }}
        >
          Przejdź dalej
        </button>
      </div>

      {/* Notification for mode change */}
      {modeChangeNotification && (
        <div className="fixed top-4 right-4 bg-[#0D2959] text-white px-4 py-2 rounded shadow-md z-50 animate-fade-in-out">
          {modeChangeNotification}
        </div>
      )}
    </form>
  );
}