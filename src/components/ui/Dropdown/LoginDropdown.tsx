import useAuthStore from "@/store/AuthStore";
import Link from "next/link";
import Profile from "/public/icons/ic_profile.svg";
import Menu from "/public/icons/ic_menu.svg";
import { useRouter } from "next/router";
import { useState, ReactNode, useRef, useEffect } from "react";

interface MenuItemProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const MenuItem = ({
  children,
  href = "",
  onClick,
  className = "",
}: MenuItemProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`py-[10px] px-[30px] text-gray-500 text-md font-normal transition-transform transform hover:scale-110 ${className}`}
    >
      {children}
    </Link>
  );
};

const LoginDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const currentPath = router.pathname;
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 767);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {!isMobile ? (
        <button className="align-top" onClick={handleToggle} type="button">
          <Profile
            className="text-gray-400 hover:text-gray-500"
            width={32}
            height={32}
          />
        </button>
      ) : (
        <button className="align-top" onClick={handleToggle} type="button">
          <Menu
            className="text-gray-400 hover:text-gray-500"
            width={24}
            height={24}
          />
        </button>
      )}
      {isOpen && (
        <div className="flex flex-col whitespace-nowrap rounded-[10px] bg-gray-50 shadow-[0_4px_20px_#00000014] absolute top-[37px] right-0 z-10">
          {currentPath !== "/mypage" && (
            <MenuItem href={"/mypage"} onClick={handleToggle}>
              계정설정
            </MenuItem>
          )}
          {currentPath !== `/wikilist/${user?.name}` && (
            <MenuItem href={`/wikilist/${user?.name}`} onClick={handleToggle}>
              내위키
            </MenuItem>
          )}
          {isMobile && currentPath !== "/wikilist" && (
            <MenuItem href={"/wikilist"} onClick={handleToggle}>
              모든위키
            </MenuItem>
          )}
          {isMobile && currentPath !== "/boards" && (
            <MenuItem href={"/boards"} onClick={handleToggle}>
              자유게시판
            </MenuItem>
          )}
          {isMobile && <MenuItem onClick={handleToggle}>알림</MenuItem>}
          <MenuItem
            className="text-red-500"
            href="#"
            onClick={() => {
              handleToggle();
              logout();
            }}
          >
            로그아웃
          </MenuItem>
        </div>
      )}
    </div>
  );
};

export default LoginDropdown;
