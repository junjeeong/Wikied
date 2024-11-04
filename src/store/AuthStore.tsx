import { create } from "zustand";
import { postSignIn } from "@/api/auth";
import { postProfile } from "@/api/profile";
import { AxiosError } from "axios";
import { User } from "@/types/types";

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<string | undefined>;
  logout: () => void;
  updateProfile: (
    securityAnswer: string,
    securityQuestion: string
  ) => Promise<void>;
  setAccessToken: (token: string) => void;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,
  login: async (email, password) => {
    try {
      const userData = await postSignIn({ email, password });
      if (userData) {
        set({
          user: userData.user,
          accessToken: userData.accessToken,
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
      accessToken: null,
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
  setAccessToken: (token: string) => set({ accessToken: token }),
}));

export default useAuthStore;
