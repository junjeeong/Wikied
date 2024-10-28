import { useEffect, useState } from "react";
import { getProfiles } from "@/api/profile";
import PaginationBar from "@/components/PaginationBar";
// import ProfileList from "@/components/ProfileList";

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

  let userName = "김진"; // 스토어에서 가져오기

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
    setIsLoading(false); //데이터 가져온 후 로딩 끝
  }, [userName, currentPage]);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  return (
    <>
      {/* <ProfileList data={data} /> css미완성 */}
      <PaginationBar
        totalPage={totalPage}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        isLoading={isLoading}
        maxPage={5}
      ></PaginationBar>
    </>
  );
};

export default UserPaginationContainer;
