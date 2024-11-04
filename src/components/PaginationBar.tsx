import Arrow from "../../public/icons/ic_arrow_bottom2.svg";

interface PaginationBarProps {
  totalPage: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  isLoading: boolean;
}

const PaginationBar = ({
  totalPage,
  currentPage = 1,
  handlePageChange,
  isLoading,
}: PaginationBarProps) => {
  if (totalPage <= 1) return null;
  let startPage;
  let calNum;

  const maxPage = 5;

  if (totalPage <= maxPage) startPage = 1;
  else {
    calNum = Math.ceil(currentPage / maxPage);
    startPage = (calNum - 1) * maxPage + 1;
  }

  const pageArr = Array.from(
    {
      length: Math.min(maxPage, totalPage - startPage + 1),
    },
    (_, i) => startPage + i
  );

  return (
    <div className="flex gap-[10px]">
      <button
        type="button"
        disabled={currentPage === 1 || isLoading}
        onClick={() => handlePageChange(currentPage - 1)}
        className="flex justify-center items-center rounded-[10px] w-[45px] h-[45px] text-2lg bg-background shadow-[0_4px_20px_#00000014] Mobile:w-[40px] Mobile:h-[40px]"
      >
        <Arrow className="w-6 h-6 text-gray-400 rotate-90 Mobile:w-[18px] Mobile:h-[18px]" />
      </button>
      {pageArr.map((page) => (
        <button
          type="button"
          disabled={isLoading}
          key={page}
          className={`rounded-[10px] w-[45px] h-[45px] text-2lg text-gray-400 bg-background shadow-[0_4px_20px_#00000014] Mobile:w-[40px] Mobile:h-[40px] Mobile:text-xs
${currentPage === page ? "text-green-200" : ""}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPage || isLoading}
        onClick={() => handlePageChange(currentPage + 1)}
        className="flex justify-center items-center rounded-[10px] w-[45px] h-[45px] text-2lg bg-background shadow-[0_4px_20px_#00000014] Mobile:w-[40px] Mobile:h-[40px]"
      >
        <Arrow className="w-6 h-6 text-gray-400 -rotate-90 Mobile:w-[18px] Mobile:h-[18px]" />
      </button>
    </div>
  );
};

export default PaginationBar;
