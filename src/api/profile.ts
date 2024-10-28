import instance from "@/api/axios";

interface GetProfilesQuery {
  page?: number;
  pageSize?: number;
  name?: string;
}

interface PostProfileQuery {
  securityAnswer: string;
  securityQuestion: string;
}

interface PostProfilePingQuery {
  securityAnswer: string;
}

// 프로필 목록 조회
export const getProfiles = async (query: GetProfilesQuery) => {
  const baseUrl = "/profiles";
  const page = query?.page || 1;
  const pageSize = query?.name ? 3 : query?.pageSize || 10; // name이 있는 경우 불러오는 데이터 개수를 3으로 설정

  const queryString = `?page=${page}&pageSize=${pageSize}&name=${query?.name || ""}`;

  try {
    const res = await instance.get(`${baseUrl}${queryString}`);

    // name이 있는 경우 data를 반환하고(totalCount도 받아야 하기 때문), 그렇지 않으면 list를 반환
    return query?.name ? res.data : res.data.list;
  } catch (err) {
    console.error("프로필 정보들을 불러오지 못했습니다.", err);
    return [];
  }
};

//사용자 프로필 조회
export const getUserProfile = async (code: string) => {
  try {
    const res = await instance.get(`/profiles/${code}`);
    return res;
  } catch (err) {
    console.error("프로필 정보들을 불러오지 못했습니다.", err);
    return;
  }
};

// 프로필 생성
export const postProfile = async (body: PostProfileQuery) => {
  const token = localStorage.getItem("accessToken");
  try {
    const res = await instance.post(`/profiles`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("프로필 등록에 실패했습니다.", err);
    return {};
  }
};

// 프로필 수정 중 체크
export const postProfilePing = async (
  body: PostProfilePingQuery,
  code: string
) => {
  const token = localStorage.getItem("accessToken");

  const res = await instance.post(`/profiles/${code}/ping`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

// 프로필 수정, 프로필 수정 중 갱신 api 구현해야 함
