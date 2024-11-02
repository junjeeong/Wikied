import OutlineButton from "@/components/ui/Button/OutlineButton";
import { useRouter } from "next/router";
import AddBoardsEditor from "@/containers/AddBoardsEditor";

const AddBoard = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/boards");
  };

  return (
    <>
      <AddBoardsEditor />
      <OutlineButton onClick={handleClick}>목록으로</OutlineButton>
    </>
  );
};

export default AddBoard;
