import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { SearchInput } from "@/components/SearchInput";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/wikied.svg";

export const Header = () => {
  const router = useRouter();
  const [searchedName, setSearchedName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { q: searchedName },
    });
  };

  return (
    <div className="w-screen p-6 h-20 bg-gray-50 flex justify-between items-center">
      <Link href="/" aria-label="홈으로 이동">
        <Image src={logo} width={107} height={30} alt="wikied logo" />
      </Link>

      <ul className="flex items-center flex-row-reverse flex-grow gap-10 mr-10">
        <li
          className={`${
            router.pathname === "/boards" ? "font-bold" : "text-gray-400"
          } text-sm hover:font-bold`}
        >
          <Link href="/boards" aria-label="자유 게시판">
            자유 게시판
          </Link>
        </li>
        <li
          className={`${
            router.pathname === "/wikilist" ? "font-bold" : "text-gray-400"
          } text-sm hover:font-bold`}
        >
          <Link href="/wikilist" aria-label="모든 위키">
            모든 위키
          </Link>
        </li>
        <li>
          <SearchInput
            size="small"
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={searchedName}
          />
        </li>
      </ul>

      <Link href="/signin">
        <button className="text-sm h-8 font-bold border-none rounded-lg px-4 bg-green-200 text-gray-50 cursor-pointer hover:bg-green-100">
          로그인
        </button>
      </Link>
    </div>
  );
};
