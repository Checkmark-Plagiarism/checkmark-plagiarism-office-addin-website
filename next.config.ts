import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old support guide is now part of the one-page site.
      { source: "/support-document", destination: "/#install", permanent: true },
      // The add-in manifest's SupportUrl (Word's Help link) points at /help. Keep it working, and
      // use a temporary redirect so the target section can change without browsers caching it.
      { source: "/help", destination: "/#support", permanent: false },
    ];
  },
};

export default nextConfig;
