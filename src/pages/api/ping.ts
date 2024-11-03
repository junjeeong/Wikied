import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import instance from "@/api/axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  switch (req.method) {
    case "POST":
      // 프로필 수정 중 갱신 로직
      const { code } = req.query.body;
      try {
        const response = await instance.post(
          `/profiles/${code}/ping`,
          req.body.content,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(201).json(response.data);
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "프로필 수정 중 갱신에 실패했습니다." });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
