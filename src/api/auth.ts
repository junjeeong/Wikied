import instance from "./axios";

interface PostSignUpQuery {
  teamId: string;
  body: {
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
  };
}

interface PostSignInQuery {
  teamId: string;
  body: {
    email: string;
    password: string;
  };
}
interface PostRefreshTokenQuery {
  teamId: string;
  body: {
    refreshToken: string;
  };
}

// 회원가입
export const postSignUp = async (query: PostSignUpQuery) => {
  const { teamId, body } = query;

  try {
    const res = await instance.post(`/${teamId}/auth/signUp`, body);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("회원가입에 실패했습니다.", err);
    return {};
  }
};

// 로그인
export const postSignIn = async (query: PostSignInQuery) => {
  const { teamId, body } = query;

  try {
    const res = await instance.post(`/${teamId}/auth/signIn`, body);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("로그인에 실패했습니다.", err);
    return {};
  }
};

// 토큰 재갱신
export const postRefreshToken = async (query: PostRefreshTokenQuery) => {
  const { teamId, body } = query;

  try {
    const res = await instance.post(`/${teamId}/auth/refresh-token`, body);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("토큰 재갱신에 실패했습니다.", err);
    return {};
  }
};

// 서버 인증설정에 따라서 Authorization을 바디에 넣을지 axios 설정을 witnCren
