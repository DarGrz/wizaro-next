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
          
         
        </div>
      </div>
    </main>
  );
}
