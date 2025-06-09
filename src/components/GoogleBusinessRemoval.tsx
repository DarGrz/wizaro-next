'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GoogleBusinessRemoval() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="w-full">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn}
        className="bg-white rounded-lg shadow-md p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Ikona Google */}
          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.086-10.432l4.24-2.501a.64.64 0 0 1 .96.552v5.647a.64.64 0 0 1-.96.552l-4.24-2.501a.64.64 0 0 1 0-1.107l4.24-2.501a.64.64 0 0 1 .96.552v5.647a.64.64 0 0 1-.96.552l-4.24-2.501a.64.64 0 0 1 0-1.107z" fill="#4285F4" />
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.086-10.432l4.24-2.501a.64.64 0 0 1 .96.552v5.647a.64.64 0 0 1-.96.552l-4.24-2.501a.64.64 0 0 1 0-1.107z" fill="#34A853" />
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.086-10.432l4.24-2.501a.64.64 0 0 1 .96.552v5.647a.64.64 0 0 1-.96.552l-4.24-2.501a.64.64 0 0 1 0-1.107z" fill="#FBBC05" />
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.086-10.432l4.24-2.501a.64.64 0 0 1 .96.552v5.647a.64.64 0 0 1-.96.552l-4.24-2.501a.64.64 0 0 1 0-1.107z" fill="#EA4335" />
            </svg>
          </div>

          {/* Treść */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Usuwanie firmy z Google
            </h2>
            <p className="text-gray-600 mb-4">
              Pomożemy Ci usunąć profil Twojej firmy z Google Maps i Google Moja Firma. 
              Nasi eksperci przeprowadzą cały proces zgodnie z procedurami Google, 
              gwarantując skuteczne usunięcie bez komplikacji.
            </p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Usuwanie profilu Google Moja Firma</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Usuwanie danych z Google Maps</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Usunięcie wszystkich opinii z Google Maps</span>
              </li>
            </ul>            <Link href="/formularz-profil" className="w-full md:w-auto block">
              <button className="px-6 py-3 bg-[#002a5c] text-white rounded-md font-semibold hover:bg-[#001e47] transition w-full md:w-auto">
                Usuń firmę z Google
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
