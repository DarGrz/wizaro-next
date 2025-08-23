import { Metadata, Viewport } from 'next';
import MobileFormApp from './MobileFormApp';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: 'Szybki Formularz - Usuwanie Opinii i Profili | Wizaro',
  description: 'Szybki i prosty formularz do zgłaszania problemów z opiniami i profilami firm w Google Maps, Gowork, Aleo. Mobilna aplikacja internetowa.',
  keywords: [
    'szybki formularz',
    'usuwanie opinii',
    'usuwanie profili',
    'Google Maps',
    'Gowork',
    'Aleo',
    'mobilna aplikacja',
    'formularz online'
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Szybki Formularz - Usuwanie Opinii i Profili',
    description: 'Prosty formularz do zgłaszania problemów z opiniami i profilami firm online.',
    type: 'website',
    locale: 'pl_PL',
  },
  alternates: {
    canonical: '/szybki-formularz',
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Szybki Formularz
            </h1>
            {/* <p className="text-gray-600 text-lg">
              Pomoc w sprawach pomówień online
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Profesjonalne usuwanie nieprawdziwych opinii i profili
            </p> */}
          </div>
          
          <MobileFormApp />
          
          <div className="mt-8 text-center">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#5BA155] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-gray-900">Gwarancja rezultatu</span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Bezpieczne i dyskretne usuwanie nielegalnych treści.<br />
                Płatność dopiero po wykonaniu usługi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
