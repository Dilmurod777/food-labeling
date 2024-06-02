/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/dashboard/products",
        permanent: true,
      },
      {
        source: "/dashboard/inventory",
        destination: "/dashboard/products",
        permanent: true,
      },
      {
        source: "/companies",
        destination: "/companies/all",
        permanent: true,
      },
    ];
  },
  transpilePackages: ["three"],
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },
};

module.exports = nextConfig;
