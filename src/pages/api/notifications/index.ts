import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { AxiosError } from "axios";
import {instance} from "@/api/axios";
import handleSuccess from "@/pages/api/handleSuccess";
import handleError from "@/pages/api/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  if (!accessToken) {
    return res.status(400).json({
      ok: false,
      data: null,
      mesage: "accessToken이 존재하지 않습니다.",
    });
  }

  switch (req.method) {
    case "GET":
      // 알림 목록 조회
      try {
        const response = await instance.get(
          "/notifications?page=1&pageSize=2",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return handleSuccess(
          res,
          response.data,
          "알림목록 조회에 성공했습니다."
        );
      } catch (err) {
        handleError(
          res,
          err as AxiosError,
          "알림목록 조회 중 오류가 발생했습니다."
        );
      }
    default:
      res.setHeader("Allow", ["GET"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
