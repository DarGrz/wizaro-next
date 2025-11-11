import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const NegativeReviewRemoval = () => {
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
          {/* Ikona Reviews */}
          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FFA500"/>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#FF8C00" strokeWidth="1.5"/>
            </svg>
          </div>

          {/* Treść */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Usuwanie Opinii z Google
            </h2>
            <p className="text-gray-600 mb-4">
              Specjalizujemy się w skutecznym usuwaniu negatywnych opinii z Map Google. Z nami odzyskasz dobrą reputację i przewagę nad konkurencją.
            </p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">299 zł za usunięcie opinii</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Skuteczne metody zgodne z regulaminem</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Płatność tylko za sukces</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="text-gray-700">Pełna dyskrecja i bezpieczeństwo</span>
              </li>
            </ul>            <div className="space-y-4">
              <div className="flex flex-row sm:flex-row gap-4 md:bl ">
                <Link href="/formularz-opinie-google">
                  <button className="px-6 py-3 bg-[#002a5c] text-white rounded-md font-semibold hover:bg-[#001e47] transition w-full md:w-auto">
                    Usuń Opinie z Map Google
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

export default NegativeReviewRemoval;


