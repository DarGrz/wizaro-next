'use client';

import { useState } from 'react';
import PaymentExplanation from '@/components/PaymentExplanation';
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
  });

  const [showSummary, setShowSummary] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSummary(true);
  };

  const confirmAndPay = async () => {
    setShowSummary(false);
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
        body: JSON.stringify({ document_id: docData.id }),
      });

      if (!paymentRes.ok) throw new Error('Błąd tworzenia płatności');
      const payment = await paymentRes.json();

      window.location.href = payment.url;
    } catch (error) {
      console.error('❌ Błąd formularza:', error);
      alert('Wystąpił problem podczas przetwarzania. Spróbuj ponownie.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto min-h-screen">
      <div className="md:flex px-4 py-10 md:gap-8">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full">
            {!showSummary ? (
              <>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                  Jakiej firmy dane mamy usunąć?
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="name" placeholder="Nazwa firmy" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="nip" placeholder="NIP" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="first_name" placeholder="Imię" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="last_name" placeholder="Nazwisko" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="phone" placeholder="Telefon " onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="regon" placeholder="Regon (opcjonalnie)" onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" />
                  <input name="url" placeholder="Skąd mamy usunąć? (link lub nazwa portalu)" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />

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
                  <li><strong>Nazwa firmy:</strong> {form.name}</li>
                  <li><strong>Imię i nazwisko:</strong> {form.first_name} {form.last_name}</li>
                  <li><strong>Telefon:</strong> {form.phone}</li>
                  <li><strong>Email:</strong> {form.email}</li>
                  <li><strong>NIP:</strong> {form.nip}</li>
                  {form.regon && <li><strong>REGON:</strong> {form.regon}</li>}
                  <li><strong>Skąd usuwamy:</strong> {form.url}</li>
                </ul>
                <p className="text-sm text-gray-600 mb-4">
                  Zlecenie zostanie natychmiast skierowane do realizacji. <br />
                  Cena: <strong className='text-lg'>499 zł brutto (z VAT 23%)</strong>
                </p>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setShowSummary(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm">
                    Wróć
                  </button>
                  <button onClick={confirmAndPay} className="px-4 py-2 rounded bg-[#002a5c] hover:bg-[#001e47] text-white text-sm">
                    Przejdź do płatności
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

      <div className="md:flex py-10 md:gap-8">
        <SocialProof />
      </div>
    </div>
  );
}
