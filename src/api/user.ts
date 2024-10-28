import instance from "./axios";

interface PatchUserQuery {
  passwordConfirmation: string;
  password: string;
  currentPassword: string;
}

// 유저 정보를 받아오는 함수
export const getUser = async () => {
  const token = localStorage.getItem("accessToken");

  try {
    const res = await instance.get(`/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("유저 정보를 불러오지 못했습니다.", err);
    return {};
  }
};

// 새로운 비밀번호와 현재 비밀번호를 data로 받아서 변경하는 함수
export const patchUser = async (data: PatchUserQuery) => {
  const token = localStorage.getItem("accessToken");

  try {
    const res = await instance.patch(`/users/me/password`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("비밀번호 변경에 실패하였습니다.", err);
    return {};
  }
};
