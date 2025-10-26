// components/PixelTracker.tsx
"use client";

import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

const PixelTracker = () => {
  useEffect(() => {
    // Check if we're running in the browser
    if (typeof window === 'undefined') return;
    
    const pixelId = "1324995137950790";
    
    try {
      // Initialize Facebook Pixel
      ReactPixel.init(pixelId, undefined, {
        autoConfig: true, // Enable automatic configuration
        debug: false, // Set to true for debugging
      });
      
      // Track page view
      ReactPixel.pageView();
      
      // Optional: Track custom events
      ReactPixel.track('PageView');
    } catch (error) {
      console.warn('Facebook Pixel initialization failed:', error);
    }
  }, []);

  return null;
};

export default PixelTracker;