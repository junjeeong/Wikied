// pages/WikiList.tsx
import { useEffect, useCallback, useState, useRef } from "react";
import { getProfiles } from "@/api/profile";
import { GetServerSideProps } from "next";
import WikiListTitle from "@/components/WikiListTitle";
import WikiCardList from "@/components/WikiCardList";
import LoadingSpinner from "@/components/LoadingSpinner";

interface Profile {
  updatedAt: string;
  job: string;
  nationality: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

interface WikiListProps {
  initialList: Profile[];
}

export const getServerSideProps: GetServerSideProps<
  WikiListProps
> = async () => {
  const res = await getProfiles({ pageSize: 12 });
  return {
    props: {
      initialList: res,
    },
  };
};

const WikiList = ({ initialList }: WikiListProps) => {
  const [list, setList] = useState<Profile[]>(initialList);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const loadMoreProfiles = useCallback(async () => {
    const newProfiles = await getProfiles({ page: page + 1 });

    if (newProfiles.length === 0) {
      setHasMore(false);
    } else {
      setList((prev) => [...prev, ...newProfiles]);
      setPage((prev) => prev + 1);
    }
  }, [page]);

  useEffect(() => {
    const currentRef = loadingRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProfiles();
      }
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMoreProfiles, hasMore]);

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
