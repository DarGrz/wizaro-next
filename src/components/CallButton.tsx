"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CallButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      // Widoczny tylko między 7:00 a 21:30
      const isWithinHours = (hour > 7 || (hour === 7 && minutes >= 0)) && 
                           (hour < 21 || (hour === 21 && minutes <= 30));
      setIsVisible(isWithinHours);
    };

    // Sprawdź od razu
    checkTime();

    // Sprawdzaj co minutę
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleCall = () => {
    // Tutaj można dodać numer telefonu lub akcję
    window.location.href = "tel:+48 792 861 513"; // Zmień na właściwy numer
  };

  // Nie pokazuj przycisku poza godzinami 7:00-21:30
  if (!isVisible) {
    return null;
  }

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }
        
        .shimmer-animation {
          animation: shimmer 3.5s infinite;
        }
      `}</style>
      
      <motion.button
        onClick={handleCall}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group relative inline-flex items-center justify-center px-9 py-3 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:shadow-xl hover:scale-105 overflow-hidden"
      >
        {/* Animacja błysku od lewej do prawej - cały czas */}
        <div className="shimmer-animation absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        
        {/* Ikona telefonu na białym okrągłym tle */}
        <div className="relative z-10 flex items-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
            <svg 
              className="w-5 h-5 text-blue-500 group-hover:rotate-12 transition-transform duration-300" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
            </svg>
          </div>
          <span className="relative">Zadzwoń</span>
        </div>
      </motion.button>
    </>
  );
}
