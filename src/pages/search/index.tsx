import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { getProfilesByName } from "@/api/profile";
import { GetProfilesResponse } from "@/types/types";
import { SearchInput } from "@/components/SearchInput";
import PaginationBar from "@/components/PaginationBar";
import SearchedWikiList from "@/components/SearchedWikiList";
import useSearchName from "@/hooks/useSearchName";
import useViewport from "@/hooks/useViewport";
import TotalCountRender from "@/pages/search/TotalCountRender";

interface SearchPageProps extends GetProfilesResponse {
  q: string;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let res;
  const { page, q } = context.query;

  if (context.query) {
    res = await getProfilesByName({
      page: Number(page),
      name: String(q),
    });
  } else {
    res = await getProfilesByName();
  }

  return {
    props: {
      totalCount: res.data.totalCount || 0,
      list: res.data.list || [],
      q: q || "",
    },
  };
};

const SearchPage = ({ list, totalCount, q }: SearchPageProps) => {
  const router = useRouter();
  const { searchedName, handleChange, handleSubmit } = useSearchName(q);
  const { isMobile } = useViewport();

  const handlePageChange = (clickedPageNumber: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: clickedPageNumber },
    });
  };

  return (
    <div className="relative flex flex-col items-center mx-auto mt-[80px] max-w-[860px] h-screen">
      <div className="relative">
        <SearchInput
          size={isMobile ? "small" : "large"}
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={searchedName}
        />
        <div className="-bottom-[40px] left-0 absolute text-gray-400 text-lg">
          <TotalCountRender q={q} totalCount={totalCount} />
        </div>
      </div>
      <SearchedWikiList list={list} totalCount={totalCount} q={q} />
      <div className="bottom-[10%] absolute">
        <PaginationBar
          totalPage={Math.ceil(totalCount / 3)}
          currentPage={Number(router.query.page) || 1}
          handlePageChange={handlePageChange}
          isLoading={false}
        />
      </div>
    </div>
  );
};

export default SearchPage;
