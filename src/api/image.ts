import instance from "./axios";

// 이미지 업로드
export const postImage = async (data: FormData) => {
  const res = await instance.post(`/images/upload`, data);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};
