import { useEffect, useCallback, useState, useRef } from "react";
import { getProfiles } from "@/api/profile";
import { GetServerSideProps } from "next";
import Link from "next/link";
import WikiCard from "@/containers/WikiCard";

interface Profile {
  id: number;
  code: string;
  name: string;
  image: string;
  job: string;
  city: string;
  updatedAt: string;
  nationality: string;
}

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
    <div className="max-w-[840px] w-full mx-auto my-[40px] h-full px-[20px]">
      <div className="mt-[24px] mb-[24px] text-3xl text-gray-400">
        모든 위키
      </div>
      <div className="grid grid-cols-3 auto-rows-auto gap-[24px]">
        {list.map((el) => (
          <Link key={el.id} href={`/${el.code}`}>
            <WikiCard info={el} />
          </Link>
        ))}
      </div>
      {hasMore && (
        <div
          ref={loadingRef}
          className="mt-[20px] flex justify-center items-center h-10"
        >
          <div className="w-[30px] h-[30px] border-4 border-transparent border-t-green-200 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default WikiList;
