"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import SocialProof from "./SocialProof";
import RODOWhyChooseUs from "./RODOWhyChooseUs";
import GuaranteeSectionPayment from "./GuaranteeSectionPayment";
import { useGUS } from "@/hooks/useGUS";

interface CompanyData {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  nip: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  link: string;
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

export default function CompanyRODOForm() {
  const defaultCompany: CompanyData = {
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    nip: "",
    phone: "",
    street: "",
    city: "",
    zip: "",
    link: "",
  };

  const [company, setCompany] = useState<CompanyData>(defaultCompany);
  const [step, setStep] = useState<"nip-verification" | "form" | "summary">("nip-verification");
  const [isLoading, setIsLoading] = useState(false);
  const [zipError, setZipError] = useState(false);

  // Hook GUS
  const { data: gusData, loading: gusLoading, error: gusError, searchByNIP, reset: resetGUS } = useGUS();
  
  // Stan dla kroku weryfikacji NIP
  const [nipInput, setNipInput] = useState<string>("");
  const [validatedNIP, setValidatedNIP] = useState<boolean>(false);
  const [lastSearchedNIP, setLastSearchedNIP] = useState<string>("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("companyRODOFormData");
    if (saved) setCompany(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("companyRODOFormData", JSON.stringify(company));
  }, [company]);

  useEffect(() => {
    const cleanup = () => {
      localStorage.removeItem("companyRODOFormData");
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
    window.addEventListener("beforeunload", cleanup);
    return () => {
      window.removeEventListener("beforeunload", cleanup);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Automatyczne wypełnienie danych z GUS po otrzymaniu danych
  useEffect(() => {
    console.log('📥 GUS Data useEffect triggered:', { gusData });
    if (gusData) {
      setCompany(prev => ({
        ...prev,
        name: gusData.name || prev.name,
        nip: gusData.nip || prev.nip,
        street: gusData.street || prev.street,
        city: gusData.city || prev.city,
        zip: gusData.zip || prev.zip,
      }));
      setValidatedNIP(true);
    }
  }, [gusData]);

  // Obsługa weryfikacji NIP
  const handleNIPVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatedNIP && gusData) {
      setStep("form");
    }
  };

  // Obsługa zmiany NIP w kroku weryfikacji
  const handleNIPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    console.log('🔍 NIP Change:', { value, lastSearchedNIP, gusLoading });
    
    setNipInput(value);
    setValidatedNIP(false);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Reset GUS data only if value is different from last searched
    if (value !== lastSearchedNIP) {
      resetGUS();
    }
    
    // Debounce search - wait 500ms after user stops typing
    if (value.length >= 10 && value !== lastSearchedNIP) {
      searchTimeoutRef.current = setTimeout(() => {
        if (!gusLoading) {
          console.log('🚀 Starting GUS search for:', value);
          setLastSearchedNIP(value);
          searchByNIP(value);
        }
      }, 500);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'zip') {
      const zipRegex = /^\d{2}-\d{3}$/;
      setZipError(!zipRegex.test(value));
    }

    setCompany({ ...company, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const zipRegex = /^\d{2}-\d{3}$/;
    if (!zipRegex.test(company.zip)) {
      setZipError(true);
      return;
    }
    setStep("summary");
  };

  const confirmAndPay = async () => {
    setIsLoading(true);
    try {
      // Zapisz dane firmy (z linkiem jako url)
      const companyRes = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...company,
          url: company.link, // Zapisz link jako url w bazie
        }),
      });

      if (!companyRes.ok) throw new Error('Błąd zapisu firmy');
      const companyData = await companyRes.json();

      // Utwórz dokument RODO
      const docRes = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_id: companyData.id,
          type: 'wniosek rodo',
        }),
      });

      if (!docRes.ok) throw new Error('Błąd tworzenia dokumentu');
      const docData = await docRes.json();

      // Utwórz płatność Stripe
      const paymentRes = await fetch('/api/payments/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_id: docData.id,
          email: company.email,
          name: `${company.first_name} ${company.last_name}`,
          company_name: company.name,
          nip: company.nip,
          street: company.street,
          zip: company.zip,
          city: company.city,
        }),
      });

      if (!paymentRes.ok) throw new Error('Błąd tworzenia płatności');
      const payment = await paymentRes.json();

      // Przekieruj do Stripe
      window.location.href = payment.url;
    } catch (error) {
      console.error('❌ Błąd formularza RODO:', error);
      alert('Wystąpił problem podczas przetwarzania. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="md:flex px-2 md:px-4 py-10 md:gap-8" variants={fadeInUp}>
        <motion.div className="md:w-1/2 mb-10 md:mb-0" variants={fadeInUp}>
          <div className="bg-white rounded-xl shadow-sm md:shadow-lg md:p-8 p-4 w-full space-y-6">
            {step === "nip-verification" && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Weryfikacja firmy
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Podaj NIP swojej firmy, aby automatycznie pobrać dane z rejestru GUS
                  </p>
                </div>

                <form onSubmit={handleNIPVerification} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NIP firmy *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Wpisz NIP firmy (10 cyfr)"
                        value={nipInput}
                        onChange={handleNIPChange}
                        maxLength={10}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#002a5c] focus:border-transparent text-lg tracking-wider"
                      />
                      {gusLoading && (
                        <div className="absolute right-3 top-2.5">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#002a5c]"></div>
                        </div>
                      )}
                    </div>
                    
                    {gusError && (
                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm">{gusError}</p>
                      </div>
                    )}
                    
                    {gusData && validatedNIP && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-700 text-sm font-medium mb-2">✓ Znaleziono firmę:</p>
                        <div className="text-sm text-green-600 space-y-1">
                          <p><strong>Nazwa:</strong> {gusData.name}</p>
                          <p><strong>Adres:</strong> {gusData.street}, {gusData.zip} {gusData.city}</p>
                          <p><strong>NIP:</strong> {gusData.nip}</p>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 mt-2">
                      Po wprowadzeniu prawidłowego NIP automatycznie pobierzemy dane Twojej firmy z bazy GUS
                    </p>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      disabled={!validatedNIP || !gusData}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        validatedNIP && gusData
                          ? 'bg-[#002a5c] text-white hover:bg-[#001e47]'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {validatedNIP && gusData ? 'Przejdź dalej' : 'Wprowadź prawidłowy NIP'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === "form" && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Wniosek RODO - Usunięcie danych osobowych
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Wypełnij formularz, aby przygotować profesjonalny wniosek o usunięcie Twoich danych osobowych
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nazwa firmy *
                    </label>
                    <input
                      name="name"
                      placeholder="Nazwa firmy zostanie uzupełniona automatycznie"
                      value={company.name}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#002a5c] focus:border-transparent bg-gray-50"
                      readOnly
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Imię *
                      </label>
                      <input
                        name="first_name"
                        placeholder="Wpisz imię"
                        value={company.first_name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nazwisko *
                      </label>
                      <input
                        name="last_name"
                        placeholder="Wpisz nazwisko"
                        value={company.last_name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon *
                    </label>
                    <input
                      name="phone"
                      placeholder="Wpisz numer telefonu"
                      value={company.phone}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Wpisz adres email"
                      value={company.email}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ulica i numer *
                    </label>
                    <input
                      name="street"
                      placeholder="Wpisz adres"
                      value={company.street}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Kod pocztowy *
                      </label>
                      <input
                        name="zip"
                        placeholder="np. 12-345"
                        value={company.zip}
                        onChange={handleChange}
                        required
                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#002a5c] focus:border-transparent ${
                          zipError ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {zipError && (
                        <p className="text-red-500 text-sm mt-1">
                          Niepoprawny format kodu pocztowego
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Miasto *
                      </label>
                      <input
                        name="city"
                        placeholder="Wpisz miasto"
                        value={company.city}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link lub nazwa portalu *
                    </label>
                    <input
                      name="link"
                      placeholder="Skąd mają zostać usunięte dane? (np. aleo.pl, gowork.pl lub link)"
                      value={company.link}
                      onChange={handleChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#002a5c] focus:border-transparent"
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="font-medium text-blue-900">Co otrzymasz?</span>
                    </div>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Profesjonalny wniosek RODO zgodny z przepisami</li>
                      <li>• Gotowy do wysłania dokument z Twoimi danymi</li>
                      <li>• Instrukcje dalszego postępowania</li>
                      <li>• Podstawę prawną do żądania usunięcia danych</li>
                    </ul>
                  </div>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600 mb-4">
                      Cena: <strong className="text-lg text-[#002a5c]">299 zł brutto (z VAT 23%)</strong>
                    </p>
                    <div className="space-y-3">
                      <button
                        type="submit"
                        className="w-full bg-[#002a5c] text-white py-3 rounded-lg hover:bg-[#001e47] transition-colors font-semibold"
                      >
                        Przejdź dalej
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep("nip-verification")}
                        className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        ← Wróć do weryfikacji NIP
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}

            {step === "summary" && (
              <>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Sprawdź swoje dane
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Upewnij się, że wszystkie dane są poprawne przed przejściem do płatności
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <span className="font-medium text-gray-700">Nazwa firmy:</span>
                    <span className="ml-2 text-gray-900">{company.name}</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <span className="font-medium text-gray-700">NIP:</span>
                    <span className="ml-2 text-gray-900">{company.nip}</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <span className="font-medium text-gray-700">Imię i nazwisko:</span>
                    <span className="ml-2 text-gray-900">{company.first_name} {company.last_name}</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <span className="font-medium text-gray-700">Telefon:</span>
                    <span className="ml-2 text-gray-900">{company.phone}</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <span className="font-medium text-gray-700">Email:</span>
                    <span className="ml-2 text-gray-900">{company.email}</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <span className="font-medium text-gray-700">Adres:</span>
                    <span className="ml-2 text-gray-900">{company.street}, {company.zip} {company.city}</span>
                  </div>
                  <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <span className="font-medium text-gray-700">Skąd usuwamy dane:</span>
                    <span className="ml-2 text-gray-900">{company.link}</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-green-800">
                    <strong>Wniosek zostanie przygotowany natychmiast po płatności.</strong><br />
                    Otrzymasz gotowy dokument RODO z instrukcjami wysyłki.
                  </p>
                </div>

                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Cena: <strong className="text-lg text-[#002a5c]">299 zł brutto (z VAT 23%)</strong>
                  </p>
                </div>

                <div className="flex justify-between gap-4">
                  <button
                    onClick={() => setStep("form")}
                    className="flex-1 px-4 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-colors"
                  >
                    Wróć do edycji
                  </button>
                  <button
                    onClick={confirmAndPay}
                    disabled={isLoading}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      isLoading 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : 'bg-[#002a5c] hover:bg-[#001e47] text-white'
                    }`}
                  >
                    {isLoading && (
                      <svg
                        className="animate-spin h-4 w-4 text-inherit"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                        />
                      </svg>
                    )}
                    {isLoading ? 'Przetwarzanie...' : 'Przejdź do płatności'}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>

        <motion.div className="md:w-1/2" variants={fadeInUp}>
          <RODOWhyChooseUs />
        </motion.div>
      </motion.div>

      <motion.div
        className="md:flex justify-center md:gap-8 mx-auto"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <GuaranteeSectionPayment />
      </motion.div>

      <motion.div
        className="md:flex my-20 md:gap-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <SocialProof />
      </motion.div>
    </motion.div>
  );
}