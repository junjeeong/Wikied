import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import instance from "@/api/axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ message: "수정할 프로필 code가 없습니다." });
  }

  switch (req.method) {
    case "PATCH":
      // 프로필 수정 로직
      try {
        const response = await instance.patch(`/profiles/${code}`, req.body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json(response.data);
      } catch (err) {
        return res.status(500).json({ message: "프로필 수정에 실패했습니다." });
      }
    case "POST":
      // 프로필 수정 중 갱신 로직
      try {
        const response = await instance.post(
          `/profiles/${code}/ping`,
          req.body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(201).json(response.data);
      } catch (err) {
        return res
          .status(500)
          .json({ message: "프로필 수정 중 갱신에 실패했습니다." });
      }

    default:
      res.setHeader("Allow", ["PATCH", "POST"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
