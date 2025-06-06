// components/GuaranteeSection.tsx
import { ShieldCheck } from "lucide-react";

export default function GuaranteeSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8  rounded-xl">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-full shadow-md transform hover:scale-105 transition-all duration-300">
            <ShieldCheck className="w-12 h-12 text-emerald-600" strokeWidth={1.5} />
          </div>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 tracking-tight">
          Płatność za rezultat
        </h2>
        
        <div className=" backdrop-blur-sm p-6 rounded-lg shadow-sm border border-gray-100">
          <p className="text-gray-800 text-lg mb-3">
            <span className="font-semibold text-gray-900 inline-block border-b-2 border-emerald-500 pb-1">
              Płacisz dopiero po tym, jak usuniemy Twoje opinie lub profile
            </span>
          </p>
          
          <p className="text-gray-600">
            Działamy skutecznie, bez ryzyka po Twojej stronie.
          </p>
          
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span className="inline-block w-3 h-3 rounded-full bg-emerald-500"></span>
              <span>100% gwarancji</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
