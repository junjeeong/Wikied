import instance, { proxy } from "./axios";

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
    return res.data.list;
  } catch (err) {
    console.error("댓글 목록을 불러오지 못했습니다.", err);
    return [];
  }
};

// 댓글 등록
export const postComment = async (query: PostCommentQuery) => {
  const res = await proxy.post(`/api/articles/${query.articleId}`, query.body);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};

// 댓글 수정
export const patchComment = async (query: PatchCommentQuery) => {
  const res = await proxy.patch(`/api/comments/${query.commentId}`, query.body);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};

// 댓글 삭제
export const deleteComment = async (targetId: number) => {
  const res = await proxy.delete(`/api/comments/${targetId}`);
  if (res.status >= 200 && res.status < 300) return res.data;
  else return {};
};
