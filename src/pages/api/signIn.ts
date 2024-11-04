import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import instance from "@/api/axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const response = await instance.post("/auth/signIn", req.body);

      if (response.status !== 200) {
        throw new Error("네트워크 응답이 좋지 않습니다.");
      }

      const data = response.data; // 응답 데이터

      // accessToken과 refreshToken을 쿠키에 저장
      res.setHeader("Set-Cookie", [
        serialize("accessToken", data.accessToken, {
          httpOnly: true, // 스크립트로 쿠키에 접근하지 못하게 함. -> XXS 공격을 보완, 허나 클라이언트에서 쿠키를 set,get 하지 못하게 됨. -> 서버에서 관리가 필요.
          secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서만 secure 옵션 사용, HTTP 연결에서도 쿠키를 전송할 수 있는 편의 제공.
          sameSite: "none",
          maxAge: 60 * 60, // 생명 1시간
          path: "/",
        }),
        serialize("refreshToken", data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: 60 * 60 * 24 * 30, // 생명 30일
          path: "/",
        }),
      ]);

      res.status(200).json({
        message: "로그인 성공",
        user: data.user,
        accessToken: data.accessToken,
      });
    } catch (error) {
      const errorMessage =
        (error as Error).message || "알 수 없는 오류가 발생했습니다.";
      res.status(500).json({ message: errorMessage });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
