"use client";

import React from "react";
// import the version string, not the page component
import { REGULAMIN_VERSION } from "@/app/constants/regulamin-version";

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
  id?: number; // Dodane ID firmy
}

interface Review {
  author: string;
  content: string;
  url: string;
  date_added: string;
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

interface SummaryStepProps {
  company: CompanyData;
  reviews: Review[];
  totalPrice: number;
  isLoading: boolean;
  onBack: () => void;
  onConfirm: () => void;
  payer?: PayerData;    
  payer_id?: string;
  links?: string[];
}

export default function SummaryStep({
  company,
  reviews,
  totalPrice,
  isLoading,
  onBack,
  onConfirm,
}: SummaryStepProps) {
  const [regulaminAccepted, setRegulaminAccepted] = React.useState(false);

  const handleConfirm = () => {
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
        Sprawdź i wyślij
      </h2>

      <ul className="text-sm md:text-md text-gray-700 space-y-2 leading-relaxed">
        <li>
          <strong>Firma:</strong> {company.name}
        </li>
        <li>
          <strong>Imię i nazwisko:</strong> {company.first_name} {company.last_name}
        </li>
        <li>
          <strong>Email:</strong> {company.email}
        </li>
        <li>
          <strong>Telefon:</strong> {company.phone}
        </li>
        <li>
          <strong>Adres:</strong> {company.street}, {company.zip} {company.city}
        </li>
        <li className="border-b border-gray-200 pb-5">
          <strong>NIP:</strong> {company.nip}
        </li>
        <li>
          <strong>Ilość profili:</strong> {reviews.length}
        </li>
      </ul>

      {reviews && reviews.length > 0 && (
  <div className="space-y-4">
    <h3 className="text-md text-gray-700 font-semibold space-y-2 leading-relaxed">Profile do usunięcia:</h3>
    {reviews.map((review, index) => (
      <div
        key={index}
        className="border text-sm md:text-md border-gray-200 rounded-lg p-4 bg-gray-50"
      >
        <p><strong>Firma:</strong> {review.author}</p>
        <p><strong>NIP:</strong> {review.content.replace("NIP: ", "")}</p>
        <p><strong>Link:</strong> <a href={review.url} className="" target="_blank">{review.url}</a></p>
        <p><strong>Data dodania:</strong> {review.date_added}</p>
      </div>
    ))}
  </div>
)}

      <div className="my-6 text-center">
        <div className="text-gray-800 text-md font-bold py-3 border-t border-b border-gray-200">
          <strong>Cena:</strong> {totalPrice} zł brutto (z VAT 23%)
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-8">
        <label className="flex items-center text-sm gap-2 mb-2">
          <input
            type="checkbox"
            checked={regulaminAccepted}
            onChange={e => setRegulaminAccepted(e.target.checked)}
            className="accent-[#002a5c]"
          />
           <span>
            Akceptuję
            <a
              href="/regulamin"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-700 ml-1"
            >
              regulamin swiadczenia usług
            </a>
          </span>
        </label>
        <div className="flex justify-between gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition text-sm"
          >
            ← Wróć
          </button>
          <button
            id="confirmButtonSendOrder"
            onClick={handleConfirm}
            disabled={isLoading || !regulaminAccepted}
            className={`px-6 py-3 rounded text-sm flex items-center justify-center gap-2 
              ${isLoading || !regulaminAccepted ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#002a5c] hover:bg-[#001e47] text-white"}
            `}
          >
            {isLoading ? "Przetwarzanie..." : "Przejdź do płatności →"}
          </button>
        </div>
      </div>
    </div>
  );
}