"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

function ZaplacContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') ? parseInt(searchParams.get('amount')!) : 0;
  const description = searchParams.get('description') || "Płatność za usługę Wizaro.pl";
  const orderId = searchParams.get('orderId') || undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [nip, setNip] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [dataAutoFilled, setDataAutoFilled] = useState(false);

  // Wczytaj dane z localStorage przy ładowaniu komponentu
  useEffect(() => {
    console.log('🔍 ZaplacPage useEffect - sprawdzanie localStorage...');
    
    const companyFormRemovalData = localStorage.getItem("companyFormRemovalData");
    const companyFormData = localStorage.getItem("companyFormData");
    
    console.log('🏢 Surowe dane z localStorage:', {
      companyFormRemovalData: companyFormRemovalData ? 'ZNALEZIONO' : 'BRAK',
      companyFormData: companyFormData ? 'ZNALEZIONO' : 'BRAK'
    });
    
    let company = null;
    
    if (companyFormRemovalData) {
      try {
        const parsedData = JSON.parse(companyFormRemovalData);
        if (parsedData.company) {
          company = parsedData.company;
          console.log('✅ Wczytano dane firmy z companyFormRemovalData (nowa struktura z company):', company);
        } else {
          company = parsedData;
          console.log('✅ Wczytano dane firmy z companyFormRemovalData (stara struktura):', company);
        }
      } catch (error) {
        console.error('❌ Błąd parsowania companyFormRemovalData:', error);
      }
    } else if (companyFormData) {
      try {
        const parsedData = JSON.parse(companyFormData);
        if (parsedData.company) {
          company = parsedData.company;
          console.log('✅ Wczytano dane firmy z companyFormData (nowa struktura z company):', company);
        } else {
          company = parsedData;
          console.log('✅ Wczytano dane firmy z companyFormData (stara struktura):', company);
        }
      } catch (error) {
        console.error('❌ Błąd parsowania companyFormData:', error);
      }
    }
    
    if (company) {
      console.log('🎯 Wypełniam pola danymi firmy...');
      setEmail(company.email || '');
      setCompanyName(company.name || '');
      setNip(company.nip || '');
      setAddress(company.street || '');
      setCity(company.city || '');
      setZipCode(company.zip || '');
      setDataAutoFilled(true);
      
      console.log('✅ Pola wypełnione danymi:', {
        email: company.email,
        name: company.name,
        nip: company.nip,
        street: company.street,
        city: company.city,
        zip: company.zip
      });
    } else {
      console.log('⚠️ Brak danych firmy w localStorage');
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes('@')) {
      alert('Podaj prawidłowy adres email');
      return;
    }

    if (!companyName.trim()) {
      alert('Podaj nazwę firmy');
      return;
    }

    setIsLoading(true);
    
    try {
      // Zapisz dane w localStorage dla przyszłego użycia
      localStorage.setItem('userEmail', email);
      localStorage.setItem('companyName', companyName);
      localStorage.setItem('companyNip', nip);
      localStorage.setItem('companyAddress', address);
      localStorage.setItem('companyCity', city);
      localStorage.setItem('companyZipCode', zipCode);

      const amountInCents = Math.round(amount * 100);

      const response = await fetch('/api/payments/create-quick-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderId, 
          amount: amountInCents,
          email: email,
          companyName: companyName,
          nip: nip,
          address: address,
          city: city,
          zipCode: zipCode,
          description: description,
          returnPage: 'zaplac'
        })
      });

      if (!response.ok) {
        throw new Error('Błąd podczas tworzenia płatności');
      }

      const { url } = await response.json();
      window.location.href = url;
      
    } catch (error) {
      console.error('Błąd płatności:', error);
      alert('Wystąpił błąd podczas tworzenia płatności. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  if (amount === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Brak danych płatności</h1>
          <p className="text-gray-600 mb-6">
            Nie znaleziono informacji o płatności. Wróć do formularza, aby rozpocząć proces.
          </p>
          <Link 
            href="/formularz-profil-google" 
            className="inline-block bg-[#002a5c] text-white py-3 px-6 rounded-lg hover:bg-[#001e47] transition"
          >
            Wróć do formularza
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#002a5c] mb-4">Płatność za usługę</h1>
          <p className="text-gray-600">
            Dokończ płatność, aby rozpocząć realizację zlecenia
          </p>
        </div>

        {/* Podsumowanie zamówienia */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">Podsumowanie zamówienia</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">{description}</span>
          </div>
          <div className="border-t border-blue-200 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-900">Do zapłaty:</span>
              <span className="text-2xl font-bold text-blue-900">{amount} zł</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">(zawiera VAT 23%)</p>
          </div>
        </div>

        {/* Formularz danych do faktury */}
        <form onSubmit={handleFormSubmit} className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Dane do faktury</h2>
          
          {dataAutoFilled && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-green-700">
                ✅ Dane zostały automatycznie uzupełnione z formularza. Możesz je edytować jeśli potrzebujesz.
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Adres email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="twoj@email.pl"
              />
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Nazwa firmy <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nazwa Twojej firmy"
              />
            </div>

            <div>
              <label htmlFor="nip" className="block text-sm font-medium text-gray-700 mb-1">
                NIP
              </label>
              <input
                type="text"
                id="nip"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="1234567890"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Ulica i numer
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ul. Przykładowa 1"
                />
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Kod pocztowy
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="00-000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                Miasto
              </label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Warszawa"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-lg text-lg font-bold transition duration-200 shadow-lg hover:shadow-xl ${
                isLoading 
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                  : 'bg-[#002a5c] text-white hover:bg-[#001e47]'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Przetwarzanie...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  💳 Zapłać {amount} zł
                </span>
              )}
            </button>
          </div>

          {/* Informacja o bezpieczeństwie */}
          <div className="mt-4 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Bezpieczna płatność przez Stripe
            </div>
          </div>
        </form>

        {/* Korzyści */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Dlaczego warto zapłacić teraz?</h3>
          <ul className="space-y-2 text-green-700">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Natychmiastowe rozpoczęcie realizacji
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Priorytetowe traktowanie zlecenia
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Szybsze efekty i rezultaty
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              100% gwarancja satysfakcji
            </li>
          </ul>
        </div>

        {/* Link do powrotu */}
        <div className="mt-6 text-center">
          <Link 
            href="/formularz-profil-google" 
            className="text-gray-600 hover:text-gray-800 text-sm underline"
          >
            ← Wróć do formularza
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function ZaplacPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002a5c]"></div>
      </div>
    }>
      <ZaplacContent />
    </Suspense>
  );
}
