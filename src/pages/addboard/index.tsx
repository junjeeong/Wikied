import FilledButton from "@/components/ui/Button/FilledButton";
import OutlineButton from "@/components/ui/Button/OutlineButton";

const AddBoard = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center gap-[23px] min-h-screen Mobile:px-5 bg-gray-50">
      <div className="w-full max-w-[1060px] min-h-[846px] px-[30px] pt-[46px] pb-[40px] shadow-[0_4px_20px_#00000014]">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold ">게시물 등록하기</h2>
            <button className="rounded-[10px] px-[45.5px] py-[10.5px] text-md font-semibold bg-gray-300 text-background">
              등록하기
            </button>
          </div>
          <span className="text-lg text-gray-400">등록일 2024.2.24</span>
        </div>
        <div>
          <div className="flex justify-between items-center mt-[33px] border-y border-gray-200">
            <span className="my-3">제목을 입력해주세요</span>
            <span>0/30</span>
          </div>
        </div>
      </div>
    <OutlineButton>목록으로</OutlineButton>
    </div>
    </>
  );
};

export default AddBoard;
