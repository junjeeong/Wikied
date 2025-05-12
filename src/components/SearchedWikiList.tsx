import { SearchInput } from "./SearchInput";
import { Profile } from "@/types/types";
import SearchedWikiCard from "@/containers/SearchedWikiCard";
import useViewport from "@/hooks/useViewport";
import useSearchName from "@/hooks/useSearchName";

interface SearchedWikiListProps {
  list: Profile[];
  totalCount: number;
  q: string;
}

const SearchedWikiList = ({ list, totalCount, q }: SearchedWikiListProps) => {
  return (
    <div className="relative flex flex-col gap-[24px] mt-[80px]">
      {list.map((el) => (
        <SearchedWikiCard key={el.id} info={el} />
      ))}
    </div>
  );
};

export default SearchedWikiList;
