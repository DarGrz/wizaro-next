// components/GuaranteeSection.tsx
import { ShieldCheck } from "lucide-react";

export default function GuaranteeSection() {
  return (
    <section className="py-16 px-2 sm:px-6 lg:px-8 rounded">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-full shadow-sm">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Płatność za rezultat
        </h2>
        <p className="text-gray-700 text-lg mb-2">
         
          <span className="font-medium text-gray-900">Płacisz dopiero po tym, jak usuniemy Twoje opinie lub profile</span>.
        </p>
        <p className="text-gray-600">
          Działamy skutecznie, bez ryzyka po Twojej stronie.
        </p>
      </div>
    </section>
  );
}
