import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import instance from "@/api/axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  switch (req.method) {
    case "GET":
      // 게시글 조회 로직
      const { articleId } = req.query;

      try {
        if (!articleId) {
          // 게시글 목록 조회
          const response = await instance.get("/articles/", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          return res.status(200).json(response.data);
        } else {
          // 특정 게시글 조회
          const response = await instance.get(`/articles/${articleId}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          return res.status(200).json(response.data);
        }
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "게시글 조회에 실패했습니다." });
      }

    case "POST":
      // 게시글 등록 로직
      try {
        const response = await instance.post("/articles", req.body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(201).json(response.data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "게시글 등록에 실패했습니다." });
      }

    case "PATCH":
      // 게시글 수정 로직
      const { articleId: updateId } = req.query;
      if (!updateId) {
        return res
          .status(400)
          .json({ message: "수정할 게시글 ID가 없습니다." });
      }
      try {
        const response = await instance.patch(
          `/articles/${updateId}`,
          req.body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(200).json(response.data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "게시글 수정에 실패했습니다." });
      }

    case "DELETE":
      const targetId = req.query.id;
      if (!targetId) {
        return res
          .status(400)
          .json({ message: "삭제할 게시글 ID가 없습니다." });
      }
      try {
        const response = await instance.delete(`/articles/${targetId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json(response.data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "게시글 삭제에 실패했습니다." });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
