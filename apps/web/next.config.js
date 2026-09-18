/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disable strict mode for faster dev
  transpilePackages: ['@aequus/curve-presets'],
  
  // Optimize production builds
  swcMinify: true,

  // Webpack optimization
  webpack: (config, { isServer }) => {
    config.optimization = {
      ...config.optimization,
      minimize: !isServer,
      usedExports: true,
      sideEffects: false,
    };

    // Exclude heavy SDKs in browser builds
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },

  // Experimental features for faster dev
  experimental: {
    optimizePackageImports: ['@solana/web3.js', '@irys/sdk'],
  },
};

module.exports = nextConfig;
