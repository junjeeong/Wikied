import URLCopyButton from "@/components/URLCopyButton";

const ShareModal = ({
  setIsOpen,
  url,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
}) => {
  const handleClose = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className="z-[98] fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="z-[99] w-[460px] h-[310px] rounded-[20px] bg-white relative flex flex-col">
        <h1 className="border-b-[#E6E8ED] border-b flex justify-center text-2lg font-bold h-[52px] items-center">
          위키 공유
        </h1>
        <div className="py-10 flex gap-10 justify-center">
          <button className="hover:scale-110 transition-transform duration-300">
            <img
              src="/icons/kakaotalk.svg"
              alt="카카오톡"
              width={72}
              height={72}
            />
          </button>
          <button className="hover:scale-110 transition-transform duration-300">
            <img src="/icons/x.svg" alt="트위터" width={72} height={72} />
          </button>
        </div>
        <button
          className="absolute top-[14px] right-[14px]"
          onClick={handleClose}
        >
          <img
            src="/icons/ic_close.svg"
            alt="닫기 버튼"
            width={24}
            height={24}
          />
        </button>
        <div className="px-5">
          <URLCopyButton url={url} />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
