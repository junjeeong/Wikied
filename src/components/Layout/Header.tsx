import { useRouter } from "next/router";
import { SearchInput } from "@/components/SearchInput";
import Logo from "../Logo";
import Navigation from "../Navigation";
import HeaderMenuContainer from "../../containers/HeaderMenuContainer";
import useViewport from "@/hooks/useViewport";
import useSearchName from "../../hooks/useSearchName";

export const Header = () => {
  const { searchedName, handleChange, handleSubmit } = useSearchName("");
  const { isMobile } = useViewport();
  const router = useRouter();
  const isSearchPage = router.pathname === "/search";

  return (
    <div className="top-0 z-[90] sticky flex justify-between items-center bg-background shadow-sm p-[24px] w-screen h-[80px]">
      <Logo />
      {!isSearchPage && (
        <div className="Mobile:hidden ml-auto">
          <SearchInput
            size="small"
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={searchedName}
          />
        </div>
      )}
      <div className={isSearchPage ? "mx-10 ml-auto" : "mx-10"}>
        <Navigation />
      </div>
      <HeaderMenuContainer isMobile={isMobile} />
    </div>
  );
};
