'use client'

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import TopFooter from "@/components/TopFooter"

function Spinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  )
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <Analytics />
      <Header />
      {children}
      <TopFooter />
      <Footer />
    </>
  )
}
