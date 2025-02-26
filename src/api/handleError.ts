import { AxiosError } from "axios";

const handleError = (err: AxiosError) => {
  console.log("api 함수를 불러오던 도중 오류가 발생했습니다.", err);

  return {
    ok: false,
    status: err.response?.status || 500,
    message: err.response?.statusText || "서버에 오류가 발생했습니다.",
  };
};

export default handleError;
