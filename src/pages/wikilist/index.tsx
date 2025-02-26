import { getProfiles } from "@/api/profile";
import { AxiosFailed, AxiosSuccess, Profile } from "@/types/types";
import WikiListTitle from "@/components/WikiListTitle";
import WikiCardList from "@/components/WikiCardList";
import LoadingSpinner from "@/components/LoadingSpinner";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import useListState from "@/hooks/useListState";

interface WikiListPageProps {
  initialList: Profile[];
}

export const getServerSideProps = async () => {
  const res = await getProfiles({ pageSize: 12 });

  if (!res.ok) {
    const response = res as AxiosFailed;
    if (response.status === 404) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    } else {
      return {
        redirect: {
          destination: "/500",
          permanent: false,
        },
      };
    }
  } else {
    const response = res as AxiosSuccess;
    return {
      props: {
        initialList: response.data.list,
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
