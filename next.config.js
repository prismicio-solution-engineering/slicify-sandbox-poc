import path from 'path';

/** @type {import('next').NextConfig} */

const nextConfig = async () => {
  return {
    experimental:{
      outputFileTracingRoot: path.join(process.cwd(), './slices/')
    },
    reactStrictMode: true,
    images: {
      loader: "imgix",
      path: "https://images.prismic.io/",
    },
    // typescript: {
    //   ignoreBuildErrors: true,
    // },
  };
};

module.exports = nextConfig;
