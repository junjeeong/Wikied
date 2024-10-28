import { getArticles } from "@/api/article";
import BoardsLayout from "@/components/Layout/BoardsLayout";
import BestBoards from "@/components/ui/BestBoards";
import TotalBoards from "@/containers/TotalBoards";
import { BoardsProps } from "@/types/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  let bestArticles = [];
  let totalArticles = [];
  let totalCount = 0;

  try {
    const bestResponse = await getArticles({
      page: 1,
      pageSize: 4,
      orderBy: "like",
    });
    bestArticles = bestResponse.list;
  } catch (error) {
    console.error("Error fetching best articles:", error);
  }

  try {
    const response = await getArticles({
      page: 1,
      pageSize: 10,
      orderBy: "recent",
    });
    totalArticles = response.list;
    totalCount = response.totalCount;
  } catch (error) {
    console.error("Error fetching total articles:", error);
  }

  return {
    props: {
      bestArticles,
      totalArticles,
      totalCount,
    },
  };
};

const BoardsPage = ({
  bestArticles,
  totalArticles,
  totalCount,
}: BoardsProps) => {
  return (
    <BoardsLayout>
      <BestArticles bestArticles={bestArticles} />
      <TotalArticlesContainer
        totalArticles={totalArticles}
        totalCount={totalCount}
      />
    </BoardsLayout>
  );
};

export default BoardsPage;
