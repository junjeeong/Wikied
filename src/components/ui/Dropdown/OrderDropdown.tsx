import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface OrderDropdownProps {
  order: string;
  onChange: (value: string) => void;
}

const OrderDropdown = ({ order, onChange }: OrderDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleMenuClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
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

  const buttonText = order === "recent" ? "최신순" : "좋아요순";

  return (
    <div className="relative w-fit" ref={dropdownRef}>
      <button
        className="flex justify-between items-center bg-gray-100 w-[140px] py-[14px] px-[20px] rounded-[10px] text-gray-500 text-md font-normal"
        onClick={handleToggle}
        type="button"
      >
        {buttonText}
        <Image
          src={"/icons/ic_arrow-bottom.svg"}
          width={22}
          height={22}
          alt="열림"
        />
      </button>
      {isOpen && (
        <ul className="flex flex-col w-[140px] whitespace-nowrap rounded-[10px] text-gray-500 text-md font-normal bg-gray-50 shadow-custom absolute top-[60px] z-10">
          <li
            className="flex justify-center py-[14px] px-[20px] cursor-pointer transition-transform transform hover:scale-110"
            onClick={() => handleMenuClick("recent")}
          >
            최신순
          </li>
          <li
            className="flex justify-center py-[14px] px-[20px] cursor-pointer transition-transform transform hover:scale-110"
            onClick={() => handleMenuClick("like")}
          >
            좋아요순
          </li>
        </ul>
      )}
    </div>
  );
};

export default OrderDropdown;
