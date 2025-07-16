'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function BusinessTypeSelector() {
  const [step, setStep] = useState<'start' | 'platform' | 'google-type' | 'other-type'>('start');

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

  const getLink = (type: 'gowork-aleo-profile' | 'gowork-aleo-reviews' | 'google-profile' | 'google-reviews') => {
    switch(type) {
      case 'gowork-aleo-profile':
        return '/formularz-profil-bazy';
      case 'google-profile':
        return '/formularz-profil-google';
      case 'gowork-aleo-reviews':
        return '/formularz-opinie';
      case 'google-reviews':
        return '/formularz-opinie-google';
      default:
        return '/formularz-opinie';
    }
  };

  return (
    <div className="relative  w-auto lg:w-[440px] mx-auto">
      <div className="bg-white rounded shadow-md p-10 w-full h-[300px] overflow-hidden flex flex-col justify-between relative">
        <AnimatePresence mode="wait">
          {step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-10 flex flex-col justify-center items-center"
            >
              <div className="h-[100px] flex flex-col items-center justify-center w-full">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-4">
                  Usuń Opinie lub Profil Firmy
                </h2>
                <p className="text-gray-600 text-center text-md mb-8">
                 Kliknij <strong>START</strong>, aby rozpocząć proces usuwania niechcianych treści z internetu.
                </p>
                <button
                  onClick={() => setStep('platform')}
                  className="w-full max-w-xs h-14 bg-[#002a5c] text-white rounded py-2 font-semibold text-lg hover:bg-[#001e47] transition"
                >
                  Start
                </button>
              </div>
            </motion.div>
          )}

          {step === 'platform' && (
            <motion.div
              key="platform"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-10 flex flex-col justify-between"
            >
              <div className="h-[100px]">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
                  Skąd chcesz usunąć?
                </h2>
                <p className="text-gray-600 text-center text-sm">
                  Wybierz platformę
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Google Maps / Google */}
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <button
                    onClick={() => setStep('google-type')}
                    className="w-full h-12 bg-[#002a5c] text-white rounded hover:bg-[#001e47] transition flex items-center justify-center text-center"
                  >
                    Mapy Google
                  </button>
                </motion.div>

                {/* Gowork, Aleo i inne */}
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <button
                    onClick={() => setStep('other-type')}
                    className="w-full h-12 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition flex items-center justify-center text-center text-md font-semibold"
                  >
                    Gowork, Aleo i więcej
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
          
          {step === 'google-type' && (
            <motion.div
              key="google-type"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-10 flex flex-col justify-between"
            >
              <div className="h-[100px]">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2" style={{ fontSize: '1.5rem' }}>
                  Co chcesz usunąć z Google?
                </h2>
                <p className="text-gray-600 text-center text-sm" style={{ fontSize: '0.875rem' }}>
                  Wybierz typ treści
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Profil firmy */}
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >                  
                  <Link
                    href={getLink('google-profile')}
                    className="w-full h-12 bg-[#002a5c] text-white rounded hover:bg-[#001e47] transition flex items-center justify-center text-center"
                  >
                    Profil firmy
                  </Link>
                </motion.div>

                {/* Opinie */}
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <Link
                    href={getLink('google-reviews')}
                    className="w-full h-12 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition flex items-center justify-center text-center text-sm"
                  >
                    Opinie
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === 'other-type' && (
            <motion.div
              key="other-type"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-10 flex flex-col justify-between"
            >
              <div className="h-[100px]">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2" style={{ fontSize: '1.5rem' }}>
                  Co chcesz usunąć?
                </h2>
                <p className="text-gray-600 text-center text-sm" style={{ fontSize: '0.875rem' }}>
                  Wybierz typ treści
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Profil firmy */}
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >                  
                  <Link
                    href={getLink('gowork-aleo-profile')}
                    className="w-full h-12 bg-[#002a5c] text-white rounded hover:bg-[#001e47] transition flex items-center justify-center text-center"
                  >
                    Profil firmy
                  </Link>
                </motion.div>

                {/* Opinie */}
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <Link
                    href={getLink('gowork-aleo-reviews')}
                    className="w-full h-12 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition flex items-center justify-center text-center text-sm"
                  >
                    Opinie
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step !== 'start' && (
        <button
          onClick={() => {
            if (step === 'google-type' || step === 'other-type') {
              setStep('platform');
            } else {
              setStep('start');
            }
          }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← Wstecz
        </button>
      )}
    </div>
  );
}
