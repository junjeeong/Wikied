import FilledButton from "@/components/ui/Button/FilledButton";
import OutlineButton from "@/components/ui/Button/OutlineButton";
import { useRouter } from "next/router";
import { useState } from "react";
import Editor from "@/components/Editor";

const AddBoard = () => {
  const [content, setContent] = useState<string>("")

  const router = useRouter()
  const handleClick = () => {
    router.push('/boards')
  }

  const handleEditorChange = (value: string) => {
    setContent(value);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[23px] min-h-screen Mobile:px-5 bg-gray-50">
        <div className="w-full max-w-[1060px] min-h-[846px] px-[30px] pt-[46px] pb-[40px] shadow-[0_4px_20px_#00000014]">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold ">게시물 등록하기</h2>
              <FilledButton disabled>등록하기</FilledButton>
            </div>
            <span className="text-lg text-gray-400">등록일 2024.2.24</span>
          </div>
          <div>
            <div className="flex justify-between items-center mt-[33px] border-y border-gray-200">
              <span className="my-3">제목을 입력해주세요</span>
              <span>0/30</span>
            </div>
          </div>
          <Editor value={content} onChange={handleEditorChange} />
        </div>
        <OutlineButton onClick={handleClick}>목록으로</OutlineButton>
      </div>
    </>
  );
};

export default AddBoard;
