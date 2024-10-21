interface PaginationBarProps {
  totalPage: number;
  pageArr: number[];
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const PaginationBar = ({
  totalPage,
  pageArr,
  currentPage,
  handlePageChange,
}: PaginationBarProps) => {
  return (
    <div className="flex gap-[10px]">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="rounded-[10px] w-[45px] h-[45px] text-gray400 bg-gray50 font-pretendard text-[18px] font-normal leading-[26px] shadow-[0_4px_20px_rgba(0,0,0,0.008)] bg-[url('../assets/icon/ic_arrow_bottom2.svg')] bg-no-repeat bg-center transform rotate-90"
      ></button>
      {pageArr.map((page) => (
        <button
          type="button"
          key={page}
          className={`rounded-[10px] w-[45px] h-[45px] text-gray400 bg-gray50 font-pretendard text-[18px] font-normal leading-[26px] shadow-[0_4px_20px_rgba(0,0,0,0.008)] 
${currentPage === page ? "text-green200" : ""}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        disabled={currentPage === totalPage}
        onClick={() => handlePageChange(currentPage + 1)}
        className="rounded-[10px] w-[45px] h-[45px] text-gray400 bg-gray50 font-pretendard text-[18px] font-normal leading-[26px] shadow-[0_4px_20px_rgba(0,0,0,0.008)] bg-[url('../assets/icon/ic_arrow_bottom2.svg')] bg-no-repeat bg-center transform -rotate-90"
      ></button>
    </div>
  );
};

export default PaginationBar;
