import instance from "./axios";

interface GetCommentQuery {
  articleId: number;
  limit?: number;
}

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
export const getComment = async (query: GetCommentQuery) => {
  const { articleId, limit = 3 } = query;

  try {
    const res = await instance.get(
      `/articles/${articleId}/comments?limit=${limit}`
    );
    return res.data.list;
  } catch (err) {
    console.error("댓글 목록을 불러오지 못했습니다.", err);
    return [];
  }
};

// 댓글 등록
export const postComment = async (query: PostCommentQuery, token: string) => {
  const { articleId, body } = query;

  try {
    const res = await instance.post(`/articles/${articleId}/comments`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("댓글을 등록하는데 실패했습니다.", err);
    return {};
  }
};

// 댓글 수정
export const patchComment = async (query: PatchCommentQuery, token: string) => {
  const { commentId, body } = query;

  try {
    const res = await instance.patch(`/comments/${commentId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("댓글을 수정하는데 실패했습니다.", err);
    return {};
  }
};

// 댓글 삭제
export const deleteComment = async (commentId: number, token: string) => {
  try {
    const res = await instance.delete(`/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("댓글을 삭제하는데 실패했습니다.", err);
    return {};
  }
};
