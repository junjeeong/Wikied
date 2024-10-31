import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SearchInput } from "@/components/SearchInput";
import Logo from "../Logo";
import Navigation from "../Navigation";
import HeaderMenuContainer from "../../containers/HeaderMenuContainer";

export const Header = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [searchedName, setSearchedName] = useState("");

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
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
    <div className="w-screen p-[24px] h-[80px] bg-background flex justify-between items-center shadow-sm sticky top-0 z-[90]">
      <Logo />
      <div className="ml-auto Mobile:hidden">
        <SearchInput
          size="small"
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={searchedName}
        />
      </div>
      <div className="mx-10">
        <Navigation />
      </div>
      <HeaderMenuContainer isMobile={isMobile} />
    </div>
  );
};
