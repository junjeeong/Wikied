import { SearchInput } from "./SearchInput";
import { Profile } from "@/types/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SearchedWikiCard from "@/containers/SearchedWikiCard";
import { useRouter } from "next/router";

interface SearchedWikiListProps {
  list: Profile[];
  totalCount: number;
  q: string;
}

const SearchedWikiList = ({ list, totalCount, q }: SearchedWikiListProps) => {
  const router = useRouter();
  const [searchedName, setSearchedName] = useState(q);

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
      <SearchInput size="large" onSubmit={onSubmit} onChange={handleChange} />
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
