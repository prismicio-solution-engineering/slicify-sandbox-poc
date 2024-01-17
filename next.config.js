/** @type {import('next').NextConfig} */

const nextConfig = async () => {
  return {
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
