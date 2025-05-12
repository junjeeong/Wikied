import { ChangeEvent, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import { getComments, patchComment } from "@/api/comment";
import { Comment } from "@/types/types";
import FilledButton from "@/components/ui/Button/FilledButton";
import Profile from "/public/icons/ic_profile.svg";
import Image from "next/image";

interface EditingCommentFormProps {
  info: Comment;
  setIsEdit: React.Dispatch<SetStateAction<boolean>>;
  setList: React.Dispatch<SetStateAction<Comment[]>>;
}

const EditingCommentForm = ({
  info,
  setIsEdit,
  setList,
}: EditingCommentFormProps) => {
  const router = useRouter();
  const [value, setValue] = useState(info.content);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await patchComment({ commentId: info.id, body: { content: value } });
    const response = await getComments(Number(router.query.id));
    if (response.ok) {
      setList(response.data);
    }
    setIsEdit(false);
  };

  const onCancle = () => {
    setIsEdit((state) => !state);
  };

  return (
    <div className="relative flex gap-[20px] py-[22px] px-[30px] rounded-[10px] border border-green-200">
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
      <form className="flex-grow" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[6px]">
          <h2 className="text-2lg text-gray-500 font-semibold">
            {info.writer.name || ""}
          </h2>
          <input
            className="text-lg text-gray-500 w-[80%]"
            type="text"
            value={value}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-[8px] justify-end">
          <FilledButton size="small" onClick={onCancle} type="button">
            취소
          </FilledButton>
          <FilledButton size="small" type="submit">
            등록
          </FilledButton>
        </div>
      </form>
    </div>
  );
};

export default EditingCommentForm;
