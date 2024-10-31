import { useRouter } from "next/router";
import { getArticle } from "@/api/article";
import { Article } from "@/types/types";
import { useEffect, useState } from "react";
import BoardsLayout from "@/components/Layout/BoardsLayout";
import ArticleComment from "@/components/ArticleComment";
import ArticleDetail from "@/components/ArticleDetail";

const BoardsDetailPage = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id !== "string") {
        return { notFound: true };
      }

      try {
        const res = await getArticle(Number(id));
        setArticle(res);
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!article) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <BoardsLayout>
      <ArticleDetail article={article} />
      <ArticleComment />
    </BoardsLayout>
  );
};

export default BoardsDetailPage;
