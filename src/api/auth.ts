import { error } from "console";
import instance from "./axios";


interface PostSignUpQuery {
    email: string;
    name?: string;
    password: string;
    passwordConfirmation?: string;
}

interface PostSignInQuery {
  email: string;
  password: string;
}
interface PostRefreshTokenQuery {
  teamId: string;
  body: {
    refreshToken: string;
  };
}

// 회원가입
export const postSignUp = async (body: PostSignUpQuery) => {
    const res = await instance.post(`/auth/signUp`, body);
    if (res.status === 200) {
      return res.data;
    } 
  }

// 로그인
export const postSignIn = async (body: PostSignInQuery) => {
    const res = await instance.post(`/auth/signIn`, body);
    if (res.status === 200) {
      return res.data;
};
}

// 토큰 재갱신 
export const postRefreshToken = async (body: PostRefreshTokenQuery) => {
  try {
    const res = await instance.post(`/auth/refresh-token`, body);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error("토큰 재갱신에 실패했습니다.", err);
    return {};
  }
};

// 서버 인증설정에 따라서 Authorization을 바디에 넣을지 axios 설정을 witnCren
