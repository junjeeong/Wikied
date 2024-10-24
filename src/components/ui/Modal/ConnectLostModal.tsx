import FilledButton from "../Button/FilledButton";

const ConectLostModal = () => {
  return (
    <>
      <div className="flex flex-col justify-center gap-[10px] pl-[10px] pr-[38px] pt-10 pb-[33px] Mobile:pl-0 Mobile:pr-[22px]">
        <span className="text-2lg text-gray-500 font-semibold Mobile:text-lg" >5분 이상 글을 쓰지 않아 접속이 끊어졌어요.</span>
        <span className="text-lg text-gray-400 Mobile:text-md">위키 참여하기를 통해 다시 위키를 수정해 주세요.</span>
      </div>
      <div className="flex justify-end">
        <FilledButton size="small">확인</FilledButton>
      </div>
    </>
  );
};

export default ConectLostModal;
