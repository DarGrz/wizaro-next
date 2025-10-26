import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TopFooter from "@/components/TopFooter";
import VisitorTracker from "@/components/VisitorTracker";
import GTMPageViewTracker from "@/components/GTMPageViewTracker";
import PixelTracker from "@/components/PixelTracker";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wizaro.pl - Ochrona Wizerunku Online",
  description:
    "Wizaro.pl to usługi ochrony wizerunku w sieci - usuwania opinii i profili z katologów firmowych. Zgłoś się do nas, aby usunąć swoje dane z Map Google , Gowork, Aleo, Panorama firm i PKT.pl.",
  keywords:
    "ochrona wizerunku, usuwanie opinii, usuwanie danych z internetu, usuwanie firmy z Google, usuwanie wizytówek Google, usuwanie danych z katalogów, GoWork, Aleo, Panorama Firm, PKT.pl, usuwanie profilu z GoWork, czyszczenie wizerunku w sieci, reputacja online, usuwanie negatywnych opinii, usuwanie informacji z Google",
    icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Open Graph tags for social sharing */}
        <meta property="og:title" content="Wizaro.pl - Ochrona Wizerunku Online" />
        <meta property="og:description" content="Usuwamy szkodliwe opinie z internetu. Szybko i dyskretnie usuniemy informacje o Twojej firmie – legalnie i bez zbędnych komplikacji." />
        <meta property="og:image" content="https://wizaro.pl/images/wizaro-share.png" />
        <meta property="og:url" content="https://wizaro.pl" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Wizaro.pl" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wizaro.pl - Ochrona Wizerunku Online" />
        <meta name="twitter:description" content="Usuwamy szkodliwe opinie z internetu. Szybko i dyskretnie usuniemy informacje o Twojej firmie – legalnie i bez zbędnych komplikacji." />
        <meta name="twitter:image" content="https://wizaro.pl/images/wizaro-share.png" />
        
        {/* Cookiebot implementation with client-only approach to avoid hydration errors */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="39c85a43-3ea8-4832-b299-aadec8adf0fc"
          data-blockingmode="auto"
          strategy="afterInteractive"
        />
        <Script id="CookiebotConfig" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined') {
              window.addEventListener('CookiebotOnLoad', function () {
                if (Cookiebot && Cookiebot.consent && Cookiebot.consent.preferences) {
                  // Handle preferences consent
                }
              });
            }
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W72NWNSH');
          `}
        </Script>
               {/* End Google Tag Manager */}

        <Script id="schema-markup" type="application/ld+json" strategy="beforeInteractive">
          {`
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": "https://wizaro.pl",
            "name": "Wizaro.pl - Ochrona Wizerunku Online",
            "image": "https://wizaro.pl/images/wizaro-logo.png",
            "description": "Wizaro.pl to usługi ochrony wizerunku w sieci - usuwania opinii i profili z katologów firmowych. Zgłoś się do nas, aby usunąć swoje dane z Map Google , Gowork, Aleo, Panorama firm i PKT.pl.",
            "url": "https://wizaro.pl",
            "telephone": "792 861 513",
            "email": "kontakt@wizaro.pl",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "PL",
              "addressLocality": "Kraków"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "50.0615",
              "longitude": "19.9425"
            },
            "areaServed": {
              "@type": "Country",
              "name": "PL"
            },
            "priceRange": "$$",
            "openingHours": "Mo-Fr 09:00-17:00",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Usługi ochrony wizerunku online",
              "itemListElement": [
                {
                  "@type": "Service",
                  "name": "Usuwanie opinii z Google",
                  "description": "Profesjonalna pomoc w usuwaniu negatywnych opinii z Google Maps i innych platform",
                  "serviceType": "Ochrona wizerunku",
                  "provider": {
                    "@type": "Organization",
                    "name": "Wizaro.pl"
                  },
                  "areaServed": "PL",
                  "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://wizaro.pl/usuwanie-opinii-google"
                  }
                },
                {
                  "@type": "Service",
                  "name": "Usuwanie firmy z Google",
                  "description": "Kompleksowa usługa usuwania wizytówek i profili firmowych z Google",
                  "serviceType": "Ochrona wizerunku",
                  "provider": {
                    "@type": "Organization",
                    "name": "Wizaro.pl"
                  },
                  "areaServed": "PL",
                  "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://wizaro.pl/usuwanie-firmy-z-google"
                  }
                },
                {
                  "@type": "Service",
                  "name": "Usuwanie firmy z Aleo",
                  "description": "Profesjonalne usuwanie profili firmowych z portalu Aleo.com",
                  "serviceType": "Ochrona wizerunku",
                  "provider": {
                    "@type": "Organization",
                    "name": "Wizaro.pl"
                  },
                  "areaServed": "PL",
                  "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://wizaro.pl/usuwanie-firmy-aleo"
                  }
                },
                {
                  "@type": "Service",
                  "name": "Usuwanie firmy z GoWork",
                  "description": "Profesjonalne usuwanie profili i opinii z portalu GoWork.pl",
                  "serviceType": "Ochrona wizerunku",
                  "provider": {
                    "@type": "Organization",
                    "name": "Wizaro.pl"
                  },
                  "areaServed": "PL",
                  "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://wizaro.pl/usuwanie-firmy-gowork"
                  }
                }
              ]
            }
          }
        `}
        </Script>

      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Script id="supabase-config" strategy="beforeInteractive">
          {`
            window.__SUPABASE_URL__ = "${process.env.SUPABASE_URL}";
            window.__SUPABASE_ANON_KEY__ = "${process.env.SUPABASE_ANON_KEY}";
          `}
        </Script>
        
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W72NWNSH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <VisitorTracker />
        {/* GTM pageview tracker for SPA navigation */}
        <GTMPageViewTracker />
        <PixelTracker />
        <Header />
        {children}
        <TopFooter />
        <Footer />
      </body>
    </html>
  );
}
