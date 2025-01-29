import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MOVIEDB_API_KEY: process.env.NEXT_PUBLIC_MOVIEDB_API_KEY,
    TMDB_API_TOKEN: process.env.TMDB_API_TOKEN,
    TMDB_BASE_URL: process.env.TMDB_BASE_URL,
  },
};

export default nextConfig;
