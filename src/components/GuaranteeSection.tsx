// components/GuaranteeSection.tsx
import { ShieldCheck } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import Confetti from "react-confetti";
import React from "react";

// Fireworks animation styles
const canvasStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  zIndex: 999
};

export default function GuaranteeSection() {
  const [clickCount, setClickCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  
  // Use a function ref for the confetti instance
  // Type workaround: react-canvas-confetti does not type the function ref
  const refAnimationInstance = useRef<((opts: Record<string, unknown>) => void) | null>(null);

  // Handle resize for confetti dimensions
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Set initial size
    handleResize();
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fire fireworks
  const makeFireworks = useCallback(() => {
    const instance = refAnimationInstance.current;
    if (!instance) return;

    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaultOptions = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 0,
      particleCount: 50
    };

    // Launch multiple fireworks
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      // Fire from random positions at the bottom
      instance({
        ...defaultOptions,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
      instance({
        ...defaultOptions,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, 250);
  }, []);

  // Handle shield clicks
  const handleShieldClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // On 10th click, show confetti and fireworks
    if (newCount === 10) {
      setShowConfetti(true);
      makeFireworks();
      
      // Reset after 5 seconds
      setTimeout(() => {
        setShowConfetti(false);
        setClickCount(0);
      }, 5000);
    }
  };

  return (
    <section className="py-16 sm:px-6 lg:px-8 rounded-xl">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}
      
      {(
        React.createElement(
          ReactCanvasConfetti as React.ComponentType<{
            ref: (instance: ((opts: Record<string, unknown>) => void) | null) => void;
            style: React.CSSProperties;
          }>,
          {
            ref: (instance: ((opts: Record<string, unknown>) => void) | null) => { refAnimationInstance.current = instance; },
            style: canvasStyles
          }
        )
      )}
      
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div 
            className="bg-white p-4 rounded-full shadow-md transform hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={handleShieldClick}
            title={clickCount > 0 && clickCount < 10 ? `Kliknięto ${clickCount} z 10 razy` : ""}
          >
            <ShieldCheck className="w-12 h-12 text-[#5BA155]" strokeWidth={1.5} />
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
          Płatność za rezultat
        </h2>
        
        <div className=" backdrop-blur-sm p-6 rounded-lg  w-full">
          <p className="text-gray-800 text-lg mb-3">
            <span className="font-semibold text-gray-900 inline-block border-b-2 border-[#5BA155] pb-1">
            Opłata tylko jeśli usuniemy opinię.
            </span>
          </p>
          
          <p className="text-gray-600">Bez zaliczek i ukrytych kosztów.
          </p>
          
         
        </div>
      </div>
    </section>
  );
}
