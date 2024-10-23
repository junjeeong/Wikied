import instance from "./axios";

interface postArticleProps {
  image: string;
  content: string;
  title: string;
}

interface getArticleProps {
  articleId: number;
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

type deleteArticleProps = getArticleProps;
type postArticleLikeProps = getArticleProps;
type deleteArticleLikeProps = getArticleProps;

// 게시글 등록
export const postArticle = async (body: postArticleProps) => {
  try {
    const res = await instance.post(`/articles`, body);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error("게시글 등록에 조회하는데 실패했습니다.", err);
    return {};
  }
};

// 게시글 목록 조희
export const getArticles = async (query: getArticlesProps) => {
  const { page = 1, pageSize = 10, orderBy = "recent", keyword = "" } = query;

  const queryString = `?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;

  try {
    const res = await instance.get(`/articles${queryString}`);
    if (res.status === 200) {
      return res.data.list;
    }
  } catch (err) {
    console.error("게시글 목록을 조회하는데 실패했습니다.", err);
    return [];
  }
};

// 게시글 상세 조회
export const getArticle = async (articleId: number, token: string) => {
  try {
    const res = await instance.get(`/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 404) {
      return {};
    }
  } catch (err) {
    console.error("게시글 상세 조회에 실패했습니다.", err);
    return {};
  }
};

// 게시글 수정
export const patchArticle = async (query: patchArticleProps, token: string) => {
  const { articleId, body } = query;

  try {
    const res = await instance.patch(`/articles/${articleId}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 404) {
      return {};
    }
  } catch (err) {
    console.error("게시글 수정에 실패했습니다.", err);
    return {};
  }
};

// 게시글 삭제
export const deleteArticle = async (
  articleId: deleteArticleProps,
  token: string
) => {
  try {
    const res = await instance.delete(`/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 403 || res.status === 404) {
      return {};
    }
  } catch (err) {
    console.error("게시글 삭제에 실패했습니다.", err);
    return {};
  }
};

// 게시글 좋아요 추가
export const postArticleLike = async (articleId: postArticleLikeProps) => {
  try {
    const res = await instance.post(`/articles/${articleId}/like`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.error("게시글 좋아요 추가에 실패했습니다.", err);
    return {};
  }
};

// 게시글 좋아요 취소
export const deleteArticleLike = async (
  articleId: deleteArticleLikeProps,
  token: string
) => {
  try {
    const res = await instance.delete(`/articles/${articleId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 404) {
      return {};
    }
  } catch (err) {
    console.error("게시글 좋아요 취소에 실패했습니다.", err);
    return {};
  }
};
