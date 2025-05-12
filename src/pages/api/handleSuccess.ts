import { NextApiResponse } from "next";

const handleSuccess = (
  res: NextApiResponse,
  data: any,
  message: string,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    ok: true,
    data,
    message,
  });
};

export default handleSuccess;
