import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import instance from "@/api/axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  const { commentId } = req.query;
  if (!commentId)
    if (!commentId) {
      return res.status(400).json({ message: "수정할 댓글 ID가 없습니다." });
    }

  switch (req.method) {
    case "PATCH":
      // 댓글 등록 로직
      try {
        const response = await instance.patch(
          `/articles/comments/${commentId}`,
          req.body,
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
      try {
        const response = await instance.delete(`/comments/${commentId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json(response.data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "댓글 삭제에 실패했습니다." });
      }

    default:
      res.setHeader("Allow", ["PATCH", "DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
