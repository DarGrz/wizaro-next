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
  
  return (
    <div className="flex items-center mt-1">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-[#5DA157]" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      {halfStar && (
        <svg className="w-4 h-4 text-[#5DA157]" fill="currentColor" viewBox="0 0 20 20">
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
      
      <span className="ml-1 text-gray-600 text-xs">({rating.toFixed(1)})</span>
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
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Podsumowanie
      </h2>      <div className="bg-[#F9FAFB] p-5 rounded-lg mb-6">
        <h3 className="text-md font-semibold text-[#0D2959] mb-3">Dane zamawiającego:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
          <div>
            <div className="font-medium">Firma:</div>
            <div>{company.name}</div>
          </div>
          <div>
            <div className="font-medium">Imię i nazwisko:</div>
            <div>{company.first_name} {company.last_name}</div>
          </div>
          <div>
            <div className="font-medium">Email:</div>
            <div>{company.email}</div>
          </div>
          <div>
            <div className="font-medium">Telefon:</div>
            <div>{company.phone}</div>
          </div>
          <div>
            <div className="font-medium">Adres:</div>
            <div>{company.street}, {company.zip} {company.city}</div>
          </div>
          <div>
            <div className="font-medium">NIP:</div>
            <div>{company.nip}</div>
          </div>
        </div>
      </div>

      {payer && (        <div className="bg-[#F9FAFB] p-5 rounded-lg mb-6">
          <h3 className="text-md font-semibold text-[#0D2959] mb-3">Dane płatnika:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
            <div>
              <div className="font-medium">Nazwa:</div>
              <div>{payer.company_name || payer.name}</div>
            </div>
            <div>
              <div className="font-medium">Email:</div>
              <div>{payer.email}</div>
            </div>
            {payer.nip && (
              <div>
                <div className="font-medium">NIP:</div>
                <div>{payer.nip}</div>
              </div>
            )}
            <div>
              <div className="font-medium">Adres:</div>
              <div>{payer.street}, {payer.zip} {payer.city}</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-2 mb-4">
        <h3 className="text-md font-semibold text-[#0D2959] mb-2">
          Wizytówki Google do usunięcia ({profiles.length}):
        </h3>
        
        {profiles.map((profile, index) => (          <div
            key={index}
            className="rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 mb-4"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-start">
                {/* Miniatura obok nazwy */}
                {profile.photos && profile.photos.length > 0 ? (
                  <div className="h-16 w-16 rounded-lg overflow-hidden shadow-sm mr-3 flex-shrink-0">
                    <Image 
                      src={profile.photos[0]} 
                      alt={`${profile.companyName}`}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-lg overflow-hidden shadow-sm mr-3 flex-shrink-0 bg-gray-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{profile.companyName}</h4>
                  {profile.rating && renderStarRating(profile.rating)}
                </div>
              </div>
              <div className="text-xs px-2 py-1 bg-[#5DA157]/10 text-[#5DA157] rounded-full">
                Wizytówka Google
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              {profile.address && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{profile.address}</span>
                </div>
              )}
              
              {profile.phoneNumber && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-gray-700">{profile.phoneNumber}</span>
                </div>
              )}
              
              {profile.website && (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                  </svg>
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-[#0D2959] hover:text-[#0a1f40] truncate">
                    {profile.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  </a>
                </div>
              )}
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                </svg>
                <a href={profile.url} className="text-[#0D2959] hover:text-[#0a1f40] truncate" target="_blank" rel="noopener noreferrer">
                  Link do wizytówki Google
                </a>
              </div>
            </div>
              {/* Dodatkowe zdjęcia (bez pierwszego, które już jest pokazane jako miniatura) */}
            {profile.photos && profile.photos.length > 1 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {profile.photos.slice(1, 4).map((photoUrl, i) => (
                    <div key={i} className="h-12 w-12 rounded overflow-hidden shadow-sm">
                      <Image 
                        src={photoUrl} 
                        alt={`${profile.companyName} - zdjęcie ${i+2}`}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ))}
                  {profile.photos.length > 4 && (
                    <div className="h-12 w-12 rounded overflow-hidden shadow-sm bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                      +{profile.photos.length - 4}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}      </div>      <div className="my-6 bg-[#F9FAFB] p-5 rounded-lg text-center">
        <div className="text-gray-800 font-bold">
          <span className="text-sm text-gray-600">Cena łączna:</span>
          <div className="text-xl text-[#0D2959]">{totalPrice} zł brutto</div>
          <div className="text-xs text-gray-500 mt-1">(zawiera VAT 23%)</div>
        </div>
      </div>
        {(!profiles || profiles.length === 0 || !profiles.some(p => p.companyName && p.url)) && (
        <div className="my-4 p-4 bg-red-50 rounded-lg text-center">
          <p className="text-red-600 text-sm">
            Nie wybrano żadnego profilu do usunięcia. Wróć do pierwszego kroku, aby wybrać profil.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-8">
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
        <div className="flex justify-between gap-4">          <button
            onClick={onBack}
            className="px-6 py-3 rounded text-gray-700 bg-gray-100 hover:bg-gray-200 transition text-sm"
          >
            ← Wróć
          </button><button
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
