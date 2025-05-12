import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner";
import ArticleCommentContainer from "@/containers/ArticleCommentContainer";
import ArticleDetailContainer from "@/containers/ArticleDetailContainer";
import BoardsDetailLayout from "@/components/Layout/BoardsDetailLayout";
import useFetchArticle from "@/hooks/useFetchData";

const BoardsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const articleId = Number(id);
  const { article, isLoading } = useFetchArticle(Number(id));

  if (isLoading) return <LoadingSpinner />;

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
