import { Header } from "@/components/Layout/Header";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        pauseOnHover={false}
        closeButton={false}
        limit={1}
      />
    </>
  );
}
