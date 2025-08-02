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
              <circle cx="12" cy="12" r="10" fill="white" stroke="#5BA155" strokeWidth="2" />
              <circle cx="9" cy="9" r="1.5" fill="#5BA155" />
              <circle cx="15" cy="9" r="1.5" fill="#5BA155" />
              <path d="M8 14a4 4 0 0 0 8 0" fill="none" stroke="#5BA155" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Treść */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Usuwanie Opinii
            </h2>
            <p className="text-gray-600 mb-4">
              Szkodliwe opinie mogą znacząco wpłynąć na reputację Twojej firmy i zniechęcić potencjalnych klientów.
              Oferujemy profesjonalną usługę usuwania szkodliwych recenzji z internetu, działając zgodnie z przepisami prawa.
            </p>
            <ul className="mb-4 space-y-2">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#5BA155]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Usuwamy negatywne opinie z Google Maps</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#5BA155]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Zajmujemy się recenzjami naruszającymi regulamin</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#5BA155]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Zapewniamy szybkie i dyskretne działanie</span>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#5BA155]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Płatność dopiero po skutecznym usunięciu opinii</span>
              </li>
            </ul>            <div className="space-y-4">
              <p className="font-medium text-gray-800">Usuń szkodliwą opinię z:</p>
              <div className="flex flex-row sm:flex-row gap-4 md:bl ">
                <Link href="/formularz-opinie-google">
                  <button className="bg-[#002a5c] text-white px-3 md:px-6 py-3 rounded text-sm md:text-md  font-semibold hover:bg-blue-800 transition flex items-center justify-center">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <path d="M12 6.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 10c-2.33 0-7 1.17-7 3.5V20h14v-.5c0-2.33-4.67-3.5-7-3.5z"/>
                    </svg> */}
                    Mapy Google
                  </button>
                </Link>
                <Link href="/formularz-opinie">
                  <button className="bg-[#002a5c] text-white text-sm md:text-md px-3 md:px-6 py-3 rounded font-semibold hover:bg-blue-800 transition flex items-center justify-center">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>
                    </svg> */}
                    GoWork, ALEO...
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


