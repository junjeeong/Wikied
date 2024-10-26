import { GetServerSidePropsContext } from "next";
import { getProfiles } from "@/api/profile";
import { SearchInput } from "@/components/SearchInput";
import PaginationBar from "@/components/PaginationBar";

// 프로필 항목의 타입 정의
interface Profile {
  id: number; // id를 number로 수정
  code: string;
  name: string;
  job: string;
  city: string;
  image: string;
  nationality: string;
  updatedAt: string;
}

// getProfiles의 반환 값 타입 정의
interface GetProfilesResponse {
  totalCount: number;
  list: Profile[];
}

// 서버 사이드 프로퍼티 가져오기
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { q } = context.query;
  const res: GetProfilesResponse = await getProfiles({ name: q as string });

  return {
    props: {
      totalCount: res.totalCount,
      list: res.list,
    },
  };
};

// SearchPage 컴포넌트의 프로퍼티 타입 정의
interface SearchPageProps extends GetProfilesResponse {
  q: string; // 쿼리 문자열도 props에 추가
}

const SearchPage: React.FC<SearchPageProps> = ({ list, totalCount, q }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SearchInput size="large" value={q} />
      <div className="mt-[16px] text-lg text-gray-50">
        "{q}"님을 총<span className="text-green-100">{totalCount}</span>명
        찾았습니다.
      </div>
      <div className="flex felx-col gap-[24px]">
        {list.map((el) => (
          <SearchedWikiCard />
        ))}
      </div>
      <PaginationBar />
    </div>
  );
};

export default SearchPage;
