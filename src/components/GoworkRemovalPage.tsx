"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function GoworkRemovalPage() {
  const router = useRouter();
  const [isStarted, setIsStarted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"profile" | "opinion" | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setIsStarted(true);
    setShowOptions(true);
  };

  const handleOptionSelect = (option: "profile" | "opinion") => {
    setSelectedOption(option);
    setTimeout(() => {
      if (option === "profile") {
        router.push("/formularz-profil-spolka");
      } else {
        router.push("/formularz-opinie");
      }
    }, 800);
  };  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50">
      {/* Animated background elements */}
      <AnimatedBackground />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 border-t-4 border-b-4 border-[#002a5c] rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Ładowanie...</p>
          </motion.div>
        ) : (
          <motion.div
            className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="mb-6 text-3xl font-semibold text-center text-[#002a5c]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Masz problem z Gowork?
            </motion.h1>

            {!showOptions ? (
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <button
                  onClick={handleStart}
                  disabled={isStarted}
                  className={`px-8 py-4 text-lg font-semibold text-white transition-all transform rounded-md ${
                    isStarted ? "bg-[#5BA155]" : "bg-[#002a5c] hover:bg-[#001e47]"
                  } shadow-md focus:outline-none`}
                >
                  {isStarted ? "Rozpoczynamy..." : "Start"}
                </button>
              </motion.div>
            ) : (              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-700 text-center mb-4">Wybierz czego dotyczy problem:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleOptionSelect("profile")}
                    disabled={selectedOption !== null}
                    className={`px-6 py-4 text-base font-medium text-white transition-all transform rounded-md ${
                      selectedOption === "profile" ? "bg-[#5BA155]" : "bg-[#002a5c] hover:bg-[#001e47]"
                    } shadow-md focus:outline-none`}
                  >
                    Usuwanie profilu
                  </button>
                  <button
                    onClick={() => handleOptionSelect("opinion")}
                    disabled={selectedOption !== null}
                    className={`px-6 py-4 text-base font-medium text-white transition-all transform rounded-md ${
                      selectedOption === "opinion" ? "bg-[#5BA155]" : "bg-[#002a5c] hover:bg-[#001e47]"
                    } shadow-md focus:outline-none`}
                  >
                    Usuwanie opinii
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Subtle background elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#002a5c]/5"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: `blur(${Math.random() * 2 + 1}px)`,
          }}
          initial={{ opacity: 0.1 }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle lines */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute bg-[#002a5c]/5"
          style={{
            width: Math.random() * 150 + 100,
            height: 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 180}deg)`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.1, 0],
            width: [100, Math.random() * 200 + 150],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Very light pulsing effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#002a5c]/5"
        style={{ width: 300, height: 300, filter: "blur(80px)" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
