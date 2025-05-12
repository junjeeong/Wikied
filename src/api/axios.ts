import axios, { AxiosInstance } from "axios";

export const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/9-3/",
});

export const proxy = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000" // 개발 모드
      : "https://wikied-api.vercel.app/9-3/", // 프로덕션 모드
});

// 응답 인터셉터
const setupInterceptors = (instance: AxiosInstance) => {
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
          // 액세스 토큰 갱신 요청
          await proxy.post("/api/refresh-token"); // 'proxy' 인스턴스를 사용
          // 원래 요청 다시 시도
          return instance(originalRequest);
        } catch (err) {
          console.error("액세스 토큰 갱신 실패:", err);
          return Promise.reject(err);
        }
      }

      // error.response가 undefined일 경우를 처리
      if (!error.response) {
        console.error("응답이 없습니다:", error);
        return Promise.reject(new Error("응답이 없습니다."));
      }

      return Promise.reject(error);
    }
  );
};

setupInterceptors(instance);
setupInterceptors(proxy);
