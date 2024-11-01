import { useRouter } from "next/router";
import { getArticle } from "@/api/article";
import { Article } from "@/types/types";
import { useEffect, useState } from "react";
import BoardsLayout from "@/components/Layout/BoardsLayout";
import ArticleDetailContainer from "@/containers/ArticleDetailContainer";
import ArticleCommentContainer from "@/containers/ArticleCommentContainer";

const BoardsDetailPage = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const articleId = Number(id);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      try {
        const res = await getArticle(articleId);
        setArticle(res);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [articleId, router.isReady]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!article) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <BoardsLayout>
      <ArticleDetailContainer article={article} articleId={articleId} />
      <ArticleCommentContainer articleId={articleId} />
    </BoardsLayout>
  );
};

export default BoardsDetailPage;
