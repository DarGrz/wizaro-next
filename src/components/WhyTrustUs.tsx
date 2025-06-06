"use client";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function WhyTrustUs() {
  const features = [
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3EA34B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M8 11l3 3 5-5"></path>
        </svg>
      ), 
      title: "Legalność i skuteczność działania",
      description: "Wszystkie nasze działania są w pełni zgodne z prawem. Osiągamy wysoką skuteczność dzięki sprawdzonym metodom."
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3EA34B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
          <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
          <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ), 
      title: "Ponad 2000 zrealizowanych zleceń",
      description: "Nasze doświadczenie mówi samo za siebie. Zaufało nam już ponad 2000 zadowolonych klientów."
    },
    { 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3EA34B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
          <line x1="1" y1="10" x2="23" y2="10"></line>
          <path d="M12 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
        </svg>
      ), 
      title: "Zwrot pieniędzy – bez ryzyka",
      description: "Jeśli nie osiągniemy oczekiwanych rezultatów, zwrócimy Ci pieniądze. Ty nie ryzykujesz - my działamy."
    },
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
      <div className="max-w-6xl mx-auto px-4 text-center" ref={ref}>
        <motion.h2
          className="text-3xl font-bold text-gray-900 mb-3"
          initial="hidden"
          animate={controls}
          variants={itemVariants}
        >
          Dlaczego warto nam zaufać?
        </motion.h2>
        
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-12"
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          transition={{ delay: 0.2 }}
        >
          Jesteśmy ekspertami w usuwaniu niepożądanych informacji o firmach z internetu.
          Działamy szybko, skutecznie i zawsze zgodnie z prawem.
        </motion.p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 h-full"
              initial="hidden"
              animate={controls}
              variants={itemVariants}
              transition={{ duration: 0.4, delay: index * 0.2 }}
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
