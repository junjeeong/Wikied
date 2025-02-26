import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { AxiosError } from "axios";
import instance from "@/api/axios";
import handleSuccess from "@/pages/api/handleSuccess";
import handleError from "@/pages/api/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  const { id } = req.query;
  if (!id) {
    return res
      .status(400)
      .json({ ok: false, data: null, message: "유효하지 않은 알림 ID입니다." });
  }

  switch (req.method) {
    case "DELETE":
      // 알림 삭제
      try {
        const response = await instance.delete(`/notifications/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return handleSuccess(res, response.data, "알림 삭제에 성공했습니다.");
      } catch (err) {
        return handleError(
          res,
          err as AxiosError,
          "알림 삭제 중 오류가 발생했습니다."
        );
      }

    default:
      res.setHeader("Allow", ["DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
