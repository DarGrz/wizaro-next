// components/PixelTracker.ts
import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

const PixelTracker = () => {
    useEffect(() => {
      const pixelId = "1324995137950790";
      ReactPixel.init(pixelId);
      ReactPixel.pageView();
    }, []);
    return null;
  };
  export default PixelTracker;