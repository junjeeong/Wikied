import { ChangeEvent, SetStateAction, useState } from "react";
import { deleteComment } from "@/api/comment";
import { Comment } from "@/types/types";
import EditingCommentForm from "./EditingCommentForm";
import Profile from "/public/icons/ic_profile.svg";
import Edit from "/public/icons/ic_edit.svg";
import Delete from "/public/icons/ic_delete.svg";
import Image from "next/image";

interface CommentCardProps {
  info: Comment;
  setList: React.Dispatch<SetStateAction<Comment[]>>;
}

const CommentCard = ({ info, setList }: CommentCardProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const formattedDate = info.createdAt.slice(0, 10).replace(/-/g, ".");

  const handleCommentDelete = async (targetId: number) => {
    await deleteComment(targetId);
    setList((prevList) => prevList?.filter((el) => el.id !== targetId));
  };

  return isEdit ? (
    <EditingCommentForm info={info} setIsEdit={setIsEdit} setList={setList} />
  ) : (
    <div className="relative flex gap-[20px] py-[22px] px-[30px] rounded-[10px] border border-gray-50 shadow-md">
      <div>
        {info.writer.image ? (
          <Image
            src={info.writer.image}
            width={50}
            height={50}
            alt="user profile"
          />
        ) : (
          <Profile className="text-gray-300 w-[50px] h-[50px]" />
        )}
      </div>
      <div className="flex-grow">
        <div className="flex flex-col gap-[6px]">
          <h2 className="text-2lg text-gray-500 font-semibold">
            {info.writer.name || ""}
          </h2>
          <p className="text-lg text-gray-500">{info.content || ""}</p>
          <p className="text-md text-gray-400">{formattedDate || ""}</p>
        </div>
        <Edit
          onClick={() => setIsEdit(!isEdit)}
          className="absolute top-[22px] right-[74px] cursor-pointer"
        />
        <Delete
          onClick={() => handleCommentDelete(info.id)}
          className="absolute top-[22px] right-[30px] cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CommentCard;
