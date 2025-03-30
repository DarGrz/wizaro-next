import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Wizaro.pl - Usuwanie danych osobowych i firmowych z internetu",
  description:
    "Wizaro.pl to usługi usuwania informacji z internetu. Zgłoś się do nas, aby usunąć swoje dane z Google, Gowork, Aleo, Panorama firm i PKT.pl.",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <head>
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="39c85a43-3ea8-4832-b299-aadec8adf0fc"
          data-blockingmode="auto"
          type="text/javascript"
          async
        ></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
