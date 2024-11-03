import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import instance from "@/api/axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  switch (req.method) {
    case "GET":
      // 알림 목록 조회
      try {
        const response = await instance.get(
          "/notifications?page=1?pageSize=10",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(201).json(response.data);
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .json({ message: "알림 목록 조회에실패했습니다." });
      }

    case "DELETE":
      // 알림 삭제
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: "삭제할 알림 ID가 없습니다." });
      }
      try {
        const response = await instance.delete(`/notifications/${id}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json(response.data);
      } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "알림 삭제에 실패했습니다." });
      }

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
