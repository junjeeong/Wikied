import { getArticles } from "@/api/article";
import BoardsLayout from "@/components/Layout/BoardsLayout";
import BestArticles from "@/components/BestArticles";
import TotalArticlesContainer from "@/containers/TotalArticlesContainer";
import { BoardsProps } from "@/types/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { keyword = "", order = "recent", page = 1 } = context.query;

  let bestArticles = [];
  let totalArticles = [];
  let totalCount = 0;

  try {
    const res = await getArticles({
      page: 1,
      pageSize: 4,
      orderBy: "like",
      keyword: "",
    });
    bestArticles = res.data.list;
  } catch (error) {
    console.error("Error fetching best articles:", error);
  }

  try {
    const res = await getArticles({
      page: Number(page),
      pageSize: 10,
      orderBy: String(order),
      keyword: String(keyword),
    });
    totalArticles = res.data.list;
    totalCount = res.data.totalCount;
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
