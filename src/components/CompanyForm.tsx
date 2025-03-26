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
    url: ''
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmAndPay = async () => {
    setShowModal(false);

    try {
      // 1. Zapisz firmę
      const companyRes = await fetch('/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!companyRes.ok) throw new Error('Błąd zapisu firmy');

      const companyData = await companyRes.json();
      const companyId = companyData.id;

      // 2. Utwórz dokument
      const docRes = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_id: companyId,
          type: 'wezwanie do usunięcia opinii'
        })
      });

      if (!docRes.ok) throw new Error('Błąd tworzenia dokumentu');
      const docData = await docRes.json();

      // 3. Utwórz płatność
      const paymentRes = await fetch('/api/payments/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ document_id: docData.id })
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
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Wprowadź dane firmy
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" placeholder="Nazwa firmy" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
              <input name="first_name" placeholder="Imię" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
              <input name="last_name" placeholder="Nazwisko" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
              <input name="email" placeholder="Email" type="email" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
              <input name="nip" placeholder="NIP" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />
              <input name="regon" placeholder="REGON (opcjonalnie)" onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2" />
              <input name="url" placeholder="Link do profilu (GoWork, Aleo itp.)" onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2" />

              <p className="text-sm text-gray-600 mt-2">
                Cena usługi: <strong>399 zł brutto (z VAT 23%)</strong>
              </p>

              <button type="submit" className="w-full bg-[#002a5c] text-white py-2 rounded hover:bg-[#001e47] transition">
                Przejdź do podsumowania
              </button>
            </form>
          </div>
        </div>

        <div className="md:w-1/2">
          <PaymentExplanation />
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white shadow-2xl rounded-xl max-w-md w-full p-6">
              <h2 className="text-xl font-semibold mb-4 text-center">Potwierdź dane przed płatnością</h2>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li><strong>Nazwa firmy:</strong> {form.name}</li>
                <li><strong>Imię i nazwisko:</strong> {form.first_name} {form.last_name}</li>
                <li><strong>Email:</strong> {form.email}</li>
                <li><strong>NIP:</strong> {form.nip}</li>
                {form.regon && <li><strong>REGON:</strong> {form.regon}</li>}
                <li><strong>Link do profilu:</strong> {form.url}</li>
              </ul>
              <p className="text-sm text-gray-600 mb-4">
                Zlecenie zostanie natychmiast skierowane do realizacji. <br />
                Cena: <strong>399 zł brutto (z VAT 23%)</strong>
              </p>
              <div className="flex justify-end gap-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm">
                  Anuluj
                </button>
                <button onClick={confirmAndPay} className="px-4 py-2 rounded bg-[#002a5c] hover:bg-[#001e47] text-white text-sm">
                  Potwierdzam i płacę
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="md:flex py-10 md:gap-8">
        <SocialProof />
      </div>
    </div>
  );
}
