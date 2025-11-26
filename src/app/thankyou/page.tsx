"use client";

import Link from "next/link";
import { Suspense } from "react";
import { motion } from "framer-motion";

function ThankYouContent() {
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
          className="text-3xl font-bold text-[#002a5c] mb-4"
        >
          Dziękujemy za zaufanie!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-700 mb-6"
        >
          W razie dodatkowych pytań, jesteśmy do dyspozycji.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8"
        >
          <h2 className="text-lg font-semibold text-green-800 mb-3">
            Zlecenie zostało przyjęte
          </h2>
          <div className="text-left text-sm text-green-700 space-y-2">
            <p>✅ Twoje zlecenie zostało pomyślnie złożone</p>
            <p>✅ Płatność została zaksięgowana</p>
            <p>✅ Od razu trafiło do realizacji</p>
            <p>✅ Nasi specjaliści już się nim zajmują</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
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
          transition={{ delay: 0.8 }}
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

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002a5c]"></div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
