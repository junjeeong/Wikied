import PaginationBar from "@/components/PaginationBar";
import { SearchInput } from "@/components/SearchInput";
import FilledButton from "@/components/ui/Button/FilledButton";
import OrderDropdown from "@/components/ui/Dropdown/OrderDropdown";
import { TotalArticlesContainerProps } from "@/types/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TotalArticles from "@/components/ui/TotalArticles";
import { getArticles } from "@/api/article";

const PAGE_SIZE = 10;

const TotalArticlesContainer = ({
  totalArticles: initialTotalArticles,
  totalCount,
}: TotalArticlesContainerProps) => {
  const [value, setValue] = useState("");
  const [order, setOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(initialTotalArticles);
  const [isPC, setIsPC] = useState(true);
  const router = useRouter();
  const totalPage = Math.ceil(totalCount / PAGE_SIZE);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    if (!value) {
      router.push("/boards");
      return;
    }
    router.push(`/boards?q=${value}`);
  };

  const handleButtonClick = () => {
    setCurrentPage(1);
    if (!value) {
      router.push("/boards");
      return;
    }
    router.push(`/boards?q=${value}`);
  };

  const handleOrderChange = (orderValue: string) => {
    setCurrentPage(1);
    setOrder(orderValue);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getArticles({
        page: currentPage,
        pageSize: PAGE_SIZE,
        orderBy: order,
        keyword: value,
      });
      setData(response.list);
    } catch (error) {
      console.error("게시글을 받아오는 중 에러가 발생했습니다.", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 1200) {
      setIsPC(true);
    } else {
      setIsPC(false);
    }
  };

  useEffect(() => {
    if (currentPage === 1 && order === "recent" && !value) {
      setData(initialTotalArticles);
    } else {
      fetchData();
    }
  }, [currentPage, order, initialTotalArticles]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const size = isPC ? "medium" : "small";

  return (
    <div className="my-[60px]">
      <div className="flex gap-[20px] items-center Mobile:flex-col">
        <div className="flex gap-[20px] items-center">
          <SearchInput
            size={size}
            value={value}
            onChange={handleInputChange}
            onSubmit={handleInputSubmit}
          />
          <FilledButton size={size} onClick={handleButtonClick}>
            검색
          </FilledButton>
        </div>
        <div>
          <OrderDropdown order={order} onChange={handleOrderChange} />
        </div>
      </div>
      <TotalArticles totalArticles={data} />
      <div className="my-[60px] flex justify-center">
        <PaginationBar
          totalPage={totalPage}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
          maxPage={5}
        />
      </div>
    </div>
  );
};

export default TotalArticlesContainer;
