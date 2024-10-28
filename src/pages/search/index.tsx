import { GetServerSidePropsContext } from "next";
import { getProfilesByName } from "@/api/profile";
import { SearchInput } from "@/components/SearchInput";
import { useRouter } from "next/router";
import { GetProfilesResponse } from "@/types/types";
import PaginationBar from "@/components/PaginationBar";
import SearchedWikiList from "@/components/SearchedWikiList";

// 서버 사이드 프로퍼티 가져오기
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { page, q } = context.query;
  let res: GetProfilesResponse;
  if (q) {
    res = await getProfilesByName({ page: Number(page), name: String(q) });
  } else {
    res = await getProfilesByName({ page: Number(page) });
  }

  return {
    props: {
      totalCount: res.totalCount || 0,
      list: res.list || [],
      q: q || "",
    },
  };
};

// SearchPage 컴포넌트의 프로퍼티 타입 정의
interface SearchPageProps extends GetProfilesResponse {
  q: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ list, totalCount, q }) => {
  const router = useRouter();

  const handlePageChange = (clickedPageNumber: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: clickedPageNumber },
    });
  };

  return (
    <div className="max-w-[860px] flex flex-col items-center mt-[80px] mx-auto">
      <SearchedWikiList list={list} totalCount={totalCount} q={q} />
      <div className="mt-[57px]">
        <PaginationBar
          totalPage={totalCount / 3}
          currentPage={Number(router.query.page) || 1}
          handlePageChange={handlePageChange}
          isLoading={false}
          maxPage={5}
        />
      </div>
    </div>
  );
};

export default SearchPage;
