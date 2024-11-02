import { useEffect, useState } from "react";
import { getComments } from "@/api/comment";
import { Comment } from "@/types/types";

const useComments = (articleId: number) => {
  const [list, setList] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const comments = await getComments(articleId);
      setList(comments);
    };
    fetchData();
  }, [articleId]);

  return { list, setList };
};

export default useComments;
