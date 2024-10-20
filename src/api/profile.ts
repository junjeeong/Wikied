import instance from "./axios";

interface GetProfileQuery {
  teamId: string;
  page: number;
  pageSize: number;
  name: string;
}

interface PostProfileQuery {
  teamId: string;
  securityAnswer: string;
  securityQuestion: string;
}

export const getProfile = async (query: GetProfileQuery) => {
  const { teamId, page = 1, pageSize = 10, name = "" } = query;

  try {
    const res = await instance.get(`/${teamId}/profiles`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("프로필 정보들을 불러오지 못했습니다.", err);
    return {};
  }
};

export const postProfile = async (query: PostProfileQuery) => {
  const { teamId, securityAnswer, securityQuestion } = query;

  try {
    const res = await instance.get(`/${teamId}/profiles`, {
      securityAnswer: securityAnswer,
      securityQuestion: securityQuestion,
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("프로필 등록에 실패했습니다.", err);
    return {};
  }
};

// 프로필 수정, 프로필 수정 중 체크, 프로필 수정 중 갱신 api 구현해야 함
