'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function BusinessTypeSelector() {
  const [step, setStep] = useState<'start' | 'choice'>('start');
  // Default to JDG as a fallback, but we won't be using this for selection anymore

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

  const getLink = (type: 'profil' | 'opinie') => {
    return type === 'profil' ? '/formularz-profil' : '/formularz-opinie';
  };

  return (
    <div className="relative px-2 w-auto lg:w-[440px] mx-auto">
      <div className="bg-white  rounded shadow-md p-10 w-full h-[300px] overflow-hidden flex flex-col justify-between relative">
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
                  Usuń Opinie lub Profil Swojej Firmy
                </h2>
                <p className="text-gray-600 text-center text-md mb-8">
                  Szybko, legalnie i dyskretnie. Rozpocznij, klikając poniżej.
                </p>
                <button
                  onClick={() => setStep('type')}
                  className="w-full max-w-xs h-14 bg-[#002a5c] text-white rounded py-2 font-semibold text-lg hover:bg-[#001e47] transition"
                >
                  Start
                </button>
              </div>
            </motion.div>
          )}

          {step === 'type' && (
            <motion.div
              key="type"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-10 flex flex-col justify-between"
            >
              <div className="h-[100px]">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
                  Wybierz rodzaj działalności
                </h2>
                <p className="text-gray-600 text-center text-md">
                  JDG czy Spółka?
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {['jdg', 'spolka'].map((type, i) => (
                  <motion.button
                    key={type}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={buttonVariants}
                    onClick={() => handleTypeChoice(type as 'jdg' | 'spolka')}
                    className={`w-full h-12 rounded transition flex items-center justify-center text-center ${
                      type === 'jdg'
                        ? 'bg-[#002a5c] text-white hover:bg-[#001e47]'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {type === 'jdg'
                      ? 'JDG'
                      : 'Spółka'}
                  </motion.button>
                ))}
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
              className="absolute inset-0 p-10 flex flex-col justify-between"
            >
              <div className="h-[100px]">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
                  Co chcesz usunąć?
                </h2>
                <p className="text-gray-600 text-center text-sm">
                  Wybierz jedną z opcji
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
                  <Link
                    href={getLink('profil')}
                    className="block w-full h-12 bg-[#002a5c] text-white rounded hover:bg-[#001e47] transition flex items-center justify-center text-center"
                  >
                    Profil z opiniami
                  </Link>
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
                    className="block w-full h-12 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition flex items-center justify-center text-center text-sm"
                  >
                    Pojedyncze opinie
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
            setStep('start');
            setBusinessType(null);
          }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← Wstecz
        </button>
      )}
    </div>
  );
}
