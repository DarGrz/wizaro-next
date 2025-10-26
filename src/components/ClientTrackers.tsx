"use client";

import dynamic from "next/dynamic";

// Dynamic import dla komponentów używających window aby uniknąć problemów z SSR
const PixelTracker = dynamic(() => import("@/components/PixelTracker"), {
  ssr: false,
  loading: () => null
});

const VisitorTracker = dynamic(() => import("@/components/VisitorTracker"), {
  ssr: false,
  loading: () => null
});

export default function ClientTrackers() {
  return (
    <>
      <VisitorTracker />
      <PixelTracker />
    </>
  );
}