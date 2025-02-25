import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { AxiosError } from "axios";
import instance from "@/api/axios";
import handleError from "@/pages/api/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const response = await instance.post("/auth/signIn", req.body);

      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const userData = response.data.user;

      // accessToken과 refreshToken을 쿠키에 저장
      res.setHeader("Set-Cookie", [
        serialize("accessToken", accessToken, {
          httpOnly: true, // 브라우저에서 악성 스크립트로 쿠키에 접근 불가 -> XXS 공격을 보완
          secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서만 secure 옵션 사용, 개발자 환경에서는 HTTP 연결에서도 쿠키를 전송할 수 있는 편의 제공.
          sameSite: "strict", // 같은 도메인끼리만 쿠키를 주고받을 수 있음 -> CSRF 보완
          maxAge: 60 * 60, // 쿠키의 생명력 1시간
          path: "/",
        }),
        serialize("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        }),
      ]);

      res.status(200).json({
        ok: true,
        message: "로그인 성공",
        user: userData,
      });
    } catch (err) {
      handleError(res, err as AxiosError, "로그인에 실패했습니다.");
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
