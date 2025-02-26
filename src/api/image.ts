import { instance, proxy } from "./axios";

// 이미지 업로드
export const postImage = async (data: FormData) => {
  try {
    const getAccessToken = await proxy.post("api/refresh-token");
    const { accessToken } = getAccessToken.data;

    const res2 = await instance.post(`/images/upload`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res2.status >= 200 && res2.status < 300) {
      return res2.data;
    }
  } catch (error) {
    console.error("이미지 업로드에 실패했습니다.", error);
    return {};
  }
};
