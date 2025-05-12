import { proxy } from "./axios";
import { AxiosError } from "axios";
import handleSuccess from "@/api/handleSuccess";
import handleError from "@/api/handleError";

// 알림 목록 조회
export const getNotifications = async () => {
  try {
    const res = await proxy.get(`/api/notifications/`);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 알림 삭제
export const deleteNotifications = async (id: number) => {
  try {
    const res = await proxy.delete(`/api/notifications/${id}`);
    return handleSuccess(res);
  } catch (err) {
    return handleError(err as AxiosError);
  }
};
