"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import GuaranteeSectionModern from "./GuaranteeSectionModern";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function CompanySearchUnozg2() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-4 py-4 sm:py-16">
        <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-3xl md:text-6xl font-bold text-[#002a5c] mb-4 sm:mb-6 leading-tight px-4 mt-15">
            Potrzebujesz pomocy?<br />
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Skorzystaj z naszych profesjonalnych usług ochrony reputacji i zarządzania danymi firmowymi.
          </p>
          
          {/* Supported Portals Badge */}
          <motion.div 
            variants={fadeInUp}
            className="mt-6 sm:mt-8 flex flex-col items-center"
          >
            <div className="inline-flex items-center mb-3">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-gray-700">Obsługiwane portale:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto px-4">
              {['ALEO', 'GoWork', 'Panorama Firm', 'Biznes Finder', 'PKT.pl', 'Podobne Firmy', 'Puls Biznesu', 'Znany Lekarz', '...i dużo więcej'].map((portal, index) => (
                <motion.span
                  key={portal}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200 hover:from-blue-100 hover:to-cyan-100 hover:border-blue-300 transition-all duration-300 hover:scale-105"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  {portal}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
        
        {/* Company Protection Section */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 max-w-4xl sm:max-w-6xl mx-auto"
        >
          <div className="bg-gradient-to-br from-slate-900 via-[#002a5c] to-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-16 text-center border-b border-slate-600/30">
              <div className="inline-block p-2 sm:p-3 bg-white/10 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight px-4">
                Chroń Swoją Firmę
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
                Dbaj o reputację swojej firmy w internecie. Odzyskaj pozytywny wizerunek online.
              </p>
            </div>

            {/* Features Grid */}
            <div className="px-4 sm:px-8 md:px-16 py-8 sm:py-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Feature 1 */}
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="inline-block p-2 sm:p-3 bg-blue-500/20 rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Kontrola Danych</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Przejmij kontrolę nad swoimi danymi firmowymi.</p>
                </div>

                {/* Feature 2 */}
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="inline-block p-2 sm:p-3 bg-green-500/20 rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:bg-green-500/30 transition-colors duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Nowy Początek</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Świeża obecność online dla Twojego biznesu.</p>
                </div>

                {/* Feature 3 */}
                <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <div className="inline-block p-2 sm:p-3 bg-purple-500/20 rounded-lg sm:rounded-xl mb-3 sm:mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Bezpieczne Rozwiązania</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Profesjonalne i legalne zarządzanie danymi.</p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="px-4 sm:px-8 md:px-16 text-center mt-8 sm:mt-12 md:mt-16 pb-8 sm:pb-12 md:pb-16">
              <div className="inline-flex flex-col gap-3 sm:gap-4 w-full max-w-sm sm:max-w-none sm:flex-row sm:w-auto">
                <a href="tel:+48792861513" className="group relative inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:from-blue-500 hover:to-cyan-400 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="relative">Skontaktuj się z nami</span>
                </a>
                <Link
                  href="/"
                  className="group inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 hover:bg-white/20 hover:border-white/50"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Dowiedz się więcej
                </Link>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm mt-4 sm:mt-6 max-w-2xl mx-auto">
                Bezpłatna konsultacja • Pełna dyskrecja • Gwarancja rezultatów
              </p>
            </div>
          </div>
        </motion.div>
        
        {/* Social Proof Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 max-w-4xl sm:max-w-6xl mx-auto"
        >
          <div className="bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/30 rounded-2xl sm:rounded-3xl shadow-xl border border-blue-100/50 overflow-hidden">
            <div className="px-4 sm:px-8 py-8 sm:py-12 text-center">
              {/* Quote Icon */}
              <div className="inline-block p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-6 sm:mb-8">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              
              {/* Testimonial */}
              <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-slate-800 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
                &ldquo;Dzięki Wizaro.pl w końcu mam spokój z konkurencją&rdquo;
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg sm:text-xl">M</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-slate-800 text-base sm:text-lg">Michał K.</div>
                  <div className="text-slate-600 text-sm sm:text-base">Właściciel restauracji</div>
                </div>
              </div>
              
              {/* Stars */}
              <div className="flex justify-center mt-4 sm:mt-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Guarantee Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 max-w-4xl sm:max-w-6xl mx-auto"
        >
          <GuaranteeSectionModern />
        </motion.div>
      </div>
    </motion.div>
  );
}