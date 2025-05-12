import { AxiosError } from "axios";
import { instance, proxy } from "./axios";
import handleSuccess from "@/api/handleSuccess";
import handleError from "@/api/handleError";

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
  try {
    const res = await instance.post(`/auth/signUp`, body);
    return handleSuccess(res, "회원가입에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
}; //예외처리를 singUp 페이지에서 하고, 에러 메세지를 처리함

// 로그인
export const postSignIn = async (body: PostSignInQuery) => {
  try {
    const res = await proxy.post(`/auth/signIn`, body);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err as AxiosError);
  }
};
