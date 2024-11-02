import Comment from "/public/icons/ic_comment.svg";

const CommentNoExist = () => {
  return (
    <div className=" flex flex-col items-center gap-[20px] ">
      <Comment className="w-[200px] h-[200px]" />
      <span className="text-gray-300 text-lg">등록된 댓글이 없습니다.</span>
    </div>
  );
};

export default CommentNoExist;
