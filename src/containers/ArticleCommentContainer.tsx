import CommentInputContainer from "./CommentInputContainer";
import CommentNoExist from "@/components/ui/CommentNoExist";
import useComments from "@/hooks/useComments";
import CommentCard from "@/components/CommentCard";

interface ArticleCommentContainerProps {
  articleId: number;
}

const ArticleCommentContainer = ({
  articleId,
}: ArticleCommentContainerProps) => {
  const { list, setList } = useComments(articleId);

  return (
    <div className="mt-[60px] ">
      <CommentInputContainer setList={setList} />
      <div className="flex flex-col gap-[24px] mt-[60px]">
        {list.length > 0 ? (
          list.map((comment) => (
            <CommentCard key={comment.id} info={comment} setList={setList} />
          ))
        ) : (
          <CommentNoExist />
        )}
      </div>
    </div>
  );
};

export default ArticleCommentContainer;
