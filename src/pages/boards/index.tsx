import { getArticles } from "@/api/article";
import BoardsLayout from "@/components/Layout/BoardsLayout";
import BestBoards from "@/components/BestBoards";
import TotalBoards from "@/containers/TotalBoards";
import { BoardsProps } from "@/types/types";

export const getServerSideProps = async () => {
  let bestArticles = [];
  let recentArticles = [];
  let totalCount = 0;

  try {
    const bestResponse = await getArticles({
      page: 1,
      pageSize: 4,
      orderBy: "like",
    });
    bestArticles = bestResponse.data.list ?? [];
  } catch (error) {
    console.error("Error fetching best articles:", error);
  }

  try {
    const recentResponse = await getArticles({
      page: 1,
      pageSize: 10,
      orderBy: "recent",
    });
    recentArticles = recentResponse.data.list ?? [];
    totalCount = recentResponse.data.totalCount;
  } catch (error) {
    console.error("Error fetching recent articles:", error);
  }

  return {
    props: {
      bestArticles,
      recentArticles,
      totalCount,
    },
  };
};

const BoardsPage = ({
  bestArticles,
  recentArticles,
  totalCount,
}: BoardsProps) => {
  return (
    <BoardsLayout>
      <BestBoards bestArticles={bestArticles} />
      <TotalBoards recentArticles={recentArticles} totalCount={totalCount} />
    </BoardsLayout>
  );
};

export default BoardsPage;
