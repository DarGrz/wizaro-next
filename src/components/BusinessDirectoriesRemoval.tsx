'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BusinessDirectoriesRemoval() {
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
          {/* Ikona z katalogami biznesowymi */}
          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#002a5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
              <path d="M3 19.5h18M3 4.5h18M5.25 9.75h13.5M5.25 14.25h13.5" />
            </svg>
          </div>

          {/* Treść */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Usuwanie profili i opinii z katalogów biznesowych
            </h2>
            <p className="text-gray-600 mb-4">
              Szybko i skutecznie usuniemy niepożądane profile oraz negatywne opinie o Twojej firmie 
              z popularnych katalogów biznesowych takich jak Aleo, Gowork, Panorama Firm i wielu innych. 
              Działamy zgodnie z prawem i procedurami każdego serwisu.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-50 rounded px-3 py-2 text-center text-sm font-medium text-gray-700">Aleo</div>
              <div className="bg-gray-50 rounded px-3 py-2 text-center text-sm font-medium text-gray-700">Gowork</div>
              <div className="bg-gray-50 rounded px-3 py-2 text-center text-sm font-medium text-gray-700">Panorama Firm</div>
              <div className="bg-gray-50 rounded px-3 py-2 text-center text-sm font-medium text-gray-700">PKT.pl</div>
              <div className="bg-gray-50 rounded px-3 py-2 text-center text-sm font-medium text-gray-700">Oferteo</div>
              <div className="bg-gray-50 rounded px-3 py-2 text-center text-sm font-medium text-gray-700">i wiele innych</div>
            </div>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Usuwanie niepożądanych profili firmowych</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Usuwanie negatywnych opinii</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>                <span className="text-gray-700">Korekta błędnych danych firmowych</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/formularz-profil">
                <button className="px-6 py-3 bg-[#002a5c] text-white rounded-md font-semibold hover:bg-[#001e47] transition w-full">
                  Usuń profil
                </button>
              </Link>
              <Link href="/formularz-opinie">
                <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md font-semibold hover:bg-gray-300 transition w-full">
                  Usuń opinie
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
