import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
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
        cookie.serialize("accessToken", data.accessToken, {
          httpOnly: true, // 스크립트로 쿠키에 접근하지 못하게 함. -> XXS 공격을 보완, 허나 클라이언트에서 쿠키를 set,get 하지 못하게 됨. -> 서버에서 관리가 필요.
          secure: process.env.NODE_ENV === "production", // 프로덕션 환경에서만 secure 옵션 사용, 개발 환경(development)에서는 secure 속성이 false가 되어 HTTP 연결에서도 쿠키가 전송될 수 있습니다. 이는 개발 과정에서의 편의성을 위해 설정된 것입니다.
          sameSite: "none",
          maxAge: 60 * 60, // 1시간
          path: "/",
        }),
        cookie.serialize("refreshToken", data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "none",
          maxAge: 60 * 60 * 24 * 30, // 30일
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
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
