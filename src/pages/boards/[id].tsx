import { useRouter } from "next/router";
import LoadingSpinner from "@/components/LoadingSpinner";
import ArticleCommentContainer from "@/containers/ArticleCommentContainer";
import ArticleDetailContainer from "@/containers/ArticleDetailContainer";
import BoardsDetailLayout from "@/components/Layout/BoardsDetailLayout";
import useFetchArticle from "@/hooks/useFetchArticle";

const BoardsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const articleId = Number(id);
  const { article, isLoading, notFound, unknownError } = useFetchArticle(
    Number(id)
  );

  if (isLoading) return <LoadingSpinner />;

  if (notFound)
    return (
      <>
        <h1>404 - 게시글을 찾을 수 없습니다.</h1>
        <p>요청하신 게시글이 존재하지 않습니다.</p>
      </>
    );

  if (unknownError)
    return (
      <>
        <h1>500 - 서버에 예기치 않은 오류가 발생했습니다.</h1>
        <p>네트워크 환경을 점검해 주세요.</p>
      </>
    );

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
