const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.pixabay.com"], // 외부 이미지 도메인 추가
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
