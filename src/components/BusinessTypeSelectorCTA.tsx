'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function BusinessTypeSelectorCTA() {
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
    <div className="relative w-full">
      <div className="bg-[#081D44] text-white rounded-lg shadow-lg p-8 flex flex-col gap-6 min-h-[350px] overflow-hidden relative">
        <AnimatePresence mode="wait">
          {step === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-8 flex flex-col justify-center items-center"
            >
              <div className="flex flex-col items-center justify-center w-full">
                <h2 className="text-3xl font-bold text-white mb-3 text-center">
                  Skorzystaj z naszej pomocy
                </h2>
                <p className="text-gray-200 text-lg text-center mb-8">
                  Kliknij <strong>START</strong>, aby szybko poprawić swój wizerunek w internecie.
                </p>
                <button
                  onClick={() => setStep('platform')}
                  className="w-full max-w-xs h-14 bg-white text-[#081D44] rounded py-2 font-semibold text-lg hover:bg-gray-100 transition"
                >
                  START
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
              className="absolute inset-0 p-8 flex flex-col justify-between"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Z czym masz problem?
                </h2>
                <p className="text-gray-200 text-lg">
                  Wybierz platformę
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <button
                    onClick={() => setStep('google-type')}
                    className="w-full p-4 bg-white text-[#081D44] rounded-lg hover:bg-gray-100 transition flex items-center justify-center text-center font-semibold text-lg"
                  >
                    Mapy Google
                  </button>
                </motion.div>

                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <button
                    onClick={() => setStep('other-type')}
                    className="w-full p-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#081D44] transition flex items-center justify-center text-center font-semibold text-lg"
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
              className="absolute inset-0 p-8 flex flex-col justify-between"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Co chcesz usunąć z Google?
                </h2>
                <p className="text-gray-200 text-lg">
                  Wybierz typ treści
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >                  
                  <Link
                    href={getLink('google-profile')}
                    className="w-full p-4 bg-white text-[#081D44] rounded-lg hover:bg-gray-100 transition flex items-center justify-center text-center font-semibold text-lg"
                  >
                    Profil firmy
                  </Link>
                </motion.div>

                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <Link
                    href={getLink('google-reviews')}
                    className="w-full p-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#081D44] transition flex items-center justify-center text-center font-semibold text-lg"
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
              className="absolute inset-0 p-8 flex flex-col justify-between"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-3">
                  Co chcesz usunąć?
                </h2>
                <p className="text-gray-200 text-lg">
                  Wybierz typ treści
                </p>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >                  
                  <Link
                    href={getLink('gowork-aleo-profile')}
                    className="w-full p-4 bg-white text-[#081D44] rounded-lg hover:bg-gray-100 transition flex items-center justify-center text-center font-semibold text-lg"
                  >
                    Profil firmy
                  </Link>
                </motion.div>

                <motion.div
                  custom={1}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <Link
                    href={getLink('gowork-aleo-reviews')}
                    className="w-full p-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#081D44] transition flex items-center justify-center text-center font-semibold text-lg"
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