import { Metadata } from "next";
import { Suspense } from "react";
import FormularzGooglePage from "@/components/FormularzGooglePage";

export const metadata: Metadata = {
  title: "Formularz Google - Wybierz usługę | Wizaro.pl",
  description: "Wybierz odpowiednią usługę dla swojej wizytówki Google: usuwanie opinii, resetowanie wizytówki lub usuwanie wizytówki.",
  openGraph: {
    title: "Formularz Google - Wybierz usługę | Wizaro.pl",
    description: "Wybierz odpowiednią usługę dla swojej wizytówki Google: usuwanie opinii, resetowanie wizytówki lub usuwanie wizytówki.",
    images: ["https://wizaro.pl/images/wizaro-share.png"],
  },
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Ładowanie...</p>
      </div>
    </div>
  );
}

export default function FormularzGoogle() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <FormularzGooglePage />
    </Suspense>
  );
}