import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner";
import ArticleCommentContainer from "@/containers/ArticleCommentContainer";
import ArticleDetailContainer from "@/containers/ArticleDetailContainer";
import BoardsDetailLayout from "@/components/Layout/BoardsDetailLayout";
import useFetchArticle from "@/hooks/useFetchData";
import NotFound from "@/components/ui/Error/NotFound";
import Unknown from "@/components/ui/Error/Unknown";

const BoardsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const articleId = Number(id);
  const { article, isLoading, notFound, unknownError } = useFetchArticle(
    Number(id)
  );

  if (isLoading) return <LoadingSpinner />;

  if (notFound) return <NotFound />;

  if (unknownError) return <Unknown />;

  return (
    <>
      {article && (
        <BoardsDetailLayout>
          <ArticleDetailContainer article={article} articleId={articleId} />
          <ArticleCommentContainer articleId={articleId} />
        </BoardsDetailLayout>
      )}
    </>
  );
};

export default BoardsDetailPage;
