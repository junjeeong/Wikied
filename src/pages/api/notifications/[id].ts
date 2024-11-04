import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import instance from "@/api/axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ message: "삭제할 알림 ID가 없습니다." });
  }

  switch (req.method) {
    case "DELETE":
      // 알림 삭제
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
      res.setHeader("Allow", ["DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
