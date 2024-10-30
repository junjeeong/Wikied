const nextConfig = {
  reactStrictMode: true,
  images: {
<<<<<<< HEAD
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "cdn.pixabay.com",
=======
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
>>>>>>> b650dee849b14b71edf8f40e264f111b185c14bb
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
