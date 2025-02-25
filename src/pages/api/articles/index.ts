import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { AxiosError } from "axios";
import instance from "@/api/axios";
import handleError from "@/pages/api/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  switch (req.method) {
    case "POST":
      // 게시글 등록 로직
      try {
        const response = await instance.post("/articles", req.body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(201).json({
          ok: true,
          data: response.data,
          message: "게시글 등록에 성공했습니다.",
        });
      } catch (err) {
        return handleError(
          res,
          err as AxiosError,
          "게시글 등록에 실패했습니다."
        );
      }

    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
