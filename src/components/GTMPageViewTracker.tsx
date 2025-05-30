"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GTMPageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Extend window type for dataLayer
    const win = window as unknown as { dataLayer?: { push: (event: Record<string, unknown>) => void } };
    if (typeof window !== "undefined" && win.dataLayer && typeof win.dataLayer.push === "function") {
      win.dataLayer.push({
        event: "pageview",
        page: pathname,
      });
    }
  }, [pathname]);

  return null;
}
