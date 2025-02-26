import { instance, proxy } from "./axios";
import { AxiosError } from "axios";
import handleSuccess from "@/api/handleSuccess";
import handleError from "@/api/handleError";

interface PostCommentQuery {
  articleId: number;
  body: {
    content: string;
  };
}

interface PatchCommentQuery {
  commentId: number;
  body: {
    content: string;
  };
}

// 게시글의 댓글 목록 조회
export const getComments = async (articleId: number) => {
  try {
    const res = await instance.get(`/articles/${articleId}/comments?limit=7`);
    return handleSuccess(res, "댓글 목록 조회에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 댓글 등록
export const postComment = async (query: PostCommentQuery) => {
  try {
    const res = await proxy.post(
      `/api/articles/${query.articleId}`,
      query.body
    );
    return handleSuccess(res, "댓글 등록에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 댓글 수정
export const patchComment = async (query: PatchCommentQuery) => {
  try {
    const res = await proxy.patch(
      `/api/comments/${query.commentId}`,
      query.body
    );
    return handleSuccess(res);
  } catch (err) {
    return handleError(err as AxiosError);
  }
};

// 댓글 삭제
export const deleteComment = async (targetId: number) => {
  try {
    const res = await proxy.delete(`/api/comments/${targetId}`);
    return handleSuccess(res, "댓글 삭제에 성공했습니다.");
  } catch (err) {
    return handleError(err as AxiosError);
  }
};
