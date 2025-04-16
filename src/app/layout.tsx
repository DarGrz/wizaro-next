import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TopFooter from "@/components/TopFooter";
import VisitorTracker from "@/components/VisitorTracker";

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
    "Wizaro.pl to usługi usuwania danych osobowych z internetu. Zgłoś się do nas, aby usunąć swoje dane z Google, Gowork, Aleo, Panorama firm i PKT.pl.",
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
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="39c85a43-3ea8-4832-b299-aadec8adf0fc"
          data-blockingmode="auto"
          strategy="beforeInteractive"
          type="text/javascript"
        />
        <Script id="CookiebotConfig" strategy="beforeInteractive">
          {`window.addEventListener('CookiebotOnLoad', function () {
            if (Cookiebot.consent.preferences) {
              // Handle preferences consent
            }
          });`}
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
      </head>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W72NWNSH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <VisitorTracker />
        <Header />
        {children}
        <TopFooter />
        <Footer />
      </body>
    </html>
  );
}
