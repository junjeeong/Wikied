const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["sprint-fe-project.s3.ap-northeast-2.amazonaws.com"], // 여기에 호스트명을 추가
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
