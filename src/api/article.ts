import instance from "./axios";

interface postArticleProps {
  teamId: string;
  body: {
    image: string;
    content: string;
    title: string;
  };
}

interface getArticleProps {
  teamId: string;
  articleId: number;
}

interface getArticlesProps {
  teamId: string;
  page: number;
  pageSize: number;
  orderBy: string;
  keyword?: string;
}

interface patchArticleProps {
  teamId: string;
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
export const postArticle = async (query: postArticleProps) => {
  const { teamId, body } = query;

  try {
    const res = await instance.post(`/${teamId}/articles`, body);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("게시글 등록에 조회하는데 실패했습니다.", err);
    return {};
  }
};

// 게시글 목록 조희
export const getArticles = async (query: getArticlesProps) => {
  const {
    teamId,
    page = 1,
    pageSize = 10,
    orderBy = "recent",
    keyword = "",
  } = query;

  const queryString = `?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;

  try {
    const res = await instance.get(`/${teamId}/articles${queryString}`);
    if (res.status === 200) {
      return res.data.list;
    }
  } catch (err) {
    console.log("게시글 목록을 조회하는데 실패했습니다.", err);
    return {};
  }
};

// 게시글 상세 조회
export const getArticle = async (query: getArticleProps) => {
  const { teamId, articleId } = query;

  try {
    const res = await instance.get(`/${teamId}/articles/${articleId}`);
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 404) {
      return {};
    }
  } catch (err) {
    console.log("게시글 상세 조회에 실패했습니다.", err);
    return {};
  }
};

// 게시글 수정
export const patchArticle = async (query: patchArticleProps) => {
  const { teamId, articleId, body } = query;

  try {
    const res = await instance.patch(`/${teamId}/articles/${articleId}`, body);
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 404) {
      return {};
    }
  } catch (err) {
    console.log("게시글 수정에 실패했습니다.", err);
    return {};
  }
};

// 게시글 삭제
export const deleteArticle = async (query: deleteArticleProps) => {
  const { teamId, articleId } = query;

  try {
    const res = await instance.delete(`/${teamId}/articles/${articleId}`);
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 403 || res.status === 404) {
      return {};
    }
  } catch (err) {
    console.log("게시글 삭제에 실패했습니다.", err);
    return {};
  }
};

// 게시글 좋아요 추가
export const postArticleLike = async (query: postArticleLikeProps) => {
  const { teamId, articleId } = query;

  try {
    const res = await instance.post(`/${teamId}/articles/${articleId}/like`);
    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log("게시글 좋아요 추가에 실패했습니다.", err);
    return {};
  }
};

// 게시글 좋아요 취소
export const deleteArticleLike = async (query: deleteArticleLikeProps) => {
  const { teamId, articleId } = query;

  try {
    const res = await instance.delete(`/${teamId}/articles/${articleId}/like`);
    if (res.status === 200) {
      return res.data;
    }
    if (res.status === 404) {
      return {};
    }
  } catch (err) {
    console.log("게시글 좋아요 취소에 실패했습니다.", err);
    return {};
  }
};
