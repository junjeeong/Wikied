import Image from "next/image";
import searchIcon from "@/assets/icon/ic_search.png";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  size: "large" | "medium" | "small";
  value: string;
  onSubmit: () => void;
  onChange: () => void;
}

export const SearchInput = ({
  size,
  value,
  onSubmit,
  onChange,
}: SearchInputProps) => {
  // 들어오는 size에 따라 크기가 달라지게 설계함.
  // 검색 input이니까 제출했을떄 value가 url에 표시가 되어야 함.
  // input 안에있는 값이 바뀔때마다 부모 컴포넌트의 state 값이 바뀌어야 함. -> 제어 컴포넌트
  // value = state 값이라고 보면 됨.

  const sizes = {
    large: { width: "860px", height: "45px" },
    medium: { width: "704px", height: "45px" },
    small: { width: "335px", height: "45px" },
  };

  const style = sizes[size] || sizes.large;
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.container}>
        <input
          className={styles.input}
          style={sizes[size]}
          type="text"
          value={value}
          placeholder="이름으로 위키 찾기"
          onChange={onChange}
        />
        <button className={styles.button} type="submit">
          <Image src={searchIcon} width={24} height={24} alt="/" />
        </button>
      </div>
    </form>
  );
};
