import { useState } from "react";
import Link from "next/link";
import useAuthStore from "@/store/AuthStore";
import LoginDropdown from "@/components/ui/Dropdown/LoginDropdown";
import LogoutDropdown from "../components/ui/Dropdown/LogoutDropdown";
import FilledButton from "../components/ui/Button/FilledButton";
import AlarmModal from "../components/AlarmModal";

interface HeaderMenuContainerProps {
  isMobile: boolean;
}

const HeaderMenuContainer = ({ isMobile }: HeaderMenuContainerProps) => {
  const { isLoggedIn } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [newAlarmExist, setNewAlarmExist] = useState(false);

  return isLoggedIn ? (
    <div className="flex items-center">
      <AlarmModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        newAlarmExist={newAlarmExist}
        setNewAlarmExist={setNewAlarmExist}
      />
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

export default HeaderMenuContainer;
