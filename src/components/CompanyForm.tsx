'use client';

import { useState, useEffect } from 'react';
import PaymentExplanation from '@/components/Explenations/PaymentExplanation';
import SocialProof from '@/components/SocialProof';

export default function CompanyForm() {
  const [form, setForm] = useState({
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    nip: '',
    regon: '',
    industry: '',
    url: '',
    phone: '',
    opinie: '',
    street: '',
    zip: '',
    city: '',
  });

  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [zipError, setZipError] = useState(false);

  // Ładowanie danych z localStorage
  useEffect(() => {
    const savedForm = localStorage.getItem('companyFormData');
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);

  // Obsługa zmian w formularzu
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'zip') {
      const zipRegex = /^\d{2}-\d{3}$/;
      setZipError(!zipRegex.test(value));
    }

    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    localStorage.setItem('companyFormData', JSON.stringify(updatedForm));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const zipRegex = /^\d{2}-\d{3}$/;
    if (!zipRegex.test(form.zip)) {
      setZipError(true);
      return;
    }
    setShowSummary(true);
  };

  const confirmAndPay = async () => {
    setIsLoading(true);
    try {
      const companyRes = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!companyRes.ok) throw new Error('Błąd zapisu firmy');
      const companyData = await companyRes.json();

      const docRes = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_id: companyData.id,
          type: 'wezwanie do usunięcia opinii',
        }),
      });

      if (!docRes.ok) throw new Error('Błąd tworzenia dokumentu');
      const docData = await docRes.json();

      const paymentRes = await fetch('/api/payments/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_id: docData.id,
          email: form.email,
          name: `${form.first_name} ${form.last_name}`,
          company_name: form.name,
          nip: form.nip,
          street: form.street,
          zip: form.zip,
          city: form.city,
        }),
      });

      if (!paymentRes.ok) throw new Error('Błąd tworzenia płatności');
      const payment = await paymentRes.json();

      window.location.href = payment.url;
    } catch (error) {
      console.error('❌ Błąd formularza:', error);
      alert('Wystąpił problem podczas przetwarzania. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto min-h-screen ">
      <div className="md:flex px-4 py-10 md:gap-8">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full">
            {!showSummary ? (
              <>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                  Jakiej firmy dane mamy usunąć?
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="name" placeholder="Nazwa firmy" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="nip" placeholder="NIP" value={form.nip} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="first_name" placeholder="Imię" value={form.first_name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="last_name" placeholder="Nazwisko" value={form.last_name} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="phone" placeholder="Telefon" value={form.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="street" placeholder="Ulica i numer" value={form.street} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="zip" placeholder="Kod pocztowy (np. 12-345)" value={form.zip} onChange={handleChange} required className={`w-full border rounded px-4 py-2 ${zipError ? 'border-red-500' : 'border-gray-300'}`} />
                  {zipError && <p className="text-red-500 text-sm">Niepoprawny format kodu pocztowego</p>}
                  <input name="city" placeholder="Miasto" value={form.city} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="regon" placeholder="Regon (opcjonalnie)" value={form.regon} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="url" placeholder="Skąd mamy usunąć? (link lub nazwa portalu)" value={form.url} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />

                  <p className="text-sm text-gray-600 mb-4 ms-1">
                    Cena: <strong className='text-lg'>499 zł brutto (z VAT 23%)</strong>
                  </p>

                  <button type="submit" className="w-full bg-[#002a5c] text-white py-2 rounded hover:bg-[#001e47] transition">
                    Przejdź dalej
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4 text-center">Sprawdź swoje dane</h2>
                <ul className="text-sm text-gray-700 space-y-1 mb-4">
                  <li className="w-full border border-gray-300 rounded px-4 py-2"><strong>Nazwa firmy:</strong> {form.name}</li>
                  <li className="w-full border border-gray-300 rounded px-4 py-2"><strong>Imię i nazwisko:</strong> {form.first_name} {form.last_name}</li>
                  <li className="w-full border border-gray-300 rounded px-4 py-2"><strong>Telefon:</strong> {form.phone}</li>
                  <li className="w-full border border-gray-300 rounded px-4 py-2"><strong>Email:</strong> {form.email}</li>
                  <li className="w-full border border-gray-300 rounded px-4 py-2"><strong>Adres:</strong> {form.street}, {form.zip} {form.city}</li>
                  <li className="w-full border border-gray-300 rounded px-4 py-2"><strong>NIP:</strong> {form.nip}</li>
                  {form.regon && <li className="w-full border border-gray-300 rounded px-4 py-2"><strong>REGON:</strong> {form.regon}</li>}
                  <li className="w-full border border-gray-300 rounded px-4 py-2"><strong>Skąd usuwamy:</strong> <a target='_blank' href={form.url}>{form.url}</a></li>
                </ul>
                <p className="text-sm text-gray-600 mb-4 px-2 py-2">
                  Zlecenie zostanie natychmiast skierowane do realizacji. <br />
                  Cena: <strong className='text-lg'>499 zł brutto (z VAT 23%)</strong>
                </p>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setShowSummary(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm">
                    Wróć
                  </button>
                  <button
                    onClick={confirmAndPay}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded text-sm flex items-center justify-center gap-2 
                      ${isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#002a5c] hover:bg-[#001e47] text-white'}
                    `}
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
        </div>

        <div className="md:w-1/2">
          <PaymentExplanation />
        </div>
      </div>

      <div className="md:flex py-10 m-4 md:gap-8">
        <SocialProof />
      </div>
    </div>
  );
}
