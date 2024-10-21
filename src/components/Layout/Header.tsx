import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/wikied.svg";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { SearchInput } from "@/components/ui/SearchInput";

export const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Link href="/" aria-label="홈으로 이동">
        <Image src={logo} width={107} height={30} alt="wikied logo" />
      </Link>

      <ul className={styles.navList}>
        <li
          className={`${styles.navItem} ${router.pathname === "/boards" ? styles.isActive : ""}`}
        >
          <Link href="/boards" aria-label="자유 게시판">
            자유 게시판
          </Link>
        </li>
        <li
          className={`${styles.navItem} ${router.pathname === "/wikilist" ? styles.isActive : ""}`}
        >
          <Link href="/wikilist" aria-label="모든 위키">
            모든 위키
          </Link>
        </li>
        <li className={styles.navItem}>
          <SearchInput />
        </li>
      </ul>

      <Link href="/signin">
        <button className={styles.login} aria-label="내 위키 만들기">
          내 위키 만들기
        </button>
      </Link>
    </div>
  );
};
