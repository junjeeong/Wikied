import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { AxiosError } from "axios";
import instance from "@/api/axios";
import handleSuccess from "@/pages/api/handleSuccess";
import handleError from "@/pages/api/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  const { code } = req.query;
  if (!code) {
    return res
      .status(400)
      .json({ message: "유효하지 않은 프로필 CODE입니다." });
  }

  switch (req.method) {
    case "PATCH":
      // 프로필 수정 로직
      try {
        const response = await instance.patch(`/profiles/${code}`, req.body, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return handleSuccess(res, response.data, "프로필 수정에 성공했습니다.");
      } catch (err) {
        return handleError(
          res,
          err as AxiosError,
          "프로필 수정 중 오류가 발생했습니다."
        );
      }
    case "POST":
      // 프로필 수정시간 갱신 로직
      try {
        const response = await instance.post(
          `/profiles/${code}/ping`,
          req.body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return handleSuccess(
          res,
          response.data,
          "프로필 수정시간 갱신에 성공했습니다."
        );
      } catch (err) {
        return handleError(
          res,
          err as AxiosError,
          "프로필 수정시간 갱신 중 오류가 발생했습니다."
        );
      }

    default:
      res.setHeader("Allow", ["PATCH", "POST"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
