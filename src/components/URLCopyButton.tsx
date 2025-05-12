import useNotify from "@/hooks/useNotify";

const URLCopyButton = ({ url }: { url: string }) => {
  const notify = useNotify();

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    notify("URL을 복사했습니다.", "success");
  };

  return (
    <div className="rounded-lg border border-[#E6E8ED] p-4 flex justify-between">
      <span>{url}</span>
      <button
        className="rounded-[20px] w-[60px] h-[32px] flex justify-center items-center text-sm text-white bg-green-100 hover:opacity-50 transition-opacity duration-200"
        onClick={handleCopy}
      >
        복사
      </button>
    </div>
  );
};

export default URLCopyButton;
