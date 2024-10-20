import instance from "./axios";

interface GetCommentQuery {
  teamId: string;
  articleId: number;
  limit: number;
  cursor?: number;
}

interface PostCommentQuery {
  teamId: string;
  articleId: number;
  body: {
    content: string;
  };
}

interface PatchCommentQuery {
  teamId: string;
  commentId: number;
  body: {
    content: string;
  };
}

interface DeleteCommentQuery {
  teamId: string;
  commentId: number;
}

// 게시글의 댓글 목록 조회
export const getComment = async (query: GetCommentQuery) => {
  const { teamId, articleId, limit, cursor } = query;

  try {
    const res = await instance.get(`/${teamId}/articles/${articleId}/comments`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("댓글 목록을 불러오지 못했습니다.", err);
    return {};
  }
};

// 댓글 등록
export const postComment = async (query: PostCommentQuery) => {
  const { teamId, articleId, body } = query;
  const { content } = body;

  try {
    const res = await instance.post(
      `/${teamId}/articles/${articleId}/comments`,
      {
        content: content,
      }
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("댓글을 등록하는데 실패했습니다.", err);
    return {};
  }
};

// 댓글 수정
export const patchComment = async (query: PatchCommentQuery) => {
  const { teamId, commentId, body } = query;
  const { content } = body;

  try {
    const res = await instance.patch(`/${teamId}/comments/${commentId}`, {
      content: content,
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("댓글을 수정하는데 실패했습니다.", err);
    return {};
  }
};

// 댓글 삭제
export const deleteComment = async (query: DeleteCommentQuery) => {
  const { teamId, commentId } = query;

  try {
    const res = await instance.delete(`/${teamId}/comments/${commentId}`);
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 403 || res.status === 404) {
      return {}; // undefined를 반환하는 것이 아닌 빈 객체를 반환하게 함.
    }
  } catch (err) {
    console.log("댓글을 삭제하는데 실패했습니다.", err);
    return {};
  }
};
