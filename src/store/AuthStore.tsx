import { create } from "zustand";
import { persist } from "zustand/middleware";
import { postRefreshToken, postSignIn } from "@/api/auth";

interface AuthStore {
  user: { id: number; name: string; email: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  renewToken: (refreshToken: string) => Promise<void>;
}

const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      login: async (email, password) => {
        const userData = await postSignIn({ email, password });
        if (userData) {
          set({
            user: userData.user,
            accessToken: userData.accessToken,
            refreshToken: userData.refreshToken,
            isLoggedIn: true,
          });
        }
      },
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isLoggedIn: false,
        }),
      renewToken: async (refreshToken) => {
        const data = await postRefreshToken(refreshToken);
        if (data) {
          set({
            accessToken: data.accessToken,
          });
        }
      },
    }),
    { name: "auto-storage" }
  )
);

export default useAuthStore;
