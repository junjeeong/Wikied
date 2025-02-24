import { getArticle } from "@/api/article";
import { Article } from "@/types/types";
import { useEffect, useState } from "react";

const useFetchArticle = (articleId: number) => {
  const [article, setArticle] = useState<Article | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [unknownError, setUnKnownError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getArticle(articleId);

      if (res.ok) {
        setIsLoading(false);
        setArticle(res.data);
      } else {
        if (res.status === 404) {
          setIsLoading(false);
          setNotFound(true);
        } else {
          setIsLoading(false);
          setUnKnownError(true);
        }
      }
    };

    fetchData();
  }, [articleId]);

  return { article, isLoading, notFound, unknownError };
};

export default useFetchArticle;
