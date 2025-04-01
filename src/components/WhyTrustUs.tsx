"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function WhyTrustUs() {
  const features = [
    { icon: "", title: "Legalność i skuteczność działania" },
    { icon: "", title: "Ponad 2000 zrealizowanych zleceń" },
    { icon: "", title: "Zwrot pieniędzy – bez ryzyka" },
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-2 text-center" ref={ref}>
        <motion.h2
          className="text-2xl font-semibold text-gray-900 mb-10"
          initial="hidden"
          animate={controls}
          variants={itemVariants}
        >
          Dlaczego warto nam zaufać?
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded shadow p-6 flex flex-col items-center justify-center hover:shadow-lg transition"
              initial="hidden"
              animate={controls}
              variants={itemVariants}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <div className="text-4xl text-[#5FA054] mb-4">{feature.icon} </div>
              <p className="text-[#0D2959] font-semibold">{feature.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
