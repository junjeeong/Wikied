import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { AxiosError } from "axios";
import instance from "@/api/axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = parse(req.headers.cookie || "");
  const accessToken = cookies.accessToken;

  const { articleId } = req.query;
  if (!articleId) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "게시글 ID를 찾지 못했습니다.",
    });
  }

  switch (req.method) {
    case "GET":
      // 게시글 조회 로직
      try {
        const response = await instance.get(`/articles/${articleId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json({
          success: true,
          data: response.data,
          message: "게시글 조회에 성공했습니다.",
        });
      } catch (err) {
        const error = err as AxiosError;
        console.error("GET /api/articles/airtlceId error : ", error.message);
        return res.status(error.response?.status as number).json({
          success: false,
          data: null,
          message: error.message,
        });
      }

    case "POST":
      // 댓글 등록 로직
      try {
        const response = await instance.post(
          `/articles/${articleId}/comments`,
          req.body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(201).json({
          success: true,
          data: response.data,
          message: "댓글 등록에 성공했습니다.",
        });
      } catch (err) {
        const error = err as AxiosError;
        console.error("POST /api/articles/airtlceId error : ", error.message);
        return res.status(error.response?.status as number).json({
          success: false,
          data: null,
          message: error.message,
        });
      }

    case "PATCH":
      // 게시글 수정 로직
      try {
        const response = await instance.patch(
          `/articles/${articleId}`,
          req.body,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        return res.status(200).json({
          success: true,
          data: response.data,
          message: "게시글 수정에 성공하였습니다.",
        });
      } catch (err) {
        const error = err as AxiosError;
        console.error("PATCH /api/articles/airtlceId error : ", error.message);
        return res.status(error.response?.status as number).json({
          success: false,
          data: null,
          message: error.message,
        });
      }

    case "DELETE":
      try {
        const response = await instance.delete(`/articles/${articleId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.status(200).json({
          success: true,
          data: response.data,
          message: "게시글 삭제에 성공했습니다.",
        });
      } catch (err) {
        const error = err as AxiosError;
        console.error("DELETE /api/articles/airtlceId error : ", error.message);
        return res.status(error.response?.status as number).json({
          success: false,
          data: null,
          message: error.message,
        });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "PATCH", "DELETE"]);
      return res.status(405).end(`메서드 ${req.method}는 허용되지 않습니다.`);
  }
};

export default handler;
