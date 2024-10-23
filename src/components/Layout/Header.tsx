import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { SearchInput } from "@/components/SearchInput";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/wikied.svg";
import alarm from "@/assets/icon/ic_alarm.svg";
import profile from "@/assets/icon/ic_profile.svg";
import FilledButton from "../ui/Button/FilledButton";
import useAuthStore from "@/store/AuthStore";

export const Header = () => {
  const router = useRouter();
  const [searchedName, setSearchedName] = useState("");
  const isLoggedIn = true;

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
          } text-md hover:font-bold`}
        >
          <Link href="/boards" aria-label="자유 게시판">
            자유 게시판
          </Link>
        </li>
        <li
          className={`${
            router.pathname === "/wikilist" ? "font-bold" : "text-gray-400"
          } text-md hover:font-bold`}
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

      {isLoggedIn ? (
        <ul className="flex">
          <li className="cursor-pointer hover:text-gray-500">
            <Image
              src={alarm}
              width={32}
              height={32}
              alt="notice my wiki Changed"
            />
          </li>
          <li className="ml-[20px] cursor-pointer hover:text-gray-500">
            <Image src={profile} width={32} height={32} alt="my profile" />
          </li>
        </ul>
      ) : (
        <Link href="/login">
          <FilledButton>로그인</FilledButton>
        </Link>
      )}
    </div>
  );
};
