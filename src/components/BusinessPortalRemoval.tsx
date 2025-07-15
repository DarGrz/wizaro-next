'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BusinessPortalRemoval() {
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
          {/* Ikona portali biznesowych */}
          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#002a5c">
              <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/>
              <circle cx="17" cy="16" r="2" fill="#5BA155"/>
            </svg>
          </div>

          {/* Treść */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Usuwanie informacji z GoWork, ALEO itp.
            </h2>
            <p className="text-gray-600 mb-4">
              Skutecznie usuniemy profil Twojej firmy z popularnych portali biznesowych 
              takich jak ALEO, GoWork, Panorama Firm, Biznes Finder i innych. 
              Kompleksowy proces usuwania danych z zachowaniem pełnej dyskrecji.
            </p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Usuwanie profili z ALEO, GoWork</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Panorama Firm, Biznes Finder, PKT.pl</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Podobne Firmy i inne portale</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/formularz-profil-bazy" className="w-full sm:w-auto block">
                <button className="px-6 py-3 bg-[#002a5c] text-white rounded-md font-semibold hover:bg-[#001e47] transition w-full sm:w-auto">
                  Usuń cały profil
                </button>
              </Link>
              <Link href="/formularz-opinie" className="w-full sm:w-auto block">
                <button className="px-6 py-3 bg-[#E5E7EB] text-black rounded-md font-semibold hover:bg-[#D1D5DB] transition w-full sm:w-auto">
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
