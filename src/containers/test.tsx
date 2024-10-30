import PaginationBar from "@/components/PaginationBar";
import FilledButton from "@/components/ui/Button/FilledButton";
import OrderDropdown from "@/components/ui/Dropdown/OrderDropdown";
import TotalArticles from "@/components/TotalArticles";
import { SearchInput } from "@/components/SearchInput";
import { getArticles } from "@/api/article";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TotalArticlesContainerProps } from "@/types/types";

const PAGE_SIZE = 10;

const TotalArticlesContainer = ({
  totalArticles: initialTotalArticles,
  totalCount,
}: TotalArticlesContainerProps) => {
  const [data, setData] = useState(initialTotalArticles);
  const [isPC, setIsPC] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const totalPage = Math.ceil(totalCount / PAGE_SIZE);

  const { q = "", order = "recent", page = 1 } = router.query;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await getArticles({
        page: Number(page),
        pageSize: PAGE_SIZE,
        orderBy: order as string,
        keyword: q as string,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push({
      pathname: "/boards",
      query: { q: e.target.value, order, page: 1 },
    });
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({ pathname: "/boards", query: { q, order, page: 1 } });
  };

  const handleButtonClick = () => {
    router.push({ pathname: "/boards", query: { q, order, page: 1 } });
  };

  const handleOrderChange = (orderValue: string) => {
    router.push({
      pathname: "/boards",
      query: { q, order: orderValue, page: 1 },
    });
  };

  const handlePageChange = (page: number) => {
    router.push({ pathname: "/boards", query: { q, order, page } });
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (Number(page) === 1 && order === "recent" && !q) {
      setData(initialTotalArticles);
    } else {
      fetchData();
    }
  }, [page, order, q, initialTotalArticles]);

  const size = isPC ? "medium" : "small";

  return (
    <div className="my-[60px]">
      <div className="flex gap-[20px] items-center Mobile:flex-col">
        <div className="flex gap-[20px] items-center">
          <SearchInput
            size={size}
            value={q as string}
            onChange={handleInputChange}
            onSubmit={handleInputSubmit}
          />
          <FilledButton size={size} onClick={handleButtonClick}>
            검색
          </FilledButton>
        </div>
        <div>
          <OrderDropdown order={order as string} onChange={handleOrderChange} />
        </div>
      </div>
      <TotalArticles totalArticles={data} />
      <div className="my-[60px] flex justify-center">
        <PaginationBar
          totalPage={totalPage}
          currentPage={Number(page)}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
          maxPage={5}
        />
      </div>
    </div>
  );
};

export default TotalArticlesContainer;
