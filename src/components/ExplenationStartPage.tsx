"use client";

import { motion } from "framer-motion";

const ExplenationStartPage = () => {
  return (
    <div className="w-full grid gap-6 text-left mt-20 px-4 text-[#0D2959] overflow-hidden">
      <h2 className="text-lg font-semibold text-center text-[#0D2959]">
        Jak to działa?
      </h2>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          1. Wskazujesz, co chcesz usunąć
        </h3>
        <p className="text-sm text-[#0D2959]">
          Podajesz linki do miejsc w internecie, z których chcesz usunąć dane o swojej firmie lub niechciane opinie. 
          Im więcej informacji przekażesz, tym szybciej możemy działać.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          2. Korzystamy ze sprawdzonych metod
        </h3>
        <p className="text-sm text-[#0D2959]">
          Mamy doświadczenie, wypracowane procedury i rozwiązania techniczne, które pozwalają skutecznie rozwiązywać takie problemy. 
          Wiemy, jak działać, aby osiągnąć efekty – legalnie i dyskretnie.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-md font-semibold mb-2 text-[#0D2959]">
          3. Szybko realizujemy zgłoszenie
        </h3>
        <p className="text-sm text-[#0D2959]">
          Działamy od razu po otrzymaniu zgłoszenia. Większość spraw rozwiązujemy w ciągu{" "}
          <strong className="text-[#5FA054]">kilku dni roboczych</strong>. 
          Informujemy Cię o postępach i finalnym usunięciu danych lub opinii.
        </p>
      </motion.div>
    </div>
  );
};

export default ExplenationStartPage;
