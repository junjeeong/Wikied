import { NextApiRequest, NextApiResponse } from "next";
import { parse, serialize } from "cookie";
import { AxiosError } from "axios";
import instance from "@/api/axios";
import handleError from "@/pages/api/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const refreshToken = cookies.refreshToken;
  if (!refreshToken) {
    return res.status(400).json({ message: "리프레시 토큰이 없습니다." });
  }

  switch (req.method) {
    case "POST":
      try {
        const response = await instance.post("/auth/refresh-token", {
          refreshToken: refreshToken,
        });

        // 성공적으로 갱신되면 쿠키에 새로운 액세스 토큰을 설정
        const newAccessToken = response.data.accessToken;

        // 쿠키에 액세스 토큰을 설정 (옵션은 필요에 따라 조정)
        res.setHeader(
          "Set-Cookie",
          serialize("accessToken", newAccessToken, {
            httpOnly: true, // 클라이언트 자바스크립트에서 접근할 수 없도록 설정
            secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서만 secure 플래그 설정
            sameSite: "strict",
            maxAge: 60 * 60, // 1시간
            path: "/", // 쿠키의 경로
          })
        );

        // 성공 응답
        return res.status(200).json({
          ok: true,
          data: response.data.accessToken,
          message: "액세스 토큰이 갱신되었습니다.",
        });
      } catch (err) {
        handleError(
          res,
          err as AxiosError,
          "액세스 토큰 재갱신에 실패하였습니다."
        );
      }
    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
