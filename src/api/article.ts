import { AxiosError } from "axios";
import instance, { proxy } from "./axios";
import handleError from "@/api/handleError";
import handleSuccess from "@/api/handleSuccess";

interface postArticleProps {
  image: string;
  content: string;
  title: string;
}

interface getArticlesProps {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword?: string;
}

interface patchArticleProps {
  articleId: number;
  body: {
    image: string;
    content: string;
    title: string;
  };
}

// 게시글 목록 조희
export const getArticles = async (query: getArticlesProps) => {
  const { page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = query;

  const queryString = `?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;

  try {
    const res = await instance.get(`/articles${queryString}`);
    return handleSuccess(res, "게시글 목록 조회에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 게시글 등록
export const postArticle = async (body: postArticleProps) => {
  try {
    const res = await proxy.post(`/api/articles/`, body);
    return handleSuccess(res, "게시글 등록에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 게시글 상세 조회
export const getArticle = async (articleId: number) => {
  try {
    const res = await proxy.get(`/api/articles/${articleId}`);
    return handleSuccess(res, "게시글 상세 조회에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 게시글 수정
export const patchArticle = async (query: patchArticleProps) => {
  try {
    const res = await proxy.patch(
      `/api/articles/${query.articleId}`,
      query.body
    );
    return handleSuccess(res, "게시글 수정에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 게시글 삭제
export const deleteArticle = async (articleId: number) => {
  try {
    const res = await proxy.delete(`/api/articles/${articleId}`);
    return handleSuccess(res, "게시글 삭제에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 게시글 좋아요 추가
export const postArticleLike = async (articleId: number) => {
  try {
    const res = await proxy.post(`/api/like/${articleId}`);
    return handleSuccess(res, "게시글 좋아요 추가에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 게시글 좋아요 취소
export const deleteArticleLike = async (articleId: number) => {
  try {
    const res = await proxy.delete(`/api/like/${articleId}`);
    return handleSuccess(res, "게시글 좋아요 취소에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};
