import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, ReactNode, useRef, useEffect } from "react";

interface MenuItemProps {
  children: ReactNode;
  href: string;
  onClick: () => void;
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

const LogoutDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const currentPath = router.pathname;

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
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleToggle} type="button">
        <Image
          src={"/icons/ic_hamburger.svg"}
          width={24}
          height={24}
          alt="메뉴"
        />
      </button>
      {isOpen && (
        <div className="flex flex-col whitespace-nowrap rounded-[10px] bg-gray-50 shadow-[0_4px_20px_#00000014] absolute top-[37px] right-0 z-10">
          {currentPath !== "/mypage" && (
            <MenuItem href={"/wikilist"} onClick={handleToggle}>
              모든위키
            </MenuItem>
          )}
          {currentPath !== "/boards" && (
            <MenuItem href={"/boards"} onClick={handleToggle}>
              자유게시판
            </MenuItem>
          )}
          {currentPath !== "/login" && (
            <MenuItem
              className="hover:text-green-500"
              href={"/login"}
              onClick={handleToggle}
            >
              로그인
            </MenuItem>
          )}
        </div>
      )}
    </div>
  );
};

export default LogoutDropdown;
