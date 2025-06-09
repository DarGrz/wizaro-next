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
          {/* Ikona Reviews */}          <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
              <circle cx="12" cy="12" r="10" fill="#edfff3" stroke="#3EA34B" strokeWidth="1" />
              <circle cx="9" cy="9" r="1.5" fill="#3EA34B" />
              <circle cx="15" cy="9" r="1.5" fill="#3EA34B" />
              <path d="M8 14a4 4 0 0 0 8 0" fill="none" stroke="#3EA34B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Treść */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Usuwanie Negatywnych Opinii
            </h2>
            <p className="text-gray-600 mb-4">
              Negatywne opinie mogą znacząco wpłynąć na reputację Twojej firmy i zniechęcić potencjalnych klientów.
              Oferujemy profesjonalną usługę usuwania szkodliwych recenzji z internetu, działając zgodnie z przepisami prawa.
            </p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Usuwamy negatywne opinie z Google Maps</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Zajmujemy się recenzjami naruszającymi regulamin</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Zapewniamy szybkie i dyskretne działanie</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Płatność dopiero po skutecznym usunięciu opinii</span>
              </li>
            </ul>
            <div>
              <Link href="/formularz-opinie">
                <button className="bg-[#002a5c] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition">
                  Usuń szkodliwą opinię
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NegativeReviewRemoval;


