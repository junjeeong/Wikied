import OutlineButton from "@/components/ui/Button/OutlineButton";
import { useRouter } from "next/router";
import Editor from "@/containers/AddBoardsEditor";

const AddBoard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/boards");
  };

  return (
    <>
      <Editor />
      <OutlineButton onClick={handleClick}>목록으로</OutlineButton>
    </>
  );
};

export default AddBoard;
