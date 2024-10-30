import PaginationBar from "@/components/PaginationBar";
import FilledButton from "@/components/ui/Button/FilledButton";
import OrderDropdown from "@/components/ui/Dropdown/OrderDropdown";
import TotalArticles from "@/components/ui/TotalArticles";
import { SearchInput } from "@/components/SearchInput";
import { getArticles } from "@/api/article";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TotalArticlesContainerProps } from "@/types/types";
import useViewport from "@/hooks/useViewport";

const PAGE_SIZE = 10;

const TotalArticlesContainer = ({
  totalArticles: initialTotalArticles,
  totalCount,
}: TotalArticlesContainerProps) => {
  const [articles, setArticles] = useState(initialTotalArticles);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const totalPage = Math.ceil(totalCount / PAGE_SIZE);

  const router = useRouter();
  const { q = "", order = "recent", page = 1 } = router.query;

  const { isPC } = useViewport();
  const size = isPC ? "medium" : "small";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   router.push({
  //     pathname: router.pathname,
  //     query: { q: e.target.value, order, page: 1 },
  //   });
  // };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { q: inputValue, order, page: 1 },
    });
  };

  const handleButtonClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1 },
    });
  };

  const handleOrderChange = (orderValue: string) => {
    router.push({
      pathname: router.pathname,
      query: { q, order: orderValue, page: 1 },
    });
  };

  const handlePageChange = (currentPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: currentPage },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getArticles({
          page: Number(page),
          pageSize: PAGE_SIZE,
          orderBy: order as string,
          keyword: q as string,
        });
        setArticles(response.list);
      } catch (error) {
        console.error("게시글을 받아오는 중 에러가 발생했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, order, q]);

  return (
    <div className="my-[60px]">
      <div className="flex gap-[20px] items-center Mobile:flex-col">
        <div className="flex gap-[20px] items-center">
          <SearchInput
            size={size}
            value={inputValue}
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
      <TotalArticles totalArticles={articles} />
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
