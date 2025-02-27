import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getArticle } from "@/api/article";
import { Article } from "@/types/types";

const useFetchArticle = (articleId: number) => {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getArticle(articleId);

      if (res.ok) {
        setArticle(res.data);
      } else {
        if (res.data.status === 404) {
          router.push("/404");
        } else {
          router.push("/500");
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, [articleId, router]);

  return { article, isLoading };
};

export default useFetchArticle;
