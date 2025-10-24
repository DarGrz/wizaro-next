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

  // Wczytaj email z localStorage przy ładowaniu komponentu
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      alert('Podaj prawidłowy adres email');
      return;
    }

    setIsLoading(true);
    
    try {
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
          description: description,
          returnPage: returnPage
        })
      });

      if (!response.ok) {
        throw new Error('Błąd podczas tworzenia płatności');
      }

      const { url } = await response.json();
      // Wyczyść email z localStorage po udanej płatności
      localStorage.removeItem('userEmail');
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
      className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-6 max-w-xl w-full shadow-sm"
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

        <form onSubmit={handleEmailSubmit} className="mb-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Adres email do faktury VAT:
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
              <div className="mt-3">
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
                    "🚀 Zapłać bezpiecznie - Stripe"
                  )}
                </button>
              </div>
            </div>
          </form>

        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm text-green-800">
            <strong>✅ Korzyści natychmiastowej płatności:</strong>
            <ul className="text-left text-xs mt-2 space-y-1">
              <li>• Priorytetowe wykonanie usługi</li>
              <li>• Szybszy kontakt w sprawie realizacji</li>
              <li>• Automatyczne otrzymanie faktury VAT</li>
              <li>• Brak konieczności oczekiwania na fakturę proforma</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}