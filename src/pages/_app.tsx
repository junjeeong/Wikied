import { Header } from "@/components/Layout/Header";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/global.css";
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const getPageTitle = () => {
    if (router.pathname === "/wikilist") {
      return "Wikied - 모든 위키";
    }
    if (router.asPath.startsWith("/wiki")) {
      const name = router.query.name;
      return name ? `Wikied - ${name}` : "Wikied";
    }
    switch (router.pathname) {
      case "/":
        return "Wikied - Home";
      case "/signup":
        return "Wikied - 회원가입";
      case "/login":
        return "Wikied - 로그인";
      case "/quiz-settings":
        return "Wikied - 질문 설정 페이지";
      case "/mypage":
        return "Wikied - 마이페이지";
      case "/search":
        return "Wikied - 위키 찾기";
      case "/boards":
        return "Wikied - 자유게시판";
      case "/addboard":
        return "Wikied - 게시물 작성하기";
      default:
        return "Wikied";
    }
  };

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        <meta property="og:title" content={getPageTitle()} />
        <meta
          property="og:description"
          content="지인들의 위키를 직접 작성하고 공유해보세요"
        />
        <meta property="og:image" content="/images/img_home1.png" />
        <meta
          property="og:url"
          content={`https://example.com${router.pathname}`} // 배포 주소로 변경
        />
        <link rel="icon" href="/logo/logo.svg"></link>
      </Head>
      <Header />
      <Component {...pageProps} />
      <ToastContainer limit={1} />
    </>
  );
}
