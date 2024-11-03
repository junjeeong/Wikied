import { GetServerSidePropsContext } from "next";
import { getProfilesByName } from "@/api/profile";
import { useRouter } from "next/router";
import { GetProfilesResponse } from "@/types/types";
import PaginationBar from "@/components/PaginationBar";
import SearchedWikiList from "@/components/SearchedWikiList";
import { Profile } from "@/types/types";

interface SearchPageProps extends GetProfilesResponse {
  q: string;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let res: GetProfilesResponse;
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
      totalCount: res.totalCount || 0,
      list: res.list || [],
      q: q || "",
    },
  };
};

const SearchPage = ({ list, totalCount, q }: SearchPageProps) => {
  const router = useRouter();

  const handlePageChange = (clickedPageNumber: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: clickedPageNumber },
    });
  };

  return (
    <div className="relative max-w-[860px] h-screen flex flex-col items-center py-[160px] mx-auto">
      <SearchedWikiList list={list} totalCount={totalCount} q={q} />
      <div className="absolute bottom-[10%]">
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
