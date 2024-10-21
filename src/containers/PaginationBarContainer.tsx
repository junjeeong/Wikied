import { useState } from "react";
import PaginationBar from "@/components/PaginationBar";

interface PaginationBarContainerProps { 
  totalCount: number;
  itemsPerPage: number;
}

export const PaginationBarContainer = ({
  totalCount,
  itemsPerPage,
}: PaginationBarContainerProps) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = 5;
  const totalPage = Math.ceil(totalCount / itemsPerPage);
  let startPage;
  let calNum;

  if (totalPage <= maxPage) startPage = 1;
  else {
    calNum = Math.ceil(currentPage / maxPage);
    startPage = (calNum - 1) * maxPage + 1;
  }

  const pageArr = Array.from(
    {
      length: Math.min(maxPage, totalPage),
    },
    (_, i) => startPage + i
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <PaginationBar
      totalPage={totalPage}
      currentPage={currentPage}
      pageArr={pageArr}
      handlePageChange={handlePageChange}
    ></PaginationBar>
  );
};
