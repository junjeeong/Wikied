import { useEffect, useState } from "react";
import PaginationBar from "@/components/PaginationBar";

interface PaginationBarContainerProps {
  totalCount?: number;
  itemsPerPage?: number;
  maxPage?: number;
}

const PaginationBarContainer = ({
  totalCount = 10,
  itemsPerPage = 2,
  maxPage = 5,
}: PaginationBarContainerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

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

useEffect(() => {
  getProfiles()
})


  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

 
  return (
    <PaginationBar
      totalPage={totalPage}
      currentPage={currentPage}
      pageArr={pageArr}
      handlePageChange={handlePageChange}
      isLoading={isLoading}
    ></PaginationBar>
  );
};

export default PaginationBarContainer;
