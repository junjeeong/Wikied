import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import instance from "@/api/axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  switch (req.method) {
    case "POST":
      // 댓글 등록 로직
      const articleId = req.query.id;
      if (!articleId)
        if (!articleId) {
          return res
            .status(400)
            .json({ message: "댓글을 등록할 게시글 ID가 없습니다." });
        }
      try {
        const response = await instance.post(
          `/articles/${articleId}/comments`,
          req.body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(201).json(response.data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "게시글 등록에 실패했습니다." });
      }

    case "PATCH":
      // 댓글 등록 로직
      const { commentId: patchComment } = req.query;
      if (!patchComment)
        if (!patchComment) {
          return res
            .status(400)
            .json({ message: "수정할 댓글 ID가 없습니다." });
        }
      try {
        const response = await instance.patch(
          `/articles/comments/${patchComment}`,
          req.body.content,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(201).json(response.data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "댓글 수정에 실패했습니다." });
      }

    case "DELETE":
      const { commentId: deleteComment } = req.query;
      if (!deleteComment) {
        return res.status(400).json({ message: "삭제할 댓글 ID가 없습니다." });
      }
      try {
        const response = await instance.delete(`/comments/${deleteComment}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json(response.data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "댓글 삭제에 실패했습니다." });
      }

    default:
      res.setHeader("Allow", ["POST", "PATCH", "DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
