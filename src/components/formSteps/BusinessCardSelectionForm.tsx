"use client";

import React, { useState, useEffect, useRef } from "react";

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
  onBusinessCardSelected: (businessCard: { name: string; googleMapsUrl: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BusinessCardSelectionForm({
  onBusinessCardSelected,
  onSubmit,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [locations, setLocations] = useState<GmbLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState<PlaceDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

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

  // Call the API to search for GMB locations
  const searchLocations = async (query: string) => {
    if (!query || query.length < 2) return;
    
    setIsSearching(true);
    setErrorMessage(null);
    
    try {
      const response = await fetch(`/api/gmb-search?query=${encodeURIComponent(query)}`);
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
        // Add user_ratings_total if it's not in the details
        if (!data.details.user_ratings_total && data.details.rating) {
          data.details.user_ratings_total = 0; // Default to 0 if not provided
        }
        
        setSelectedPlaceDetails(data.details);
        
        // Notify parent component about the selected business card
        onBusinessCardSelected({
          name: data.details.name,
          googleMapsUrl: data.details.googleMapsUrl
        });
        
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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length < 2) {
      setLocations([]);
      setShowResults(false);
      setErrorMessage(null);
    }
  };  // Select a location from search results
  const selectLocation = (location: GmbLocation) => {
    // Clear the search
    setSearchQuery("");
    setShowResults(false);
    setErrorMessage(null);
    
    // Fetch more details about the place and store in state
    // The fetchPlaceDetails function will also save the data to Supabase
    fetchPlaceDetails(location.placeId);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2 mt-5 md:mt-0">
      <h2 className="text-2xl md:text-2xl font-bold text-center text-gray-800 mb-3 md:mb-6">
Wybierz profil Google, z którego chcesz usunąć opinie.

      </h2>

      <div className="bg-white mb-2 md:mb-4">        {/* Show selected business card if available */}
        {selectedPlaceDetails && (
          <div className={`mb-4 p-4 ${selectedPlaceDetails.rating !== undefined && selectedPlaceDetails.rating < 3.9 
            ? "bg-yellow-50 border border-yellow-200" 
            : "bg-green-50 border border-green-200"} rounded-lg`}>
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
              className="text-blue-600 hover:text-blue-800 underline text-sm font-medium block mt-1"
            >
              {selectedPlaceDetails.name}
            </a>
            <span className="text-gray-600 text-xs md:text-sm block truncate">{selectedPlaceDetails.address}</span>
            
            {/* Rating information */}
            {selectedPlaceDetails.rating !== undefined && (
              <div className="mt-2">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill={star <= Math.round(selectedPlaceDetails.rating || 0) ? "#FFD700" : "#E5E7EB"}
                        className="h-4 w-4"
                      >
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                    ))}
                  </div>
                  <span className="ml-1 text-sm font-medium text-gray-700">
                    {selectedPlaceDetails.rating.toFixed(1)}
                  </span>
                  {selectedPlaceDetails.user_ratings_total !== undefined && (
                    <span className="ml-1 text-xs text-gray-500">
                      ({selectedPlaceDetails.user_ratings_total} {selectedPlaceDetails.user_ratings_total === 1 ? 'opinia' : 
                       selectedPlaceDetails.user_ratings_total < 5 ? 'opinie' : 'opinii'})
                    </span>
                  )}
                </div>
              </div>
            )}              {/* Warning message for low ratings */}
            {selectedPlaceDetails.rating !== undefined && selectedPlaceDetails.rating < 3.9 && (
              <div className="mt-3 p-3 bg-yellow-50    text-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-yellow-800">Niska ocena wizytówki</h3>
                    <div className="mt-1 text-yellow-700">
                      <p>W twoim przypadku korzystniejsze może być usunięcie lub zresetowanie wizytówki. <a 
                        href={`/formularz-profil-google?businessName=${encodeURIComponent(selectedPlaceDetails.name)}&googleMapsUrl=${encodeURIComponent(selectedPlaceDetails.googleMapsUrl)}&address=${encodeURIComponent(selectedPlaceDetails.address)}${selectedPlaceDetails.phoneNumber ? `&phone=${encodeURIComponent(selectedPlaceDetails.phoneNumber)}` : ''}${selectedPlaceDetails.website ? `&website=${encodeURIComponent(selectedPlaceDetails.website)}` : ''}${selectedPlaceDetails.rating ? `&rating=${selectedPlaceDetails.rating}` : ''}${selectedPlaceDetails.user_ratings_total ? `&userRatingsTotal=${selectedPlaceDetails.user_ratings_total}` : ''}`} 
                        className="font-medium underline hover:text-yellow-900"
                      >Sprawdź tę opcję</a></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search interface - only show when no business card is selected */}
        {!selectedPlaceDetails && (
          <>
            <div className="relative" ref={searchRef}>
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
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>                </div>
                
                {/* Loading spinner */}
                {isSearching && (
                  <div className="absolute right-3 top-3 md:top-4">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0D2959]"></div>
                  </div>
                )}
              </div>
              
              {/* Can't find your business link */}
              <div className="text-center mt-2 mb-4">
                <p className="text-sm text-gray-600 mb-1">Nie możesz znaleźć swojej firmy?</p>
                <a 
                  href="/formularz-opinie" 
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
                >
                  Przejdź do formularza ogólnego
                </a>
              </div>

              {/* Search results */}
              {showResults && (
                <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                  <div className="p-3 bg-blue-50 border-b border-blue-100 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Znaleziono {locations.length} firm - kliknij, aby wybrać
                  </div>
                  {locations.map((location) => (
                    <div
                      key={location.id}
                      onClick={() => selectLocation(location)}
                      className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900">{location.name}</div>
                      <div className="text-sm text-gray-600">{location.address}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Loading state for place details */}
            {isLoadingDetails && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D2959]"></div>
                <span className="ml-3 text-gray-600">Pobieranie szczegółów wizytówki...</span>
              </div>
            )}

            {/* Error message */}
            {errorMessage && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
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
                        href="/formularz-opinie" 
                        className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 px-3 py-1 rounded text-xs font-medium transition-colors"
                      >
                        Przejdź do formularza ogólnego
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Form actions */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={!selectedPlaceDetails}
          className={`px-8 py-3 rounded text-white font-medium transition-all duration-200 ${
            selectedPlaceDetails
              ? 'bg-[#0D2959] hover:bg-[#0A1F47] shadow-lg hover:shadow-xl'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Przejdź do wyboru opinii
        </button>
      </div>
    </form>
  );
}
