import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  api: {
    bodyParser: false, // ⛔️ wyłącza automatyczne parsowanie
  },
};

export default nextConfig;
