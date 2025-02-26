import { AxiosResponse } from "axios";

const handleSuccess = (res: AxiosResponse, message: string) => {
  return {
    ok: true,
    data: res.data,
    message: message,
  };
};

export default handleSuccess;
