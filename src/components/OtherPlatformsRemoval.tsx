import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const OtherPlatformsRemoval = () => {
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
          {/* Ikona Platform */}
          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#002a5c" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>

          {/* Treść */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Usuwanie Opinii z Gowork, ALEO i innych platform
            </h2>
            <p className="text-gray-600 mb-4">
              Kompleksowa obsługa usuwania negatywnych opinii oraz całych profili firmowych 
              z popularnych platform biznesowych takich jak GoWork, ALEO, Panorama Firm i wielu innych.
            </p>
            
            {/* Lista platform */}
            <div className="mb-4">
              <p className="font-semibold text-gray-800 mb-2">Obsługiwane platformy:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">GoWork</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">ALEO</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Panorama Firm</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Pkt.pl</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Firmy.net</span>
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">i inne</span>
              </div>
            </div>

            <ul className="mb-4 space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Usuwanie negatywnych opinii z platform</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Całkowite usuwanie profili firmowych</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Pełna dyskrecja i profesjonalna obsługa</span>
              </li>
            </ul>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/formularz-opinie">
                  <button className="px-6 py-3 bg-[#002a5c] text-white rounded-md font-semibold hover:bg-[#001e47] transition w-full md:w-auto flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                      <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                    </svg>
                    Usuń Opinię
                  </button>
                </Link>
                <Link href="/formularz-profil-bazy">
                  <button className="px-6 py-3 bg-[#5BA155] text-white rounded-md font-semibold hover:bg-[#4a8c47] transition w-full md:w-auto flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Usuń Profil
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OtherPlatformsRemoval;
