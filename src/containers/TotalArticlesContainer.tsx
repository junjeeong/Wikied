import PaginationBar from "@/components/PaginationBar";
import FilledButton from "@/components/ui/Button/FilledButton";
import OrderDropdown from "@/components/ui/Dropdown/OrderDropdown";
import TotalArticles from "@/components/TotalArticles";
import { SearchInput } from "@/components/SearchInput";
import { useRouter } from "next/router";
import { useState } from "react";
import { TotalArticlesContainerProps } from "@/types/types";
import useViewport from "@/hooks/useViewport";
import useNotify from "@/hooks/useNotify";

const TotalArticlesContainer = ({
  totalArticles: initialTotalArticles,
  totalCount,
}: TotalArticlesContainerProps) => {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();
  const notify = useNotify();

  const totalPage = Math.ceil(totalCount / 10);

  const { isPC, isMobile } = useViewport();
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

    if (!inputValue.trim()) {
      notify("검색어를 입력해주세요", "warning");
      return;
    }
  };

  const handleButtonClick = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, keyword: inputValue, page: 1 },
    });

    if (!inputValue.trim()) {
      notify("검색어를 입력해주세요", "warning");
      return;
    }
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
            placeholder="제목으로 게시글 찾기"
          />
          {!isMobile && (
            <FilledButton size={size} onClick={handleButtonClick}>
              검색
            </FilledButton>
          )}
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
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default TotalArticlesContainer;
