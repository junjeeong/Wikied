import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo/wikied.svg";
import styles from "./Header.module.css";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Link href="/" aria-label="홈으로 이동">
        <Image src={logo} width={107} height={30} alt="wikied logo" />
      </Link>

      <ul className={styles.navList}>
        <li
          className={`${styles.navItem} ${router.pathname === "/wikilist" ? styles.isActive : ""}`}
        >
          <Link href="/wikilist" aria-label="위키 목록">
            위키 목록
          </Link>
        </li>
        <li
          className={`${styles.navItem} ${router.pathname === "/boards" ? styles.isActive : ""}`}
        >
          <Link href="/boards" aria-label="자유 게시판">
            자유 게시판
          </Link>
        </li>
      </ul>

      <Link href="/signin">
        <button className={styles.login} aria-label="로그인">
          로그인
        </button>
      </Link>
    </div>
  );
};
