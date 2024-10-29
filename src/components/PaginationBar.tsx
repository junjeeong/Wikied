interface PaginationBarProps {
  totalPage: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  isLoading: boolean;
  maxPage: number;
}

const PaginationBar = ({
  totalPage,
  currentPage,
  handlePageChange,
  isLoading,
  maxPage = 5,
}: PaginationBarProps) => {
  let startPage;
  let calNum;

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
        className="rounded-[10px] w-[45px] h-[45px] text-2lg text-gray-400 bg-background shadow-[0_4px_20px_#00000014] bg-[url('/icons/ic_arrow_bottom2.svg')] bg-no-repeat bg-center transform rotate-90"
      ></button>
      {pageArr.map((page) => (
        <button
          type="button"
          disabled={isLoading}
          key={page}
          className={`rounded-[10px] w-[45px] h-[45px] text-2lg text-gray-400 bg-background shadow-[0_4px_20px_#00000014] 
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
        className="rounded-[10px] w-[45px] h-[45px] text-2lg text-gray-400 bg-background shadow-[0_4px_20px_#00000014] bg-[url('/icons/ic_arrow_bottom2.svg')] bg-no-repeat bg-center transform -rotate-90"
      ></button>
    </div>
  );
};

export default PaginationBar;
