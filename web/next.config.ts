import type { NextConfig } from "next";

/**
 * The portal runs next to the legacy Blazor portal on the same domain: everything
 * served by this app lives under /app, and everything else is still the Blazor
 * portal. See docs/NEXTJS-MIGRACAO.md.
 */
const nextConfig: NextConfig = {
  basePath: "/app",
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
