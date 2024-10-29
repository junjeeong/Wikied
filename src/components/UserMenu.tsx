import { useState } from "react";
import Link from "next/link";
import Alarm from "/public/icons/ic_alarm.svg";
import useAuthStore from "@/store/AuthStore";
import LoginDropdown from "@/components/ui/Dropdown/LoginDropdown";
import LogoutDropdown from "./ui/Dropdown/LogoutDropdown";
import FilledButton from "./ui/Button/FilledButton";
import NotificatonModalContainer from "@/containers/NotificationModalContainer";

interface UserMenuProps {
  isMobile: boolean;
}

const UserMenu = ({ isMobile }: UserMenuProps) => {
  const { isLoggedIn } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return isLoggedIn ? (
    <div className="flex items-center">
      <Alarm
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative cursor-pointer text-gray-400 hover:text-gray-500 Mobile:hidden"
      />
      {isOpen && (
        <div className="absolute -bottom-[50%] right-[80px]">
          <NotificatonModalContainer />
        </div>
      )}
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
  );
};

export default UserMenu;
