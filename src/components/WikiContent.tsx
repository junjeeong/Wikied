import FilledButton from "./ui/Button/FilledButton";
import dynamic from "next/dynamic";

interface WikiContentProps {
  content: string;
  onClick: () => void;
}

const NoSSRContent = dynamic(() => import("@/utils/ssrContent"), {
  ssr: false,
});

const WikiContent = ({ content, onClick }: WikiContentProps) => {
  const isEmpty = content === "" ? true : false;

  return (
    <>
      {isEmpty ? (
        <div className="flex flex-col rounded-[10px] items-center justify-center w-full h-48 Mobile:h-[184px] gap-5 bg-gray-100">
          <p className="text-center text-gray-400">
            아직 작성된 내용이 없네요.
            <br />
            위키에 참여해 보세요!
          </p>
          <FilledButton size="small" type="button" onClick={onClick}>
            시작하기
          </FilledButton>
        </div>
      ) : (
        <div id="Quill" className="w-full">
          <NoSSRContent content={content} />
        </div>
      )}
    </>
  );
};

export default WikiContent;
