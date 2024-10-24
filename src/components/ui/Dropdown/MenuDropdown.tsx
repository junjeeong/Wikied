import Profile from "/public/icons/ic_profile.svg";
import Image from "next/image";
import Link from "next/link";
import { useState, ReactNode, useRef, useEffect } from "react";

interface MenuItemProps {
  children: ReactNode;
  href?: string;
}

const MenuItem = ({ children, href = "" }: MenuItemProps) => {
  return (
    <Link
      href={href}
      className="py-[10px] px-[30px] text-gray-500 text-md font-normal transition-transform  hover:scale-105 "
    >
      {children}
    </Link>
  );
};

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={handleToggle} type="button">
        <Image src={Profile} width={32} height={32} alt="프로필" />
      </button>
      {isOpen && (
        <div className="flex flex-col whitespace-nowrap rounded-[10px] bg-gray-50 shadow-custom absolute top-[37px] right-0">
          <MenuItem href={"/wikilist"}>위키목록</MenuItem>
          <MenuItem href={"/boards"}>자유게시판</MenuItem>
          <MenuItem>알림</MenuItem>
          <MenuItem href={"/mypage"}>마이페이지</MenuItem>
        </div>
      )}
    </div>
  );
};

export default MenuDropdown;
