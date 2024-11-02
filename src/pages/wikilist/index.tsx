import { GetServerSideProps } from "next";
import { getProfiles } from "@/api/profile";
import { Profile } from "@/types/types";
import WikiListTitle from "@/components/WikiListTitle";
import WikiCardList from "@/components/WikiCardList";
import LoadingSpinner from "@/components/LoadingSpinner";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

interface WikiListProps {
  initialList: Profile[];
}

export const getServerSideProps: GetServerSideProps<
  WikiListProps
> = async () => {
  const res = await getProfiles();
  return {
    props: {
      initialList: res,
    },
  };
};

const WikiList = ({ initialList }: WikiListProps) => {
  const { loadingRef, hasMore, list } = useInfiniteScroll(1, initialList);

  return (
    <div className="max-w-[840px] w-full mx-auto h-full px-[20px] Tablet:px-[60px] Mobile:px-[100px]">
      <WikiListTitle />
      <WikiCardList list={list} />
      {hasMore && (
        <div ref={loadingRef}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default WikiList;
