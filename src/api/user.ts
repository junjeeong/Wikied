import instance from "./axios";

interface PatchUserQuery {
  teamId: string;
  formData: {
    currentPassword: string;
    newPassword: string;
  };
}

export const getUser = async (teamId: string) => {
  try {
    const res = await instance.get(`/${teamId}/users/me`);
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 400) {
      return {}; // undefined를 반환하는 것이 아닌 빈 객체를 반환하게 함.
    }
  } catch (err) {
    // 오류가 발생한 경우에도 빈 객체를 반환
    console.log("유저 정보를 불러오지 못했습니다.", err);
    return {};
  }
};

// 새로운 비밀번호와 현재 비밀번호를 formData로 받아서 변경하는 함수
export const patchUser = async (query: PatchUserQuery) => {
  const { teamId, formData } = query;
  const { currentPassword, newPassword } = formData;

  try {
    const res = await instance.patch(`/${teamId}/users/me/password`, {
      passwordConfirmation: newPassword,
      password: newPassword,
      currentPassword: currentPassword,
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    // 오류가 발생한 경우에도 빈 객체를 반환
    console.log("유저 정보를 불러오지 못했습니다.", err);
    return {};
  }
};
