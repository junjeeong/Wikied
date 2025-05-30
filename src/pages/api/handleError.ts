import { AxiosError } from "axios";
import { NextApiResponse } from "next";

const handleError = (
  res: NextApiResponse,
  err: AxiosError,
  defaultMessage: string
) => {
  console.error(`API Route Error occurred: ${err.message}`);
  return res.status(err.response?.status || 500).json({
    ok: false,
    data: err,
    message: err.message || defaultMessage,
  });
};

export default handleError;
