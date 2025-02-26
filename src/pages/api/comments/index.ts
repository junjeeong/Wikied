import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import instance from "@/api/axios";
import handleError from "@/pages/api/handleError";
import { AxiosError } from "axios";
import handleSuccess from "@/pages/api/handleSuccess";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  switch (req.method) {
    case "POST":
      // 댓글 등록 로직
      const articleId = req.query.id;
      if (!articleId) {
        return res.status(400).json({
          ok: false,
          data: null,
          message: "유효하지 않은 게시글 ID입니다.",
        });
      }

      try {
        const response = await instance.post(
          `/articles/${articleId}/comments`,
          req.body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return handleSuccess(res, response.data, "댓글 등록에 성공했습니다");
      } catch (err) {
        return handleError(res, err as AxiosError, "댓글 등록에 실패했습니다.");
      }

    case "PATCH":
      // 댓글 등록 로직
      const commentId = req.query.commentId;
      if (!commentId)
        if (!commentId) {
          return res.status(400).json({
            ok: true,
            data: null,
            message: "유효하지 않은 댓글 ID입니다.",
          });
        }
      try {
        const response = await instance.patch(
          `/articles/comments/${commentId}`,
          req.body.content,
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
      const { commentId: deleteId } = req.query;
      if (!deleteId) {
        return res.status(400).json({
          ok: true,
          data: null,
          message: "유효하지 않은 댓글 ID입니다.",
        });
      }
      try {
        const response = await instance.delete(`/comments/${deleteId}`, {
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
      res.setHeader("Allow", ["POST", "PATCH", "DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
