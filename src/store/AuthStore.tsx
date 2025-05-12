import { create } from "zustand";
import { persist } from "zustand/middleware"; // persist 미들웨어 import
import { postSignIn } from "@/api/auth";
import { postProfile } from "@/api/profile";
import { AxiosError } from "axios";
import { User } from "@/types/types";

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ status: number; message: any; ok: boolean } | undefined>;
  logout: () => void;
  updateProfile: (
    securityAnswer: string,
    securityQuestion: string
  ) => Promise<{ status: number; message: any; ok: boolean } | undefined>;
}

// persist 미들웨어에 타입을 추가합니다.
const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      login: async (email, password) => {
        try {
          const res = await postSignIn({ email, password });
          if (res.data) {
            set({
              user: res.data.user,
              isLoggedIn: true,
            });
            return {
              status: 200,
              message: "로그인에 성공하였습니다.",
              ok: true,
            };
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            return {
              status: 400,
              message: error,
              ok: false,
            };
          }
        }
      },
      logout: () => {
        set({
          user: null,
          isLoggedIn: false,
        });
        return {
          status: 200,
          message: "로그아웃에 성공하였습니다.",
          ok: true,
        };
      },
      updateProfile: async (securityAnswer, securityQuestion) => {
        const { user } = get();
        if (user) {
          const res = await postProfile({
            securityAnswer,
            securityQuestion,
          });
          set({
            user: {
              ...user,
              profile: {
                ...user.profile,
                ...res.data,
              },
            },
          });
          return {
            status: 200,
            message: "프로필 업데이트에 성공했습니다.",
            ok: true,
          };
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
