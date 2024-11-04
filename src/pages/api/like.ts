import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import instance from "@/api/axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  switch (req.method) {
    case "POST":
      // 좋아요 등록 로직
      const articleId = req.query.id;
      if (!articleId) {
        return res
          .status(400)
          .json({ message: "좋아요를 등록할 게시글 ID가 없습니다." });
      }
      try {
        const response = await instance.post(
          `/articles/${articleId}/like`,
          "",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(201).json(response.data);
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "게시글 좋아요 등록에 실패했습니다." });
      }

    case "DELETE":
      // 좋아요 취소 로직
      const targetId = req.query.id;
      if (!targetId) {
        return res
          .status(400)
          .json({ message: "좋아요를 취소할 게시글 ID가 없습니다." });
      }
      try {
        const response = await instance.delete(`/articles/${targetId}/like`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json(response.data);
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "게시글 좋아요 취소에 실패했습니다." });
      }

    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
