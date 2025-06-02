import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
  details: {
    [key: string]: {
      message: string;
    };
  };
}

const handleError = (err: AxiosError) => {
  return {
    ok: false,
    data: err,
    message:
      (err.response?.data as ErrorResponse).message ||
      "서버에 오류가 발생했습니다.",
  };
};

export default handleError;
