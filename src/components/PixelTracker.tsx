// components/PixelTracker.tsx
"use client";

import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

const PixelTracker = () => {
  useEffect(() => {
    const pixelId = "1324995137950790";
    
    // Initialize Facebook Pixel
    ReactPixel.init(pixelId, undefined, {
      autoConfig: true, // Enable automatic configuration
      debug: false, // Set to true for debugging
    });
    
    // Track page view
    ReactPixel.pageView();
    
    // Optional: Track custom events
    ReactPixel.track('PageView');
  }, []);

  return null;
};

export default PixelTracker;