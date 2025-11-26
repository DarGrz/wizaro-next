"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface CompanyData {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  nip: string;
  street: string;
  city: string;
  zip: string;
}

interface PaymentDetails {
  success: boolean;
  session_id: string;
  customer_email: string;
  amount_total: number;
  currency: string;
  payment_status: string;
  company: CompanyData | null;
  order_id?: string;
}

function SuccessPaymentContent() {
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'error'>('success');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const searchParams = useSearchParams();
  
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      if (!sessionId) {
        setPaymentStatus('error');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/payments/session-details?session_id=${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Błąd pobierania danych płatności');
        }

        const data = await response.json();
        setPaymentDetails(data);
        
        if (data.payment_status !== 'paid') {
          setPaymentStatus('error');
        } else {
          // Płatność pomyślna - wyślij email z potwierdzeniem
          await sendConfirmationEmail(data, orderId);
        }
      } catch (error) {
        console.error('Błąd:', error);
        setPaymentStatus('error');
      } finally {
        setLoading(false);
      }
    };

    const sendConfirmationEmail = async (paymentData: PaymentDetails, orderId: string | null) => {
      // Sprawdź czy email nie został już wysłany (zapobiega wielokrotnym wysyłkom przy odświeżaniu)
      const emailSentKey = `email_sent_${sessionId}`;
      if (typeof window !== 'undefined' && localStorage.getItem(emailSentKey)) {
        console.log('📧 Email już został wysłany dla tej sesji');
        setEmailSent(true);
        return;
      }

      // Pobierz dane z localStorage (zapisane przed przekierowaniem na płatność)
      const companyFormRemovalData = localStorage.getItem("companyFormRemovalData");
      
      if (companyFormRemovalData && paymentData.company) {
        try {
          const formData = JSON.parse(companyFormRemovalData);
          const company = formData.company || paymentData.company;
          const removals = formData.removals || [];
          const totalPrice = formData.totalPrice || (paymentData.amount_total ? paymentData.amount_total / 100 : 0);
          const companyId = orderId || formData.company_id || paymentData.order_id;

          // Wyślij email z potwierdzeniem
          const emailRes = await fetch("/api/send-profile-confirmation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              company: company,
              profiles: removals,
              totalPrice: totalPrice,
              orderId: companyId,
            }),
          });

          if (emailRes.ok) {
            console.log("✅ Email z potwierdzeniem wysłany pomyślnie po płatności");
            setEmailSent(true);
            // Oznacz że email został wysłany
            if (typeof window !== 'undefined') {
              localStorage.setItem(emailSentKey, 'true');
            }
          } else {
            console.error("⚠️ Nie udało się wysłać emaila z potwierdzeniem");
          }

          // Wyczyść dane formularza z localStorage
          localStorage.removeItem("companyFormRemovalData");
          localStorage.removeItem("companyFormData");
        } catch (emailError) {
          console.error("❌ Błąd wysyłki emaila z potwierdzeniem:", emailError);
        }
      } else {
        console.log('⚠️ Brak danych do wysłania emaila - dane firmy:', !!paymentData.company, ', dane formularza:', !!companyFormRemovalData);
      }
    };

    fetchPaymentDetails();
  }, [sessionId, orderId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002a5c] mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold mb-2">Weryfikowanie płatności...</h1>
          <p className="text-gray-600">Sprawdzamy status Twojej transakcji</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Błąd płatności</h1>
          <p className="text-gray-600 mb-6">
            Wystąpił problem z przetworzeniem płatności. Skontaktuj się z nami.
          </p>
          <div className="space-y-3">
            <Link 
              href="/thankyou" 
              className="block w-full bg-[#002a5c] text-white py-3 px-6 rounded-lg hover:bg-[#001e47] transition"
            >
              Spróbuj ponownie
            </Link>
            <Link 
              href="/kontakt" 
              className="block w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition"
            >
              Skontaktuj się z nami
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* Animowana ikona sukcesu */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="text-8xl mb-6"
        >
          ✅
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-green-600 mb-4"
        >
          Płatność zakończona sukcesem!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-green-800 mb-3">
            Dziękujemy za zaufanie i natychmiastową płatność!
          </h2>
          <div className="text-left text-sm text-green-700 space-y-2">
            <p>✅ Płatność została zaksięgowana</p>
            <p>✅ Twoje zlecenie ma teraz status priorytetowy</p>
            <p>✅ Rozpoczynamy natychmiastową realizację</p>
            <p>✅ Otrzymasz szybszy kontakt w sprawie postępów</p>
          </div>
          
          {/* Dane firmy i transakcji */}
          <div className="mt-4 space-y-3">
            {paymentDetails?.company && (
              <div className="p-3 bg-white rounded-lg border border-green-100">
                <h4 className="text-xs font-semibold text-gray-700 mb-2">Dane firmy:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-gray-600">
                  <p><strong>Firma:</strong> {paymentDetails.company.name}</p>
                  <p><strong>NIP:</strong> {paymentDetails.company.nip}</p>
                  <p><strong>Kontakt:</strong> {paymentDetails.company.first_name} {paymentDetails.company.last_name}</p>
                  <p><strong>Email:</strong> {paymentDetails.company.email}</p>
                </div>
              </div>
            )}
            
            <div className="p-3 bg-white rounded-lg border border-green-100">
              <h4 className="text-xs font-semibold text-gray-700 mb-2">Szczegóły płatności:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-gray-600">
                {paymentDetails?.amount_total && (
                  <p><strong>Kwota:</strong> {(paymentDetails.amount_total / 100).toFixed(2)} {paymentDetails.currency?.toUpperCase()}</p>
                )}
                {(orderId || paymentDetails?.order_id) && (
                  <p><strong>ID zamówienia:</strong> {orderId || paymentDetails?.order_id}</p>
                )}
                <p><strong>ID transakcji:</strong> {sessionId?.substring(0, 20)}...</p>
                <p><strong>Status:</strong> Opłacone</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8"
        >
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Co dzieje się dalej?
          </h3>
          <div className="text-left text-sm text-blue-700 space-y-2">
            <p><strong>Natychmiast:</strong> Twoje zlecenie trafia do priorytetowej kolejki</p>
            <p><strong>W ciągu 24h:</strong> Otrzymasz potwierdzenie rozpoczęcia prac</p>
            <p><strong>Podczas realizacji:</strong> Będziemy informować o postępach</p>
            <p><strong>Po zakończeniu:</strong> Otrzymasz szczegółowy raport z wykonanych działań</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Masz pytania lub potrzebujesz dodatkowych informacji?</strong>
            </p>
            <p className="text-sm text-gray-600">
              Zadzwoń: <a href="tel:+48792861513" className="text-[#002a5c] font-semibold hover:underline">+48 792 861 513</a>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Dostępny od poniedziałku do piątku, 9:00–17:00
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link 
              href="/" 
              className="flex-1 bg-[#002a5c] text-white py-3 px-6 rounded-lg hover:bg-[#001e47] transition text-center"
            >
              Powrót na stronę główną
            </Link>
            <Link 
              href="/kontakt" 
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition text-center"
            >
              Skontaktuj się z nami
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SuccessPaymentPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Ładowanie...</div>}>
      <SuccessPaymentContent />
    </Suspense>
  );
}