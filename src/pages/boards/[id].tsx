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
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const articleId = Number(id);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      setIsLoading(true);
      const res = await getArticle(articleId);

      if (res.ok) {
        setIsLoading(false);
        setArticle(res.data);
      } else {
        setIsLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [articleId, router.isReady]);

  return (
    <>
      {isLoading && <LoadingSpinner />}

      {!error && article ? (
        <BoardsDetailLayout>
          <ArticleDetailContainer article={article} articleId={articleId} />
          <ArticleCommentContainer articleId={articleId} />
        </BoardsDetailLayout>
      ) : (
        <div>안녕 에러가 났네 미안 ㅎㅎ;</div>
      )}
    </>
  );
};

export default BoardsDetailPage;
