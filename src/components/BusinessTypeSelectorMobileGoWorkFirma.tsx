'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function BusinessTypeSelectorMobileGoWorkFirma() {
  return (
    <div className="relative w-full mx-auto mt-5 px-2">
      <div className="bg-white rounded p-6 w-full h-[280px] overflow-hidden flex flex-col justify-between relative">
        <motion.div
          key="start"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 p-6 flex flex-col justify-center items-center"
        >
          <div className="h-[100px] flex flex-col items-center justify-center w-full">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-3">
              Usuń firmę z GoWork
            </h1>
            <p className="text-gray-600 text-center text-sm sm:text-sm mb-6">
              Skutecznie usuniemy niechciane profile firm i wizytówki biznesowe z serwisu GoWork. 
              Kliknij <strong>START</strong> i wypełnij prosty formularz, resztą zajmiemy się my.
            </p>
            <Link
              href="/formularz-profil-bazy"
              className="w-full max-w-xs h-12 bg-[#002a5c] text-white rounded py-2 font-semibold text-lg hover:bg-[#001e47] transition flex items-center justify-center"
            >
              START
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
