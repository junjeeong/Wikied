import { SearchInput } from "./SearchInput";
import { Profile } from "@/types/types";
import SearchedWikiCard from "@/containers/SearchedWikiCard";

interface SearchedWikiListProps {
  list: Profile[];
  totalCount: number;
  q: string;
}

const SearchedWikiList = ({ list, totalCount, q }: SearchedWikiListProps) => {
  return (
    <>
      <SearchInput size="large" value={q} />
      <div className="mt-[16px] text-lg text-gray-400 mr-auto ">
        &ldquo;{q}&ldquo;님을 총 &nbsp;
        <span className="text-green-200">{totalCount}</span>명 찾았습니다.
      </div>
      <div className="flex flex-col gap-[24px] mt-[57px]">
        {list.map((el) => (
          <SearchedWikiCard key={el.id} info={el} />
        ))}
      </div>
    </>
  );
};

export default SearchedWikiList;
