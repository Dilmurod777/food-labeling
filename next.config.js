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
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      canvas: "commonjs canvas",
    });
    return config;
  },
};

module.exports = nextConfig;
