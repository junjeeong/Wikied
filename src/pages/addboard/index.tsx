import OutlineButton from "@/components/ui/Button/OutlineButton";
import { useRouter } from "next/router";
import { useState } from "react";
import Editor from "@/containers/Editor";
import CustomToolbar from "@/containers/CustomToolbar";

const AddBoard = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const router = useRouter();
  const handleClick = () => {
    router.push("/boards");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[23px] min-h-screen bg-background Tablet:px-[60px] Mobile:px-5 ">
        <Editor
          initialTitle={title}
          initialContent={content}
          onTitleChange={handleTitleChange}
          onContentChange={handleContentChange}
        />
        <CustomToolbar />
        <OutlineButton onClick={handleClick}>목록으로</OutlineButton>
      </div>
    </>
  );
};

export default AddBoard;
