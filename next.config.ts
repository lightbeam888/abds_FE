import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    REACT_APP_BACKEND_URL: "http://localhost:5000",
  },
};

export default nextConfig;
