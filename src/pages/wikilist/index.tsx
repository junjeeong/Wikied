import { getProfiles } from "@/api/profile";
import { Profile } from "@/types/types";
import WikiListTitle from "@/components/WikiListTitle";
import WikiCardList from "@/components/WikiCardList";
import LoadingSpinner from "@/components/LoadingSpinner";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useListState from "@/hooks/useListState";
import { notFound } from "next/navigation";

interface WikiListPageProps {
  initialList: Profile[];
}

export const getServerSideProps = async () => {
  const res = await getProfiles({ pageSize: 12 });

  console.log(res);

  if (res.ok)
    return {
      props: {
        initialList: res.data.list,
      },
    };
  else if (res.data.status === 404) {
    return {
      notFound: true,
    };
  } else {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};

const WikiListPage = ({ initialList }: WikiListPageProps) => {
  const { list, hasMore, loadMoreProfiles } = useListState(initialList);
  const loadingRef = useInfiniteScroll(loadMoreProfiles, hasMore);

  return (
    <div className="mx-auto px-[20px] Mobile:px-[100px] Tablet:px-[60px] w-full max-w-[840px] h-full">
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

export default WikiListPage;
