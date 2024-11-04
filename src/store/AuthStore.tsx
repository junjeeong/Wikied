import { create } from "zustand";
import { persist } from "zustand/middleware"; // persist 미들웨어 import
import { postSignIn } from "@/api/auth";
import { postProfile } from "@/api/profile";
import { AxiosError } from "axios";
import { User } from "@/types/types";

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<string | undefined>;
  logout: () => void;
  updateProfile: (
    securityAnswer: string,
    securityQuestion: string
  ) => Promise<void>;
}

// persist 미들웨어에 타입을 추가합니다.
const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      login: async (email, password) => {
        try {
          const userData = await postSignIn({ email, password });
          if (userData) {
            set({
              user: userData.user,
              isLoggedIn: true,
            });
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
          isLoggedIn: false,
        });
      },
      updateProfile: async (securityAnswer, securityQuestion) => {
        const { user } = get();
        if (user) {
          const updatedProfileData = await postProfile({
            securityAnswer,
            securityQuestion,
          });
          set({
            user: {
              ...user,
              profile: {
                ...user.profile,
                ...updatedProfileData,
              },
            },
          });
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
