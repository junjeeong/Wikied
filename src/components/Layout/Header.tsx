import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchInput } from "@/components/SearchInput";
import Image from "next/image";
import Link from "next/link";
import useAuthStore from "@/store/AuthStore";
import Alarm from "/public/icons/ic_alarm.svg";
import LoginDropdown from "../ui/Dropdown/LoginDropdown";
import LogoutDropdown from "../ui/Dropdown/LogoutDropdown";
import FilledButton from "../ui/Button/FilledButton";

export const Header = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [searchedName, setSearchedName] = useState("");
  const { isLoggedIn } = useAuthStore();

  const handleResize = () => {
    setIsMobile(innerWidth < 768);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedName(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/search",
      query: { q: searchedName },
    });
    setSearchedName("");
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-screen p-6 h-20 bg-gray-50 flex justify-between items-center">
      <Link href="/" aria-label="홈으로 이동">
        <Image
          src={"/logo/wikied.svg"}
          width={107}
          height={30}
          alt="wikied logo"
        />
      </Link>

      <ul className="flex items-center flex-row-reverse flex-grow gap-10 mr-10">
        <li
          className={`${
            router.pathname === "/boards" ? "font-bold" : "text-gray-400"
          } text-md hover:font-bold Mobile:hidden`}
        >
          <Link href="/boards" aria-label="자유 게시판">
            자유 게시판
          </Link>
        </li>
        <li
          className={`${
            router.pathname === "/wikilist" ? "font-bold" : "text-gray-400"
          } text-md hover:font-bold Mobile:hidden`}
        >
          <Link href="/wikilist" aria-label="모든 위키">
            모든 위키
          </Link>
        </li>
        <li className="Mobile:hidden">
          <SearchInput
            size="small"
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={searchedName}
          />
        </li>
      </ul>

      {isLoggedIn ? (
        <div className="flex items-center">
          <Alarm className="cursor-pointer text-gray-400 hover:text-gray-500 Mobile:hidden" />
          <div className="ml-[20px]">
            <LoginDropdown />
          </div>
        </div>
      ) : isMobile ? (
        <LogoutDropdown />
      ) : (
        <Link href="/login">
          <FilledButton>로그인</FilledButton>
        </Link>
      )}
    </div>
  );
};
