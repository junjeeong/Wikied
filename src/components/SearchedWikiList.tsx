import { ChangeEvent, FormEvent, useState } from "react";
import { SearchInput } from "./SearchInput";
import { Profile } from "@/types/types";
import { useRouter } from "next/router";
import SearchedWikiCard from "@/containers/SearchedWikiCard";
import useViewport from "@/hooks/useViewport";

interface SearchedWikiListProps {
  list: Profile[];
  totalCount: number;
  q: string;
}

const SearchedWikiList = ({ list, totalCount, q }: SearchedWikiListProps) => {
  const router = useRouter();
  const [searchedName, setSearchedName] = useState(q);
  const { isMobile } = useViewport();

  const handleNavigate = (name: string) => {
    router.push({
      pathname: "/search",
      query: { q: name },
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedName(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNavigate(searchedName);
  };

  return (
    <>
      <div className="relative">
        <SearchInput
          size={!isMobile ? "large" : "small"}
          onSubmit={onSubmit}
          onChange={handleChange}
        />
        <div className="absolute left-0 -bottom-[40px] text-lg text-gray-400 ">
          &ldquo;{q}&ldquo;님을 총 &nbsp;
          <span className="text-green-200">{totalCount}</span>명 찾았습니다.
        </div>
      </div>
      <div className="flex flex-col gap-[24px] mt-[110px]">
        {list.map((el) => (
          <SearchedWikiCard key={el.id} info={el} />
        ))}
      </div>
    </>
  );
};

export default SearchedWikiList;
