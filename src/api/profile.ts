import instance from "./axios";

interface GetProfilesQuery {
  page: number;
  pageSize: number;
  name: string;
}

interface PostProfileQuery {
  securityAnswer: string;
  securityQuestion: string;
}

// 프로필 목록 조회
export const getProfiles = async (query: GetProfilesQuery) => {
  const { page = 1, pageSize = 10, name = "" } = query;

  try {
    const res = await instance.get(
      `/profiles?page=${page}&pageSize=${pageSize}&name=${name}`
    );
    if (res.status === 200) {
      return res.data.list;
    }
  } catch (err) {
    console.error("프로필 정보들을 불러오지 못했습니다.", err);
    return {};
  }
};

// 프로필 생성
export const postProfile = async (body: PostProfileQuery) => {
  try {
    const res = await instance.post(`/profiles`, body);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error("프로필 등록에 실패했습니다.", err);
    return {};
  }
};

// 프로필 수정, 프로필 수정 중 체크, 프로필 수정 중 갱신 api 구현해야 함
