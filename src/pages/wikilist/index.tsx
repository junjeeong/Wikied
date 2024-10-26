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
      // 새로 갱신된 리스트가 없을 경우 hasMore = false
      setHasMore(false);
    } else {
      setList((prev) => [...prev, ...newProfiles]);
      setPage((prev) => prev + 1);
    }
  }, [page]);

  useEffect(() => {
    const currentRef = loadingRef.current;

    const observer = new IntersectionObserver((entries) => {
      // entries[0] === loadingRef, indicator DOM이 화면에 노출된다면 loadMoreProfile() 호출
      if (entries[0].isIntersecting && hasMore) {
        loadMoreProfiles();
      }
    });

    // currentRef에 해당하는 DOM을 관찰대상으로 추가
    if (currentRef) {
      observer.observe(currentRef);
    }

    // 컴포넌트가 unmout 되면 관찰대상 삭제
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
      {/* 불러올 데이터가 있을 경우에만 무한스크롤 기능 on */}
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
