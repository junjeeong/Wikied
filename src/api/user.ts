import { proxy } from "./axios";

export interface PatchUserQuery {
  passwordConfirmation: string;
  password: string;
  currentPassword: string;
}

// 유저 정보를 받아오는 함수
export const getUser = async () => {
  const res = await proxy.get(`/api/user`);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};

// 새로운 비밀번호와 현재 비밀번호를 data로 받아서 변경하는 함수
export const patchUser = async (body: PatchUserQuery) => {
  const res = await proxy.patch(`/api/user`, body);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};
