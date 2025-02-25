import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { AxiosError } from "axios";
import instance from "@/api/axios";
import handleError from "@/pages/api/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  switch (req.method) {
    case "GET":
      // 프로필 조회 로직
      try {
        const response = await instance.get(`/users/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(201).json({
          ok: true,
          data: response.data,
          message: "프로필 조회에 성공했습니다.",
        });
      } catch (err) {
        handleError(res, err as AxiosError, "프로필 조회에 실패했습니다.");
      }

    case "PATCH":
      // 비밀번호 수정 로직
      try {
        const response = await instance.patch(`/users/me/password/`, req.body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(201).json({
          ok: true,
          data: response.data,
          message: "비밀번호 수정에 성공했습니다ㅏ.",
        });
      } catch (err) {
        console.error(err);
        handleError(res, err as AxiosError, "프로필 조회에 실패했습니다.");
      }

    default:
      res.setHeader("Allow", ["GET", "PATCH"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
