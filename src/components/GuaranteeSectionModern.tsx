'use client';

import { Shield, CheckCircle, Star, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const guaranteeFeatures = [
  {
    icon: CheckCircle,
    title: "Bez zaliczek",
    description: "Płatność tylko za skuteczne usunięcie",
    color: "text-emerald-500"
  },
  {
    icon: Shield,
    title: "100% Legalnie",
    description: "Działamy zgodnie z przepisami RODO",
    color: "text-blue-500"
  },
  {
    icon: Star,
    title: "Gwarancja jakości",
    description: "Kompleksowe rozwiązanie problemu",
    color: "text-amber-500"
  },
  {
    icon: TrendingUp,
    title: "Szybkie rezultaty",
    description: "Zaczynamy działania w ciągu 24h",
    color: "text-purple-500"
  }
];

export default function GuaranteeSectionModern() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-emerald-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full mb-6 shadow-xl">
            <Award className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            Płatność za rezultat
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Działamy na zasadzie: <span className="font-semibold text-emerald-600">płacisz tylko wtedy, gdy osiągniemy założony cel</span>
            
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {guaranteeFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative"
            >
              <div className={`
                bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 
                transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
                ${hoveredCard === index ? 'ring-2 ring-blue-200 shadow-2xl' : 'shadow-lg'}
              `}>
                <div className="flex items-start space-x-4">
                  <div className={`
                    p-3 rounded-xl transition-all duration-300
                    ${hoveredCard === index ? 'bg-gradient-to-br from-blue-500 to-emerald-500 text-white scale-110' : 'bg-gray-50'}
                  `}>
                    <feature.icon className={`w-6 h-6 ${hoveredCard === index ? 'text-white' : feature.color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover effect decoration */}
                {hoveredCard === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom emphasis box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl p-8 text-center text-white shadow-2xl">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                Bezpieczeństwo i transparentność
              </h3>
              
              <p className="text-emerald-100 text-lg mb-6 max-w-2xl mx-auto">
                Bez ukrytych kosztów, bez zaliczek. Rozpoczynamy działania natychmiast, 
                a Ty płacisz dopiero po osiągnięciu sukcesu.
              </p>
              
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Gwarancja satysfakcji</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}