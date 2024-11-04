import { useRouter } from "next/router";
import { getArticle } from "@/api/article";
import { Article } from "@/types/types";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import ArticleCommentContainer from "@/containers/ArticleCommentContainer";
import ArticleDetailContainer from "@/containers/ArticleDetailContainer";
import BoardsDetailLayout from "@/components/Layout/BoardsDetailLayout";

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

  if (!article) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <BoardsDetailLayout>
        <ArticleDetailContainer article={article} articleId={articleId} />
        <ArticleCommentContainer articleId={articleId} />
      </BoardsDetailLayout>
    </>
  );
};

export default BoardsDetailPage;
