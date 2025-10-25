"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PaymentSectionProps {
  orderId?: string;
  amount?: number;
  description?: string;
}

export default function PaymentSection({ 
  orderId, 
  amount = 299, 
  description = "Zapłać za swoją usługę" 
}: PaymentSectionProps) {
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
    console.log('🔍 PaymentSection useEffect - sprawdzanie localStorage...');
    console.log('🔧 Ścieżka strony:', window.location.pathname);
    
    // Użyj dokładnie tej samej logiki co w formularzach
    // Sprawdź dane z formularzy profil-bazy (dziekuje)
    const companyFormRemovalData = localStorage.getItem("companyFormRemovalData");
    
    // Sprawdź dane z formularzy Google (thankyou) 
    const companyFormData = localStorage.getItem("companyFormData");
    
    console.log('🏢 Surowe dane z localStorage:', {
      companyFormRemovalData: companyFormRemovalData ? 'ZNALEZIONO' : 'BRAK',
      companyFormData: companyFormData ? 'ZNALEZIONO' : 'BRAK'
    });
    
    let company = null;
    // const payer = null; // Nie używamy na razie
    
    // Użyj tej samej logiki co w summary step
    if (companyFormRemovalData) {
      try {
        company = JSON.parse(companyFormRemovalData);
        console.log('✅ Wczytano dane firmy z companyFormRemovalData:', company);
      } catch (error) {
        console.error('❌ Błąd parsowania companyFormRemovalData:', error);
      }
    } else if (companyFormData) {
      try {
        company = JSON.parse(companyFormData);
        console.log('✅ Wczytano dane firmy z companyFormData:', company);
      } catch (error) {
        console.error('❌ Błąd parsowania companyFormData:', error);
      }
    }
    
    // Wypełnij pola dokładnie tak samo jak w summary step
    if (company) {
      console.log('🎯 Wypełniam pola danymi firmy (tak samo jak summary step)...');
      
      // Sprawdź czy ma different_payer (w takim przypadku payer może być inny)
      // Ale do faktury zawsze używamy danych company, chyba że payer jest zdefiniowany
      let finalData = company;
      
      if (company.different_payer) {
        console.log('Firma ma different_payer=true');
        // Gdyby payer był zapisany, użylibyśmy jego danych do faktury
        // Ale na razie używamy company
        finalData = company;
      }
      
      // Wypełnij dokładnie te same pola co wyświetla summary step
      setEmail(finalData.email || '');
      setCompanyName(finalData.name || '');
      setNip(finalData.nip || '');
      setAddress(finalData.street || '');
      setCity(finalData.city || '');
      setZipCode(finalData.zip || '');
      setDataAutoFilled(true);
      
      console.log('✅ Pola wypełnione danymi:', {
        email: finalData.email,
        name: finalData.name,
        nip: finalData.nip,
        street: finalData.street,
        city: finalData.city,
        zip: finalData.zip
      });
    } else {
      console.log('⚠️ Brak danych firmy w localStorage');
      
      // Fallback do starych pojedynczych kluczy
      const savedEmail = localStorage.getItem('userEmail');
      const savedCompanyName = localStorage.getItem('companyName');
      const savedNip = localStorage.getItem('companyNip');
      const savedAddress = localStorage.getItem('companyAddress');
      const savedCity = localStorage.getItem('companyCity');
      const savedZipCode = localStorage.getItem('companyZipCode');
      
      if (savedEmail) setEmail(savedEmail);
      if (savedCompanyName) setCompanyName(savedCompanyName);
      if (savedNip) setNip(savedNip);
      if (savedAddress) setAddress(savedAddress);
      if (savedCity) setCity(savedCity);
      if (savedZipCode) setZipCode(savedZipCode);
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
      // Zapisz dane w localStorage
      localStorage.setItem('userEmail', email);
      localStorage.setItem('companyName', companyName);
      localStorage.setItem('companyNip', nip);
      localStorage.setItem('companyAddress', address);
      localStorage.setItem('companyCity', city);
      localStorage.setItem('companyZipCode', zipCode);

      // Określ stronę powrotu na podstawie aktualnego URL
      const currentPath = window.location.pathname;
      const returnPage = currentPath.includes('/dziekuje') ? 'dziekuje' : 'thankyou';

      const amountInCents = Math.round(amount * 100); // Upewnij się że to liczba całkowita

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
          returnPage: returnPage
        })
      });

      if (!response.ok) {
        throw new Error('Błąd podczas tworzenia płatności');
      }

      const { url } = await response.json();
      
      // Wyczyść dane z localStorage po udanej płatności (wszystkie kopie danych)
      localStorage.removeItem('userEmail');
      localStorage.removeItem('companyFormRemovalData'); // dane z formularzy profil-bazy
      localStorage.removeItem('companyFormData'); // dane z formularzy Google
      
      // Wyczyść także pojedyncze klucze (jeśli istnieją)
      localStorage.removeItem('companyName');
      localStorage.removeItem('companyNip');
      localStorage.removeItem('companyAddress');
      localStorage.removeItem('companyCity');
      localStorage.removeItem('companyZipCode');
      
      console.log('🧹 Wyczyszczono dane z localStorage po przekierowaniu na płatność');
      
      window.location.href = url;
      
    } catch (error) {
      console.error('Błąd płatności:', error);
      alert('Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="md:bg-gradient-to-r md:from-blue-50 md:to-green-50 md:border md:border-blue-200 md:rounded-xl md:shadow-sm p-2 md:p-6 max-w-xl w-full"
    >
      <div className="text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            💳 Zapłać od razu i miej to z głowy!
          </h3>
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 mb-4 border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Kwota do zapłaty:</span>
            <span className="text-2xl font-bold text-[#002a5c]">{amount} zł</span>
          </div>
          <div className="text-xs text-gray-500">
            Cena zawiera VAT 23%
          </div>
        </div>

        <form onSubmit={handleFormSubmit} className="mb-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Dane do faktury VAT:</h4>
            
            {dataAutoFilled && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <svg className="h-4 w-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-green-800">
                    Dane firmy zostały automatycznie wypełnione na podstawie wcześniej wprowadzonych informacji.
                  </span>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adres email *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twoj@email.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nazwa firmy *
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Nazwa Twojej firmy"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                NIP
              </label>
              <input
                type="text"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                placeholder="1234567890"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adres
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="ul. Przykładowa 123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kod pocztowy
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="00-000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Miasto
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Warszawa"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  isLoading
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#002a5c] hover:bg-[#001e47] text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                      />
                    </svg>
                    Przetwarzanie...
                  </div>
                ) : (
                  "Przejdź do płatności"
                )}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm text-green-800">
            <strong>✅ Korzyści natychmiastowej płatności:</strong>
            <ul className="text-left text-xs mt-2 space-y-1">
              <li>• Priorytetowe wykonanie zlecenia</li>
              <li>• Bezpieczna szybka płatność</li>
              <li>• Szybsze informacje o postępach prac</li>
              <li>• Czas realizacji skrócony o ponad 50%</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}