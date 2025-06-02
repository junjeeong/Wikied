import { AxiosError } from "axios";
import { NextApiResponse } from "next";

const handleError = (
  res: NextApiResponse,
  err: AxiosError,
  defaultMessage: string
) => {
  return res.status(err.response?.status || 500).json(err.response?.data);
};

export default handleError;
