import instance, { proxy } from "./axios";

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
}; 

// 로그인
export const postSignIn = async (body: PostSignInQuery) => {
  const res = await proxy.post(`/api/signIn`, body);
  if (res.status >= 200 && res.status < 300) return res.data;
};
