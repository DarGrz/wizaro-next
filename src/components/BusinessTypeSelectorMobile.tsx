'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function BusinessTypeSelectorMobile() {
  const [step, setStep] = useState<'start' | 'choice' | 'profile-type' | 'review-type'>('start');

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

  const getLink = (type: 'gowork-aleo' | 'mapy-google' | 'opinie' | 'opinie-google' | 'reset-google') => {
    switch(type) {
      case 'gowork-aleo':
        return '/formularz-profil-bazy';
      case 'mapy-google':
        return '/formularz-profil-google';
      case 'opinie':
        return '/formularz-opinie';
      case 'opinie-google':
        return '/formularz-opinie-google';
      case 'reset-google':
        return '/formularz-profil-google?reset=true';
      default:
        return '/formularz-opinie';
    }
  };

  return (
    <div className="relative w-full mx-auto mt-5 px-2">
      <div className="bg-white rounded p-6 w-full h-[280px] overflow-hidden flex flex-col justify-between relative">
        <AnimatePresence mode="wait">
          {step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-6 flex flex-col justify-center items-center"
            >
              <div className="h-[100px] flex flex-col items-center justify-center w-full">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">
                  Usuń Opinie lub Profil Swojej Firmy
                </h1>
                <p className="text-gray-600 text-center text-sm sm:text-sm mb-6">
                 Usuń profil firmy lub wybrane opinie. Skutecznie likwidujemy niechciane treści z Map Google, GoWork, Aleo i innych serwisów.
                </p>
                <button
                  onClick={() => setStep('choice')}
                  className="w-full max-w-xs h-12 bg-[#002a5c] text-white rounded py-2 font-semibold text-lg hover:bg-[#001e47] transition"
                >
                  Start
                </button>
              </div>
            </motion.div>
          )}

          {step === 'choice' && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-6 flex flex-col justify-between"
            >
              <div className="h-[80px]">
                <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
                  Co chcesz usunąć?
                </h2>
                <p className="text-gray-600 text-center text-sm sm:text-sm">
                  Wybierz, co chcesz usunąć.
                </p>
              </div>

              <div className="flex flex-col gap-4">
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
                  <button
                    onClick={() => setStep('review-type')}
                    className="w-full h-12 bg-gray-200 font-semibold text-gray-800 rounded hover:bg-gray-300 transition flex items-center justify-center text-center text-sm"
                  >
                    Opinie
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
          
          {step === 'profile-type' && (
            <motion.div
              key="profile-type"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-6 flex flex-col justify-between"
            >
              <div className="h-[80px]">
                <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
                  Wybierz typ profilu
                </h2>
                <p className="text-gray-600 text-center text-sm sm:text-sm">
                  Wybierz jedną z opcji
                </p>
              </div>

              <div className="flex flex-col gap-4">
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
                  >
                    Gowork, Aleo i inne
                  </Link>
                </motion.div>

                {/* Mapy Google */}
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
                  >
                    Mapy Google
                  </Link>
                </motion.div>

              
              </div>
            </motion.div>
          )}
          
          {step === 'review-type' && (
            <motion.div
              key="review-type"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-6 flex flex-col justify-between"
            >
              <div className="h-[80px]">
                <h2 className="text-xl font-semibold text-center text-gray-900 mb-2">
                  Wybierz portal z opiniami
                </h2>
                <p className="text-gray-600 text-center text-xs sm:text-sm">
                  Wybierz jedną z opcji
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Inne portale z opiniami */}
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <Link
                    href={getLink('opinie')}
                    className="w-full h-12 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition flex items-center justify-center text-center text-sm"
                  >
                    Gowork, Aleo i inne
                  </Link>
                </motion.div>

                {/* Opinie Google */}
                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <Link
                    href={getLink('opinie-google')}
                    className="w-full h-12 bg-[#002a5c] text-white rounded hover:bg-[#001e47] transition flex items-center justify-center text-center"
                  >
                    Mapy Google
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
            if (step === 'profile-type' || step === 'review-type') {
              setStep('choice');
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
