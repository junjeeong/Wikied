import axios from "axios";

const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/9-3/",
  // timeout: 1000,
});

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 에러인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 방지 플래그

      try {
        // 액세스 토큰 갱신 요청 -> 클라이언트의 쿠키가 새로운 액세스 토큰으로 갱신됨
        await axios.post("/api/refresh-token");
        // 원래 요청 다시 시도
        return instance(originalRequest);
      } catch (err) {
        console.error("액세스 토큰 갱신 실패:", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
