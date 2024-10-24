import useAuthStore from "@/store/AuthStore";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/9-3/",
  // timeout: 1000,
});

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setAccessToken } = useAuthStore.getState(); // Zustand에서 상태값 가져오기

    if (error.response?.status === 401 && !originalRequest._retry) {
      // refresh-token API 호출
      const { data } = await instance.post("/auth/refresh-token", {
        refreshToken,
      });
      originalRequest._retry = true;

      if (data?.accessToken) {
        setAccessToken(data.accessToken); // 새로운 Access Token을 상태에 저장
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`; // 요청에 새로운 토큰 적용
      }

      return instance(originalRequest); // 원래 요청 재시도
    }
    return Promise.reject(error);
  }
);

export default instance;
