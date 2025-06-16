'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function MobileActionButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'choice' | 'profile-type'>('choice');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setStep('choice'); // Reset to first step when reopening
  };
  const buttonVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
    exit: { opacity: 0, x: -30, transition: { duration: 0.2 } },
  };
  // Animacja pulsowania przycisku
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 5, // 5 sekund przerwy między pulsowaniami
    }
  };

  const getLink = (type: 'gowork-aleo' | 'mapy-google' | 'opinie') => {
    switch(type) {
      case 'gowork-aleo':
        return '/formularz-profil';
      case 'mapy-google':
        return '/formularz-profil-google';
      case 'opinie':
        return '/formularz-opinie';
      default:
        return '/formularz-opinie';
    }
  };
  return (
    <>
      {/* Przycisk stały w prawym rogu ekranu */}
      <motion.button
        onClick={toggleMenu}
        animate={isOpen ? {} : pulseAnimation}
        className="lg:hidden fixed bottom-10 right-4 w-16 h-16 rounded-full bg-[#002a5c] text-white flex items-center justify-center shadow-lg z-50"
      >        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        )}
      </motion.button>      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed bottom-29 right-6 bg-white rounded-lg shadow-xl p-4 z-50 w-[280px]"
          >
            {step === 'choice' && (
              <>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Co chcesz usunąć?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Wybierz jedną z opcji
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Profil z opiniami */}
                  <motion.div
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={buttonVariants}
                  >
                    <button
                      onClick={() => setStep('profile-type')}
                      className="w-full h-12 bg-[#002a5c] text-white rounded hover:bg-[#001e47] transition flex items-center justify-center text-center"
                    >
                      Profil firmy
                    </button>
                  </motion.div>

                  {/* Pojedyncze opinie */}
                  <motion.div
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={buttonVariants}
                  >
                    <Link
                      href={getLink('opinie')}
                      className="w-full h-12 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition flex items-center justify-center text-center text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Pojedyncze opinie
                    </Link>
                  </motion.div>
                </div>
              </>
            )}

            {step === 'profile-type' && (
              <>
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Wybierz typ profilu
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Wybierz jedną z opcji
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Gowork, Aleo i inne */}
                  <motion.div
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={buttonVariants}
                  >
                    <Link
                      href={getLink('gowork-aleo')}
                      className="w-full h-12 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition flex items-center justify-center text-center text-sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Gowork, Aleo i inne
                    </Link>
                  </motion.div>                  {/* Mapy Google */}
                  <motion.div
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={buttonVariants}
                  >
                    <Link
                      href={getLink('mapy-google')}
                      className="w-full h-12 bg-[#002a5c] text-white rounded hover:bg-[#001e47] transition flex items-center justify-center text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Mapy Google
                    </Link>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay do zamykania menu przy kliknięciu poza nim */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
