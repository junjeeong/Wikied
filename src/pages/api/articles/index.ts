import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import instance from "@/api/axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  const { articleId } = req.query;
  if (!articleId) {
    return res
      .status(400)
      .json({ message: "쿼리 파라미터에 게시글 ID가 없습니다." });
  }

  switch (req.method) {
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

    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
