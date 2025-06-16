'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * GoogleBusinessAccessRequest - komponent do uzyskiwania Place ID i generowania linków dostępowych
 * dla profili Google Business Profile, które nie mają fizycznej lokalizacji.
 */
export default function GoogleBusinessAccessRequest() {
  const [placeId, setPlaceId] = useState('');
  const [googleMapUrl, setGoogleMapUrl] = useState('');
  const [extractionResult, setExtractionResult] = useState<{
    placeId: string;
    name: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    visible: boolean;
  } | null>(null);
  
  // New states for Places API search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{
    place_id: string;
    name: string;
    formatted_address: string;
  }>>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Click outside listener for search results dropdown
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
  }, [searchRef]);

  // Search for businesses using Places API
  const searchPlaces = async (query: string) => {
    if (!query || query.length < 3) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    try {
      const response = await fetch(`/api/places-autocomplete?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Search request failed');
      }
      
      const data = await response.json();
      setSearchResults(data.predictions || []);
      setShowResults(true);
    } catch (error) {
      console.error('Error searching places:', error);
      showNotification('Błąd podczas wyszukiwania lokalizacji', 'error');
    } finally {
      setIsSearching(false);
    }
  };
  
  // Handle selection of a place from search results
  const handlePlaceSelect = (place: { place_id: string; name: string; formatted_address: string }) => {
    setPlaceId(place.place_id);
    setSearchQuery('');
    setShowResults(false);
    setExtractionResult({
      placeId: place.place_id,
      name: place.name
    });
    
    // Automatically generate access link and copy to clipboard
    const accessLink = `https://business.google.com/arc/p/${place.place_id}`;
    navigator.clipboard.writeText(accessLink)
      .then(() => {
        showNotification(`Znaleziono Place ID dla "${place.name}" i skopiowano link do schowka`, 'success');
      });
  };
    // Debounce search to prevent too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 3) {
        searchPlaces(searchQuery);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Pokaż powiadomienie
  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setNotification({ message, type, visible: true });
    
    // Ukryj powiadomienie po 5 sekundach
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const extractPlaceId = () => {
    // Funkcja do wywołania przez użytkownika w konsoli przeglądarki
    const extractionCode = `
      (function() {
        try {
          const data = window.APP_INITIALIZATION_STATE?.[3]?.[6]?.[0]?.[1];
          const placeId = data?.[78];
          const name = data?.[11];
          
          if (placeId) {
            return { placeId, name };
          } else {
            return null;
          }
        } catch (e) {
          console.error(e);
          return null;
        }
      })()
    `;

    navigator.clipboard.writeText(extractionCode)
      .then(() => {
        showNotification('Kod skopiowany. Otwórz Google Maps, otwórz konsolę (F12) i wklej kod', 'info');
      })
      .catch(() => {
        showNotification('Nie udało się skopiować kodu do schowka', 'error');
      });
  };

  const generateBookmarklet = () => {
    // Generowanie bookmarkleta do dodania do zakładek
    const bookmarkletCode = `javascript:(function(){try{const e=window.APP_INITIALIZATION_STATE?.[3]?.[6]?.[0]?.[1],t=e?.[78],n=e?.[11];if(t){const e=document.createElement("div");e.style.cssText="position:fixed;top:10px;right:10px;background:white;border:1px solid black;padding:10px;z-index:9999;max-width:300px;box-shadow:0 0 10px rgba(0,0,0,0.3);font-family:sans-serif";const o=document.createElement("h3");o.textContent="Google Place ID",o.style.margin="0 0 10px 0",e.appendChild(o);const a=document.createElement("div");a.textContent="Name: "+n,a.style.marginBottom="8px",e.appendChild(a);const l=document.createElement("div");l.textContent="Place ID: "+t,l.style.marginBottom="10px",e.appendChild(l);const c=document.createElement("button");c.textContent="Copy Place ID",c.style.cssText="padding:5px 10px;background:#4CAF50;color:white;border:none;cursor:pointer;",c.onclick=function(){navigator.clipboard.writeText(t).then((function(){c.textContent="Copied!",setTimeout((()=>c.textContent="Copy Place ID"),2e3)}))},e.appendChild(c);const d=document.createElement("button");d.textContent="Request Access",d.style.cssText="padding:5px 10px;background:#2196F3;color:white;border:none;cursor:pointer;margin-left:5px;",d.onclick=function(){window.open("https://business.google.com/arc/p/"+t,"_blank")},e.appendChild(d);const i=document.createElement("button");i.textContent="X",i.style.cssText="position:absolute;top:5px;right:5px;background:none;border:none;font-weight:bold;font-size:16px;cursor:pointer;",i.onclick=function(){document.body.removeChild(e)},e.appendChild(i),document.body.appendChild(e)}else alert("Place ID not found on this page.")}catch(e){alert("Failed to extract Place ID."),console.error(e)}})();`;

    navigator.clipboard.writeText(bookmarkletCode)
      .then(() => {
        showNotification('Bookmarklet skopiowany. Dodaj jako nową zakładkę w przeglądarce', 'success');
      })
      .catch(() => {
        showNotification('Nie udało się skopiować bookmarkleta do schowka', 'error');
      });
  };

  const handlePlaceIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceId(e.target.value);
  };

  const handleGoogleMapUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoogleMapUrl(e.target.value);
  };

  // Funkcja do ekstrakcji Place ID z linku Google Maps
  const extractPlaceIdFromUrl = () => {
    if (!googleMapUrl) {
      showNotification('Wprowadź link do wizytówki Google', 'warning');
      return;
    }

    setIsLoading(true);
    try {
      let placeId = '';
      
      // Próba ekstrakcji Place ID z różnych formatów URL Google Maps
      
      // Format 1: /maps/place/.../@...data=...!4m...!3m...!8m2!...
      const dataParam = googleMapUrl.match(/[!&]data=([^!&]+)/);
      if (dataParam && dataParam[1]) {
        const dataParts = dataParam[1].split('~');
        for (const part of dataParts) {
          if (part.startsWith('1s0x') || part.startsWith('1d0x')) {
            placeId = 'ChIJ' + part.substring(3);
            break;
          }
        }
      }
      
      // Format 2: /maps/place/.../place_id:ChIJ...
      const placeIdParam = googleMapUrl.match(/place_id:([^?&/]+)/);
      if (!placeId && placeIdParam && placeIdParam[1]) {
        placeId = placeIdParam[1];
      }
      
      // Format 3: /@...,...,.../data=!3m1!...!4m...!1s0x...
      const locationParam = googleMapUrl.match(/!1s0x([^!&]+)/);
      if (!placeId && locationParam && locationParam[1]) {
        placeId = 'ChIJ' + locationParam[1];
      }
      
      // Format 4: url zawiera /maps/.../g/...
      const gidParam = googleMapUrl.match(/\/g\/([a-zA-Z0-9_]+)/);
      if (!placeId && gidParam && gidParam[1]) {
        // To jest Google ID (GID) a nie Place ID, więc informujemy o tym
        showNotification('Znaleziono Google ID (GID): ' + gidParam[1] + '. Użyj bookmarkletu na stronie, aby uzyskać Place ID.', 'info');
        setIsLoading(false);
        return;
      }
      
      // Format 5: URL zawiera cid= (identyfikator CID)
      const cidParam = googleMapUrl.match(/[?&]cid=([0-9]+)/);
      if (!placeId && cidParam && cidParam[1]) {
        // To jest Customer ID (CID) a nie Place ID, więc informujemy o tym
        showNotification('Znaleziono Customer ID (CID): ' + cidParam[1] + '. Użyj bookmarkletu na stronie, aby uzyskać Place ID.', 'info');
        setIsLoading(false);
        return;
      }
      
      if (placeId) {
        setPlaceId(placeId);
        setExtractionResult({
          placeId: placeId,
          name: 'Wyodrębnione z URL'
        });
        
        // Automatycznie kopiujemy link do schowka
        const accessLink = `https://business.google.com/arc/p/${placeId}`;
        navigator.clipboard.writeText(accessLink)
          .then(() => {
            showNotification('Znaleziono Place ID i skopiowano link do schowka', 'success');
          });
      } else {
        showNotification('Nie udało się wyodrębnić Place ID z tego linku. Użyj bookmarkletu bezpośrednio na stronie Google Maps.', 'warning');
      }
    } catch (error) {
      console.error('Error extracting Place ID from URL:', error);
      showNotification('Wystąpił błąd podczas przetwarzania linku', 'error');
    }
    
    setIsLoading(false);
  };

  const generateAccessLink = () => {
    if (!placeId) {
      showNotification('Wprowadź Place ID aby wygenerować link', 'warning');
      return;
    }

    setIsLoading(true);

    // Generujemy link dostępowy
    const accessLink = `https://business.google.com/arc/p/${placeId}`;
    
    setExtractionResult({
      placeId: placeId,
      name: 'Custom Place ID'
    });
    
    setIsLoading(false);

    // Automatycznie kopiujemy link do schowka
    navigator.clipboard.writeText(accessLink)
      .then(() => {
        showNotification('Link do żądania dostępu został skopiowany do schowka', 'success');
      })
      .catch(() => {
        showNotification('Nie udało się skopiować linku do schowka', 'error');
      });
  };

  return (
    <div className="w-full">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="bg-white rounded-lg shadow-md p-6 md:p-8"
      >
        {notification && (
          <div className={`mb-4 p-3 rounded-md ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' :
            notification.type === 'error' ? 'bg-red-100 text-red-800' :
            notification.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {notification.message}
          </div>
        )}
        
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Narzędzie do uzyskiwania dostępu do GBP
        </h2>
        
        <p className="text-gray-600 mb-4">
          To narzędzie pomoże Ci uzyskać dostęp do profili Google Business Profile, które nie mają fizycznej lokalizacji i standardowego linku do przejęcia własności.
        </p>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Instrukcja użycia:
          </h3>
          <ul className="space-y-2 list-inside list-decimal text-gray-600">
            <li>Wyszukaj firmę po nazwie lub adresie w polu wyszukiwania poniżej</li>
            <li>Wybierz odpowiedni wynik z listy, aby automatycznie uzyskać Place ID</li>
            <li>Możesz też dodać bookmarklet do przeglądarki, aby wyodrębnić Place ID bezpośrednio ze strony Google Maps</li>
            <li>Alternatywnie, wklej link do Google Maps i wyodrębnij Place ID</li>
            <li>Po uzyskaniu Place ID, kliknij &quot;Otwórz link dostępowy&quot;</li>
          </ul>
          
          <div className="mt-4 space-y-2">
            <button 
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={generateBookmarklet}
            >
              Kopiuj Bookmarklet (GBP Access Helper)
            </button>
            <button 
              className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              onClick={extractPlaceId}
            >
              Kopiuj kod do konsoli przeglądarki
            </button>
          </div>
        </div>

        {/* New Places API search section */}
        <div className="mb-6" ref={searchRef}>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Wyszukaj firmę, aby uzyskać Place ID:
          </h3>
          <div className="relative">
            <input 
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Wpisz nazwę firmy lub adres..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchResults.length > 0) {
                  setShowResults(true);
                }
              }}
            />
            {isSearching && (
              <div className="absolute right-3 top-2.5">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              </div>
            )}
            
            {/* Search results dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {searchResults.map((result, index) => (
                  <div 
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handlePlaceSelect(result)}
                  >
                    <div className="font-medium">{result.name}</div>
                    <div className="text-sm text-gray-600">{result.formatted_address}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {searchQuery.length > 0 && searchResults.length === 0 && !isSearching && (
            <div className="mt-2 text-sm text-gray-500">
              Brak wyników dla &quot;{searchQuery}&quot;. Spróbuj podać dokładniejszą nazwę lub adres.
            </div>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Generowanie linku dostępowego:
          </h3>
          <div className="flex mb-4">
            <input 
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Wklej Place ID" 
              value={placeId}
              onChange={handlePlaceIdChange}
            />
            <button 
              className={`px-4 py-2 font-medium text-white rounded-r-md ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
              onClick={generateAccessLink}
              disabled={isLoading}
            >
              {isLoading ? 'Generowanie...' : 'Generuj link'}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Ekstrakcja Place ID z URL Google Maps:
          </h3>
          <div className="flex mb-4">
            <input 
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Wklej URL Google Maps" 
              value={googleMapUrl}
              onChange={handleGoogleMapUrlChange}
            />
            <button 
              className={`px-4 py-2 font-medium text-white rounded-r-md ${isLoading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'} transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50`}
              onClick={extractPlaceIdFromUrl}
              disabled={isLoading}
            >
              {isLoading ? 'Ekstrakcja...' : 'Ekstrahuj Place ID'}
            </button>
          </div>
        </div>

        {extractionResult && (
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Wynik:
            </h3>
            <p className="mb-2"><strong>Nazwa:</strong> {extractionResult.name}</p>
            <p className="mb-2"><strong>Place ID:</strong> {extractionResult.placeId}</p>
            <p className="mb-2"><strong>Link dostępowy:</strong></p>
            <pre className="p-2 mb-3 bg-gray-100 border border-gray-200 rounded-md text-sm overflow-x-auto">
              https://business.google.com/arc/p/{extractionResult.placeId}
            </pre>
            <button 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => window.open(`https://business.google.com/arc/p/${extractionResult.placeId}`, '_blank')}
            >
              Otwórz link dostępowy
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
