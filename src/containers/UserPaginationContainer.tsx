import { useEffect, useState } from "react";
import { getProfiles } from "@/api/profile";
import PaginationBar from "@/components/PaginationBar";

interface Data {
  name: string;
  city: string;
  job: string;
  id: number;
}

interface Query {
  page: number;
  pageSize: number;
  name: string;
}

const UserPaginationContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);

  let userName = "김진";

  useEffect(() => {
    const fetchData = async (query: Query) => {
      const { list, totalCount } = await getProfiles(query);
      setData(list);
      setTotalPage(Math.ceil(totalCount / query.pageSize));
    };
    fetchData({
      page: currentPage,
      pageSize: 3,
      name: userName,
    });
    setIsLoading(false);
  }, [userName, currentPage]);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  return (
    <>
      <PaginationBar
        totalPage={totalPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        isLoading={isLoading}
      ></PaginationBar>
    </>
  );
};

export default UserPaginationContainer;
