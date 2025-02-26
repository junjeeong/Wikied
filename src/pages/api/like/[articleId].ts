import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { AxiosError } from "axios";
import {instance} from "@/api/axios";
import handleSuccess from "@/pages/api/handleSuccess";
import handleError from "@/pages/api/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;
  const { articleId } = req.query;

  if (!accessToken) {
    return res.status(400).json({
      ok: false,
      data: null,
      message: "accessToken이 존재하지 않습니다.",
    });
  }

  if (!articleId) {
    return res.status(400).json({
      ok: false,
      data: null,
      message: "유효하지 않은 게시글 ID입니다.",
    });
  }

  switch (req.method) {
    case "POST":
      // 좋아요 등록 로직
      try {
        const response = await instance.post(
          `/articles/${articleId}/like`,
          "",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return handleSuccess(res, response.data, "좋아요 등록에 성공했습니다.");
      } catch (err) {
        return handleError(
          res,
          err as AxiosError,
          "좋아요 등록 중 오류가 발생했습니다."
        );
      }

    case "DELETE":
      // 좋아요 취소 로직
      try {
        const response = await instance.delete(`/articles/${articleId}/like`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return handleSuccess(res, response.data, "좋아요 취소에 성공했습니다.");
      } catch (err) {
        return handleSuccess(
          res,
          err as AxiosError,
          "좋아요 취소 중 오류가 발생했습니다."
        );
      }

    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
