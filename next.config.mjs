/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
      config.resolve.fallback = { 
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
      return config;
    },
  };
  
  export default nextConfig;