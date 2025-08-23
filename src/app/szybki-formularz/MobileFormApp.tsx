'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function MobileFormApp() {
  const [step, setStep] = useState<'start' | 'platform' | 'google-type' | 'other-type'>('start');

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: 'easeOut',
      },
    }),
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.3 }
    }
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
    <div className="relative w-full mx-auto">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 'start' && (
            <motion.div
              key="start"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="p-8 min-h-[350px] flex flex-col justify-center items-center text-center"
            >
              <div className="mb-8">
                <div className="w-12 h-12 bg-[#002a5c]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-6 h-6 text-[#002a5c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                 Ochrona Wizerunku w Internecie
                </h2>
                <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
                  Bez zbędnych komplikacji, w pełni legalnie i dyskretnie. 

                  <strong>&nbsp;Kliknij START</strong> żeby rozpocząć, resztą zajmiemy się my.
                </p>
              </div>
              
              <motion.button
                onClick={() => setStep('platform')}
                className="w-full max-w-xs h-12 bg-[#002a5c] text-white rounded font-semibold text-lg shadow-md hover:bg-[#001e47] transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                START
              </motion.button>
            </motion.div>
          )}

          {step === 'platform' && (
            <motion.div
              key="platform"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="p-8 min-h-[350px] flex flex-col"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Skąd chcesz usunąć?
                </h2>
                <p className="text-gray-600 ">
                  Wybierz miejsce, z którego chcesz usunąć dane firmy lub opinie
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-4 justify-center">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <button
                    onClick={() => setStep('google-type')}
                    className="w-full h-12 bg-[#002a5c] text-white rounded font-semibold hover:bg-[#001e47] transition-all duration-200 flex items-center justify-center shadow-md"
                  >
                    <span>Mapy Google</span>
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
                    className="w-full h-12 bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center justify-center shadow-md"
                  >
                    <span>Gowork, Aleo i więcej</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
          
          {step === 'google-type' && (
            <motion.div
              key="google-type"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="p-8 min-h-[350px] flex flex-col"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Co chcesz usunąć z Google?
                </h2>
                <p className="text-gray-600 ">
                  Wybierz czy chcesz usunąć cały profil firmy, czy pojedyncze opinie
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-4 justify-center">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <Link
                    href={getLink('google-profile')}
                    className="w-full h-12 bg-[#002a5c] text-white rounded font-semibold hover:bg-[#001e47] transition-all duration-200 flex items-center justify-center shadow-md"
                  >
                    <span>Profil firmy</span>
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
                    className="w-full h-12 bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center justify-center shadow-md"
                  >
                    <span>Opinie</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === 'other-type' && (
            <motion.div
              key="other-type"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="p-8 min-h-[350px] flex flex-col"
            >
              <div className="text-center mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Co chcesz usunąć?
                </h2>
                <p className="text-gray-600 text-sm">
                  Wybierz czy chcesz usunąć cały profil firmy, czy pojedyncze opinie
                </p>
              </div>

              <div className="flex-1 flex flex-col gap-4 justify-center">
                <motion.div
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={buttonVariants}
                >
                  <Link
                    href={getLink('gowork-aleo-profile')}
                    className="w-full h-12 bg-[#002a5c] text-white rounded font-semibold hover:bg-[#001e47] transition-all duration-200 flex items-center justify-center shadow-md"
                  >
                    <span>Profil firmy</span>
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
                    className="w-full h-12 bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300 transition-all duration-200 flex items-center justify-center shadow-md"
                  >
                    <span>Opinie</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step !== 'start' && (
        <div className="text-center mt-6">
          <button
            onClick={() => {
              if (step === 'google-type' || step === 'other-type') {
                setStep('platform');
              } else {
                setStep('start');
              }
            }}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#002a5c] transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Wstecz
          </button>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg className="w-5 h-5 text-[#5BA155]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.602-4.777l1.13 1.13A8.502 8.502 0 0118 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8c1.878 0 3.606.649 4.97 1.738l1.13 1.13" />
            </svg>
            <span className="text-sm font-semibold text-gray-900">100% Legalne</span>
          </div>
          <p className="text-xs text-gray-600">
            Wszystkie działania wykonujemy zgodnie z obowiązującym prawem
          </p>
        </div>
      </div>
    </div>
  );
}
