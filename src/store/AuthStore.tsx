import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postSignIn } from "@/api/auth";
import { postProfile } from "@/api/profile";
import { AxiosError } from "axios"; // AxiosError import

interface Profile {
  updatedAt: string;
  securityQuestion: string;
  teamId: string;
  content: string;
  nationality: string;
  family: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

interface User {
  id: number;
  email: string;
  name: string;
  teamId: string;
  updatedAt: string;
  createdAt: string;
  profile: Profile | null;
}

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<string | undefined>; //반환 타입 수정
  logout: () => void;
  setAccessToken: (token: string) => void; // Access Token을 업데이트하는 함수 추가
  createProfile: (
    securityAnswer: string,
    securityQuestion: string
  ) => Promise<void>; // 프로필 업데이트 함수 추가
}

const useAuthStore = create(
  persist<AuthStore>(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      login: async (email, password) => {
        try {
          const userData = await postSignIn({ email, password });
          if (userData) {
            set({
              user: userData.user,
              accessToken: userData.accessToken,
              refreshToken: userData.refreshToken,
              isLoggedIn: true,
            });
            localStorage.setItem("accessToken", userData.accessToken);
            localStorage.setItem("refreshToken", userData.refreshToken);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            return error.response?.data.message;
          }
        }
      },
      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      },
      setAccessToken: (token) => {
        set({ accessToken: token });
        localStorage.setItem("accessToken", token);
      },
      createProfile: async (securityAnswer, securityQuestion) => {
        const { user } = get();
        if (user) {
          // API를 통해 프로필 업데이트
          const createddProfileData = await postProfile({
            securityAnswer,
            securityQuestion,
          });

          // 프로필 업데이트 후 상태에 반영
          set({
            user: {
              ...user,
              profile: {
                ...user.profile,
                ...createddProfileData,
              },
            },
          });
        }
      },
    }),

    {
      name: "auto-storage",
    }
  )
);

export default useAuthStore;
