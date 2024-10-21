import { ChangeEventHandler, FormEventHandler } from "react";
import Image from "next/image";
import searchIcon from "@/assets/icon/ic_search.svg";

interface SearchInputProps {
  size: "large" | "medium" | "small";
  value: string;
  onSubmit: FormEventHandler;
  onChange: ChangeEventHandler;
}

export const SearchInput = ({
  size,
  value,
  onSubmit,
  onChange,
}: SearchInputProps) => {
  const sizes = {
    large: "w-[860px] h-[45px]",
    medium: "w-[704px] h-[45px]",
    small: "w-[335px] h-[45px]",
  };

  const style = sizes[size] || sizes.large;

  return (
    <form onSubmit={onSubmit}>
      <div className="relative">
        <input
          className={`p-2 pl-14 pr-32 border-none rounded-lg bg-gray-100 text-gray-500 text-md focus:outline-green100 ${style}`}
          type="text"
          value={value}
          placeholder="이름으로 위키 찾기"
          onChange={onChange}
        />
        <button
          className={`absolute top-2.5 left-4 border-transparent bg-gray-100 cursor-pointer focus:outline-green100`}
          type="submit"
        >
          <Image src={searchIcon} width={24} height={24} alt="/" />
        </button>
      </div>
    </form>
  );
};
