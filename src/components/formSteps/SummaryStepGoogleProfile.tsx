"use client";

import React from "react";
// import the version string, not the page component
import { REGULAMIN_VERSION } from "@/app/constants/regulamin-version";
import Image from "next/image";

interface CompanyData {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  nip: string;
  phone: string;
  url: string;
  street: string;
  city: string;
  zip: string;
  different_payer: boolean;
  id?: number;
}

interface GmbProfile {
  companyName: string;
  nip: string;
  url: string;
  // Dodatkowe pola z PlaceDetails
  address?: string;
  phoneNumber?: string;
  website?: string;
  photos?: string[];
  rating?: number;
  businessStatus?: string;
  types?: string[];
}

interface PayerData {
  name: string;
  company_name?: string;
  email: string;
  nip?: string;
  street: string;
  zip: string;
  city: string;
}

interface SummaryStepGoogleProfileProps {
  company: CompanyData;
  profiles: GmbProfile[]; // Zamieniamy reviews na profiles
  totalPrice: number;
  isLoading: boolean;
  onBack: () => void;
  onConfirm: () => void;
  payer?: PayerData;    
  payer_id?: string;
}

// Renderowanie gwiazdek oceny
const renderStarRating = (rating?: number) => {
  if (!rating) return null;
  
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  const starColor = rating < 4.0 ? "text-red-600" : "text-[#5BA155]";
  
  return (
    <div className="flex items-center mt-1">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className={`w-4 h-4 ${starColor}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      {halfStar && (
        <svg className={`w-4 h-4 ${starColor}`} fill="currentColor" viewBox="0 0 20 20">
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
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      <span className={`ml-1 text-gray-600 text-xs ${rating < 4.0 ? 'text-red-600 font-medium' : 'text-gray-600'}`}>({rating.toFixed(1)})</span>
    </div>
  );
};

export default function SummaryStepGoogleProfile({
  company,
  profiles,
  totalPrice,
  isLoading,
  onBack,
  onConfirm,
  payer,
}: SummaryStepGoogleProfileProps) {
  const [regulaminAccepted, setRegulaminAccepted] = React.useState(false);
  const handleConfirm = () => {
    // Sprawdź, czy istnieje przynajmniej jeden wybrany profil
    if (!profiles || profiles.length === 0 || !profiles.some(p => p.companyName && p.url)) {
      alert('Nie wybrano żadnego profilu do usunięcia.');
      return;
    }
    
    if (regulaminAccepted && typeof onConfirm === "function") {
      // Zapisz akceptację regulaminu tylko lokalnie - reszta będzie obsłużona w confirmAndSave
      localStorage.setItem('regulamin_accepted', 'true');
      localStorage.setItem('regulamin_version', REGULAMIN_VERSION);
      localStorage.setItem('regulamin_accepted_date', new Date().toISOString());
      
      // Wywołaj funkcję onConfirm, która wywoła confirmAndSave
      onConfirm();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-center mb-4">
        Sprawdź i wyślij
      </h2>
      
      <div className="bg-[#F9FAFB] p-3 rounded-lg">
        <h3 className="text-sm font-semibold text-[#0D2959] mb-2">Dane zamawiającego:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
          <div className="flex justify-between md:block">
            <span className="font-medium">Firma:</span>
            <span className="md:block">{company.name}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="font-medium">Kontakt:</span>
            <span className="md:block">{company.first_name} {company.last_name}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="font-medium">Email:</span>
            <span className="md:block truncate">{company.email}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="font-medium">Telefon:</span>
            <span className="md:block">{company.phone}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="font-medium">Adres:</span>
            <span className="md:block">{company.street}, {company.zip} {company.city}</span>
          </div>
          <div className="flex justify-between md:block">
            <span className="font-medium">NIP:</span>
            <span className="md:block">{company.nip}</span>
          </div>
        </div>
      </div>

      {payer && (
        <div className="bg-[#F9FAFB] p-3 rounded-lg">
          <h3 className="text-sm font-semibold text-[#0D2959] mb-2">Dane płatnika:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-700">
            <div className="flex justify-between md:block">
              <span className="font-medium">Nazwa:</span>
              <span className="md:block">{payer.company_name || payer.name}</span>
            </div>
            <div className="flex justify-between md:block">
              <span className="font-medium">Email:</span>
              <span className="md:block truncate">{payer.email}</span>
            </div>
            {payer.nip && (
              <div className="flex justify-between md:block">
                <span className="font-medium">NIP:</span>
                <span className="md:block">{payer.nip}</span>
              </div>
            )}
            <div className="flex justify-between md:block">
              <span className="font-medium">Adres:</span>
              <span className="md:block">{payer.street}, {payer.zip} {payer.city}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-[#0D2959] mb-2">
          Wizytówki Google do usunięcia ({profiles.length}):
        </h3>
        
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 mb-3"
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-start">
                {/* Miniatura obok nazwy */}
                {profile.photos && profile.photos.length > 0 ? (
                  <div className="h-12 w-12 rounded-lg overflow-hidden shadow-sm mr-3 flex-shrink-0">
                    <Image 
                      src={profile.photos[0]} 
                      alt={`${profile.companyName}`}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="h-12 w-12 rounded-lg overflow-hidden shadow-sm mr-3 flex-shrink-0 bg-gray-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div>
                  <h4 className="text-base font-medium text-gray-900">{profile.companyName}</h4>
                  {profile.rating && renderStarRating(profile.rating)}
                </div>
              </div>
              <div className="text-xs px-2 py-1 bg-[#5DA157]/10 text-[#5DA157] rounded-full hidden md:block">
                Google
              </div>
            </div>
            
            <div className="space-y-1 text-xs">
              {profile.address && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 truncate">{profile.address}</span>
                </div>
              )}
              
              {profile.phoneNumber && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-gray-700">{profile.phoneNumber}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                <a href={profile.url} className="text-[#0D2959] hover:text-[#0a1f40] truncate" target="_blank" rel="noopener noreferrer">
                  Zobacz wizytówkę
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>      <div className="bg-[#F9FAFB] p-3 rounded-lg text-center">
        <div className="text-gray-800 font-bold">
          <span className="text-xs text-gray-600">Cena łączna:</span>
          <div className="text-lg text-[#0D2959]">{totalPrice} zł brutto</div>
          <div className="text-xs text-gray-500">(zawiera VAT 23%)</div>
        </div>
      </div>

      {(!profiles || profiles.length === 0 || !profiles.some(p => p.companyName && p.url)) && (
        <div className="p-3 bg-red-50 rounded-lg text-center">
          <p className="text-red-600 text-sm">
            Nie wybrano żadnego profilu do usunięcia. Wróć do pierwszego kroku, aby wybrać profil.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-4">
        <label className="flex items-center text-sm gap-2 mb-2">
          <input
            type="checkbox"
            checked={regulaminAccepted}
            onChange={e => setRegulaminAccepted(e.target.checked)}
            className="accent-[#0D2959]"
          />
           <span>
            Akceptuję
            <a
              href="/regulamin"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#0D2959] ml-1"
            >
              regulamin świadczenia usług
            </a>
          </span>
        </label>
        <div className="flex justify-between gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3  text-gray-700  hover:bg-gray-100 rounded-xl transition text-sm"
          >
            ← Wróć
          </button>
          <button
            id="confirmButtonSendOrder"
            onClick={handleConfirm}
            disabled={isLoading || !regulaminAccepted || !profiles || profiles.length === 0 || !profiles.some(p => p.companyName && p.url)}
            className={`px-6 py-3 rounded text-sm flex items-center justify-center gap-2 
              ${isLoading || !regulaminAccepted || !profiles || profiles.length === 0 || !profiles.some(p => p.companyName && p.url) 
                ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                : "bg-[#0D2959] hover:bg-[#001e47] text-white"}
            `}
          >
            {isLoading ? "Przetwarzanie..." : "Wyślij zlecenie"}
          </button>
        </div>
      </div>
    </div>
  );
}
