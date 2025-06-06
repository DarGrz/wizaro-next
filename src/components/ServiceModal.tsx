'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceModal({ isOpen, onClose }: ServiceModalProps) {
  const [step, setStep] = useState<'options'>('options');
  
  // Zamknij modal i zresetuj stan po zamknięciu
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('options');
      }, 300);
    }
  }, [isOpen]);

  // Animacje
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { scale: 0.95, opacity: 0, y: 10 },
    visible: { scale: 1, opacity: 1, y: 0 }
  };

  const serviceOptions = [
    {
      title: 'Usunięcie profilu firmy z opiniami',
      description: 'Kompleksowe usunięcie profilu firmy wraz ze wszystkimi opiniami',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18"></path>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
      ),
      href: '/formularz-profil',
      color: 'bg-[#002a5c] hover:bg-[#001e47] text-white'
    },
    {
      title: 'Usunięcie pojedynczych opinii',
      description: 'Usunięcie wybranych negatywnych opinii o Twojej firmie',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          <line x1="9" y1="11" x2="15" y2="11"></line>
          <line x1="9" y1="15" x2="13" y2="15"></line>
        </svg>
      ),
      href: '/formularz-opinie',
      color: 'bg-gray-100 hover:bg-gray-200 text-gray-800'
    },
    {
      title: 'Usunięcie firmy z Google',
      description: 'Usunięcie profilu i danych Twojej firmy z Google Maps i Google Moja Firma',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
          <path d="M4 17l3-3 2 4 3-6 3 5 3-4 3 3"></path>
        </svg>
      ),
      href: '/formularz-profil',
      color: 'bg-gray-100 hover:bg-gray-200 text-gray-800'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div 
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            transition={{ duration: 0.2 }}
          >
            {/* Close button */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700 z-10"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-8">
              {step === 'options' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Jak możemy Ci pomóc?
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Wybierz usługę, która najlepiej odpowiada Twoim potrzebom
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceOptions.map((option, index) => (
                      <Link href={option.href} key={index} onClick={onClose}>
                        <motion.div 
                          className={`${option.color} rounded-lg p-5 flex items-start gap-4 transition-shadow hover:shadow-md cursor-pointer h-full`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex-shrink-0">
                            {option.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{option.title}</h3>
                            <p className="text-sm opacity-90">{option.description}</p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                      Nie wiesz, co wybrać? Zadzwoń do nas: <a href="tel:+48792861513" className="text-[#002a5c] font-medium">+48 792 861 513</a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
