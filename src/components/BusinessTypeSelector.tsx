'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function BusinessTypeSelector() {
  const [step, setStep] = useState<'start' | 'jdg'>('start');

  const handleChoice = (choice: 'jdg' | 'spolka') => {
    if (choice === 'jdg') {
      setStep('jdg');
    } else {
      alert('Spółka - funkcja w przygotowaniu');
    }
  };

//   const handleJdgChoice = (choice: 'opinie' | 'profil') => {
//     alert(`Wybrano: ${choice}`);
//   };

  // animacja przycisków
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

  return (
    <div className="relative px-2 w-auto lg:w-[440px] mx-auto">
      <div className="bg-white  border border-gray-200 rounded-xl shadow-md  p-10 w-full h-[300px] overflow-hidden flex flex-col justify-between relative">
        <AnimatePresence mode="wait">
          {step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-10 flex flex-col justify-between"
            >
              <div className="h-[100px]">
                <h2 className="text-2xl font-semibold text-center text-gray-900 mb-2">
                  Usuń informacje o swojej firmie
                </h2>
                <p className="text-gray-600 text-center text-sm">
                  Wybierz aby przejsć dalej
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {[0, 1].map((i) => (
                  <motion.button
                    key={i}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={buttonVariants}
                    onClick={() =>
                      i === 0 ? handleChoice('jdg') : handleChoice('spolka')
                    }
                    className={`w-full h-12 rounded transition flex items-center justify-center text-center ${
                      i === 0
                        ? 'bg-[#002a5c] text-white hover:bg-[#001e47]'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {i === 0
                      ? 'Jednoosobowa działalność'
                      : 'Spółka'}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

{step === 'jdg' && (
  <motion.div
    key="jdg"
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
      {/* Profil */}
      <motion.button
        custom={0}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={buttonVariants}
        // onClick={() => handleJdgChoice('profil')}
        className=""
      >
        <Link
          href="/formularz-profil"
          className="block w-full h-12 bg-[#002a5c] text-white rounded hover:bg-[#001e47] transition flex items-center justify-center text-center"
        >
          Profil z opiniami
        </Link>
      </motion.button>

      {/* Opinie – jako link */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={buttonVariants}
      >
        <Link
          href="/formularz-opinie"
          className="block w-full h-12 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition flex items-center justify-center text-center text-sm"
        >
          Pojedyńcze opinie
        </Link>
      </motion.div>
    </div>
  </motion.div>
)}

        </AnimatePresence>
      </div>

      {/* Przycisk WSTECZ pod spodem – absolutny */}
      {step !== 'start' && (
        <button
          onClick={() => setStep('start')}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← Wstecz
        </button>
      )}
    </div>
  );
}
