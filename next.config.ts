import type { NextConfig } from "next";

const dev = process.env.NODE_ENV === "development";

export const nextConfig: NextConfig = {
  reactCompiler: !dev,
  reactStrictMode: true,
  output: "export",
  experimental: {
    esmExternals: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    webpackBuildWorker: true,
  },
  transpilePackages: ["@date-fns/tz"],
  turbopack: {
    resolveAlias: {
      "material-symbols/*": "@material-symbols/svg-700/outlined/*",
    },
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
