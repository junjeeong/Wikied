import { Comment } from "@/types/types";
import useSubmitComment from "@/hooks/useSubmitComment";
import FilledButton from "../components/ui/Button/FilledButton";

interface CommentInputContainerProps {
  setList: React.Dispatch<React.SetStateAction<Comment[]>>;
}
const CommentInputContainer = ({ setList }: CommentInputContainerProps) => {
  const { value, handleChange, handleSubmit } = useSubmitComment(setList);

  return (
    <>
      <label className="text-gray-500 text-2lg" htmlFor="commentInput">
        댓글
      </label>
      <form className="relative mt-[14px]" onSubmit={handleSubmit}>
        <textarea
          className="w-full h-[133px] py-[13px] px-[15px] bg-gray-100 text-gray-400 text-md rounded-lg resize-none"
          name="comment"
          id="commentInput"
          onChange={handleChange}
          placeholder="댓글을 입력해주세요."
          value={value}
        ></textarea>
        <div className="absolute right-[20px] bottom-[20px]">
          <FilledButton size="medium">댓글 등록</FilledButton>
        </div>
      </form>
    </>
  );
};

export default CommentInputContainer;
