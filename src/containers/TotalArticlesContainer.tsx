import PaginationBar from "@/components/PaginationBar";
import FilledButton from "@/components/ui/Button/FilledButton";
import OrderDropdown from "@/components/ui/Dropdown/OrderDropdown";
import TotalArticles from "@/components/ui/TotalArticles";
import { SearchInput } from "@/components/SearchInput";
import { useRouter } from "next/router";
import { useState } from "react";
import { TotalArticlesContainerProps } from "@/types/types";
import useViewport from "@/hooks/useViewport";

const TotalArticlesContainer = ({
  totalArticles: initialTotalArticles,
  totalCount,
}: TotalArticlesContainerProps) => {
  const [inputValue, setInputValue] = useState("");
  // const [isLoading, setIsLoading] = useState(false); 로딩 처리를 인덱스에서 해야함
  const totalPage = Math.ceil(totalCount / 10);
  const router = useRouter();

  const { isPC } = useViewport();
  const size = isPC ? "medium" : "small";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: router.pathname,
      query: { ...router.query, keyword: inputValue, page: 1 },
    });
  };

  const handleButtonClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, keyword: inputValue, page: 1 },
    });
  };

  const handleOrderChange = (orderValue: string) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, order: orderValue, page: 1 },
    });
  };

  const handlePageChange = (currentPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: currentPage },
    });
  };

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
          <OrderDropdown
            order={String(router.query.order)}
            onChange={handleOrderChange}
          />
        </div>
      </div>
      <TotalArticles totalArticles={initialTotalArticles} />
      <div className="my-[60px] flex justify-center">
        <PaginationBar
          totalPage={totalPage}
          currentPage={Number(router.query.page)}
          handlePageChange={handlePageChange}
          isLoading={false}
          maxPage={5}
        />
      </div>
    </div>
  );
};

export default TotalArticlesContainer;
