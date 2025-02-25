import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { AxiosError } from "axios";
import instance from "@/api/axios";

const handleError = (
  res: NextApiResponse,
  err: AxiosError,
  defaultMessage: string
) => {
  console.error(`Error occurred: ${err.message}`);
  return res.status(err.response?.status || 500).json({
    ok: false,
    message: err.response?.statusText || defaultMessage,
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  const { articleId } = req.query;
  if (!articleId) {
    return res.status(400).json({
      ok: false,
      data: null,
      message: "게시글 ID를 찾지 못했습니다.",
    });
  }

  switch (req.method) {
    case "GET":
      try {
        const response = await instance.get(`/articles/${articleId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json({
          ok: true,
          data: response.data,
          message: "게시글 조회에 성공했습니다.",
        });
      } catch (err) {
        return handleError(
          res,
          err as AxiosError,
          "게시글 조회 중 오류가 발생했습니다."
        );
      }

    case "POST":
      try {
        const response = await instance.post(
          `/articles/${articleId}/comments`,
          req.body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(201).json({
          ok: true,
          data: response.data,
          message: "댓글 등록에 성공했습니다.",
        });
      } catch (err) {
        return handleError(
          res,
          err as AxiosError,
          "댓글 등록 중 오류가 발생했습니다."
        );
      }

    case "PATCH":
      try {
        const response = await instance.patch(
          `/articles/${articleId}`,
          req.body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(200).json({
          ok: true,
          data: response.data,
          message: "게시글 수정에 성공하였습니다.",
        });
      } catch (err) {
        return handleError(
          res,
          err as AxiosError,
          "게시글 수정 중 오류가 발생했습니다."
        );
      }

    case "DELETE":
      try {
        const response = await instance.delete(`/articles/${articleId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json({
          ok: true,
          data: response.data,
          message: "게시글 삭제에 성공했습니다.",
        });
      } catch (err) {
        return handleError(
          res,
          err as AxiosError,
          "게시글 삭제 중 오류가 발생했습니다."
        );
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
