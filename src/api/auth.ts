import { Axios, AxiosError, AxiosResponse } from "axios";
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

interface SignInResponse {
  ok: boolean;
  data: any;
  message: string;
}

// 회원가입
export const postSignUp = async (body: PostSignUpQuery) => {
  try {
    const res = await instance.post(`/auth/signUp`, body);
    return handleSuccess(res, "회원가입에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 로그인
export const postSignIn = async (
  body: PostSignInQuery
): Promise<SignInResponse> => {
  try {
    const res = await proxy.post(`/api/signIn`, body);
    return handleSuccess(res as AxiosResponse);
  } catch (err) {
    return handleError(err as AxiosError);
  }
};
