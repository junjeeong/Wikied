import instance from "./axios";

interface GetNotificationsQuery {
  page?: number;
  pageSize: number;
}

// 알림 목록 조회
export const getNotifications = async (query: GetNotificationsQuery) => {
  const { page = 1, pageSize = 10 } = query;

  try {
    const res = await instance.get(
      `/notifications?page=${page}&pageSize=${pageSize}`
    );
    if (res.status === 200) {
      return res.data.list;
    }
  } catch (err) {
    console.error("알림 목록을 불러오지 못했습니다.", err);
    return {};
  }
};

// 알림 삭제
export const deleteNotifications = async (id: number) => {
  try {
    const res = await instance.delete(`/notifications/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error("알림 목록을 삭제하는데 실패하였습니다.", err);
    return {};
  }
};
