import { proxy } from "./axios";
import { AxiosError } from "axios";
import handleSuccess from "@/api/handleSuccess";
import handleError from "@/api/handleError";

export interface PatchUserQuery {
  passwordConfirmation: string;
  password: string;
  currentPassword: string;
}

// 유저 정보를 받아오는 함수
export const getUser = async () => {
  try {
    const res = await proxy.get(`/api/user`);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 새로운 비밀번호와 현재 비밀번호를 data로 받아서 변경하는 함수
export const patchUser = async (body: PatchUserQuery) => {
  try {
    const res = await proxy.patch(`/api/user`, body);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err as AxiosError);
  }
};
