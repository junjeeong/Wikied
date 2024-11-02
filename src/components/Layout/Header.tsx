import { SearchInput } from "@/components/SearchInput";
import Logo from "../Logo";
import Navigation from "../Navigation";
import HeaderMenuContainer from "../../containers/HeaderMenuContainer";
import useViewport from "@/hooks/useViewport";
import useSearchName from "../../hooks/useSearchName";

export const Header = () => {
  const { searchedName, handleChange, handleSubmit } = useSearchName();
  const { isMobile } = useViewport();

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
