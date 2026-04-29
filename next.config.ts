import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "kimoti.sasabase.com" }],
        destination: "/kimoti-map",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
