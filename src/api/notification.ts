import instance from "./axios";

// 알림 목록 조회
export const getNotifications = async () => {
  const res = await instance.get(`/api/notifications/`);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return [];
};

// 알림 삭제
export const deleteNotifications = async (id: number) => {
  const res = await instance.delete(`/api/notifications/${id}`);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};
