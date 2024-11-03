import { getArticle } from "@/api/article"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic";


const NoSSRContent = dynamic(() => import("@/lib/ssrContent"), {
  ssr: false,
});
const Test = () => {

  const [content, setContent] = useState("")
useEffect(() => {
  const getArticleById= async () => {
    const res = await getArticle(1239);
    setContent(res.content);
  }
  getArticleById()
})


  return <NoSSRContent content={content} />;
}

export default Test;