import { AxiosError } from "axios";
import { instance, proxy } from "@/api/axios";
import { PatchBody } from "@/types/types";
import handleError from "@/api/handleError";
import handleSuccess from "@/api/handleSuccess";

interface GetProfilesQuery {
  page?: number;
  pageSize?: number;
  name?: string;
}

interface PostProfileQuery {
  securityAnswer: string;
  securityQuestion: string;
}

export interface PostProfilePingQuery {
  securityAnswer: string;
}

interface PatchProfileQuery {
  code: string;
  body: PatchBody;
}

// 프로필 목록 조회
export const getProfiles = async (query: GetProfilesQuery = {}) => {
  const baseUrl = "/profiles";
  const page = query?.page || 1;
  const pageSize = query?.pageSize || 10;

  const queryString = `?page=${page}&pageSize=${pageSize}&name=${
    query?.name || ""
  }`;
  try {
    const res = await instance.get(`${baseUrl}${queryString}`);

    return handleSuccess(res, "프로필 목록 조회에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 프로필 이름 조회
export const getProfilesByName = async (query: GetProfilesQuery = {}) => {
  const baseUrl = "/profiles";
  const page = query?.page || 1;
  const pageSize = query?.pageSize || 3;
  const name = query?.name || "";
  const queryString = `?page=${page}&pageSize=${pageSize}&name=${name}`;

  try {
    const res = await instance.get(`${baseUrl}${queryString}`);

    // 이름 검색과 관련한 api 요청은 totalCount도 받아야 하기 때문에 data까지만 return
    return handleSuccess(
      res,
      "해당하는 이름의 프로필을 조회하는데 성공했습니다."
    );
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

//사용자 프로필 조회
export const getUserProfile = async (code: string) => {
  try {
    const res = await instance.get(`/profiles/${code}`);
    return handleSuccess(res, "사용자 프로필 조회에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

export const patchProfile = async (query: PatchProfileQuery) => {
  const { code, body } = query;

  try {
    const res = await proxy.patch(`/api/profiles/${code}`, body);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 프로필 수정 중 체크
export const getProfilePing = async (code: string) => {
  try {
    const res = await instance.get(`/profiles/${code}/ping`);
    return handleSuccess(res, "프로필 수정중 확인 요청에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 프로필 생성
export const postProfile = async (body: PostProfileQuery) => {
  try {
    const res = await proxy.post(`/api/profiles`, body);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 프로필 수정 중 갱신
export const postProfilePing = async (
  content: PostProfilePingQuery,
  code: string
) => {
  try {
    const res = await proxy.post(`/api/profiles/${code}`, content);
    return handleSuccess(res);
  } catch (err) {
    handleError(err as AxiosError);
  }
};
