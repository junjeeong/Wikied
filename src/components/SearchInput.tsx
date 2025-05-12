import { ChangeEventHandler, FormEventHandler } from "react";
import Image from "next/image";

interface SearchInputProps {
  size: "large" | "medium" | "small";
  onSubmit: FormEventHandler;
  onChange?: ChangeEventHandler;
  value?: string;
  placeholder?: string;
}

export const SearchInput = ({
  size,
  onSubmit,
  onChange,
  value,
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
          className={`${style} p-[8px] pl-[56px] pr-[128px] border-none rounded-lg shadow-md bg-gray-100 text-gray-500 text-md focus:outline-green-100 placeholder:text-gray-400`}
          type="text"
          placeholder={value || "이름으로 위키 찾기"}
          onChange={onChange}
          value={value}
        />
        <button
          className={`absolute top-[10px] left-[16px] border-transparent bg-gray-100 cursor-pointer focus:outline-green-100`}
          type="submit"
        >
          <Image
            src={"/icons/ic_search.svg"}
            width={24}
            height={24}
            alt="검색 아이콘"
          />
        </button>
      </div>
    </form>
  );
};
