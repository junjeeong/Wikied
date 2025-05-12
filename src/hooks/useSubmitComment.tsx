import { Comment } from "@/types/types";
import { getComments, postComment } from "@/api/comment";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";

const useSubmitComment = (
  setList: React.Dispatch<React.SetStateAction<Comment[]>>
) => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");

  const updateList = async () => {
    const res = await getComments(Number(router.query.id));
    setList(res.data.list);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = {
      articleId: Number(router.query.id),
      body: { content: value },
    };
    await postComment(query);
    updateList();
    setValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return { value, handleChange, handleSubmit };
};

export default useSubmitComment;
