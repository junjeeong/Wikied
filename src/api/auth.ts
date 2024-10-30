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

// 회원가입
export const postSignUp = async (body: PostSignUpQuery) => {
    const res = await instance.post(`/auth/signUp`, body);
    return res.data;
}; //예외처리를 singUp 페이지에서 하고, 에러 메세지를 처리함

// 로그인
export const postSignIn = async (body: PostSignInQuery) => {
  const res = await instance.post(`/auth/signIn`, body);
  try {
    const res = await instance.post(`/auth/signIn`, body);
    return res.data;
}; // 예외처리를 AuthStore에서 하고, login page에서 메세지를 돌려받음

// 토큰 재갱신
export const postRefreshToken = async (refreshToken: string) => {
  try {
    const res = await instance.post(`/auth/refresh-token`, {
      refreshToken: refreshToken,
    });
    return res.data;
  } catch (err) {
    console.error("토큰 재갱신에 실패했습니다.", err);
    return {};
  }
};
