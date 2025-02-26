import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { AxiosError } from "axios";
import instance from "@/api/axios";
import handleError from "@/pages/api/handleError";
import handleSuccess from "@/pages/api/handleSuccess";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  const { commentId } = req.query;
  if (!commentId)
    if (!commentId) {
      return res.status(400).json({
        ok: false,
        data: null,
        message: "유효하지 않은 댓글 id입니다.",
      });
    }

  switch (req.method) {
    case "PATCH":
      // 댓글 등록 로직
      try {
        const response = await instance.patch(
          `/comments/${commentId}`,
          req.body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return handleSuccess(res, response.data, "댓글 수정에 성공했습니다");
      } catch (err) {
        return handleError(
          res,
          err as AxiosError,
          "댓글 수정 중 오류가 발생했습니다."
        );
      }

    case "DELETE":
      try {
        const response = await instance.delete(`/comments/${commentId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return handleSuccess(res, response.data, "댓글 삭제에 성공했습니다");
      } catch (err) {
        return handleError(
          res,
          err as AxiosError,
          "댓글 삭제 중 오류가 발생했습니다."
        );
      }

    default:
      res.setHeader("Allow", ["PATCH", "DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
