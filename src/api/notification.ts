import instance from "./axios";

interface GetNotificationsQuery {
  teamId: string;
  page: number;
  pageSize: number;
}

interface DeleteNotificationsQuery {
  teamId: string;
  id: number;
}

// 알림 목록 조회
export const getNotifications = async (query: GetNotificationsQuery) => {
  const { teamId, page = 1, pageSize = 10 } = query;

  try {
    const res = await instance.get(`/${teamId}/notifications`);
    if (res.status === 200) {
      return res.data.list;
    }
  } catch (err) {
    console.log("알림 목록을 불러오지 못했습니다.", err);
    return {};
  }
};

// 알림 삭제
export const deleteNotifications = async (query: DeleteNotificationsQuery) => {
  const { teamId, id } = query;

  try {
    const res = await instance.delete(`/${teamId}/notifications/${id}`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("알림 목록을 삭제하는데 실패하였습니다.", err);
    return {};
  }
};
