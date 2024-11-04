import { useCallback, useEffect, useRef, useState } from "react";
import { getProfiles } from "@/api/profile";
import { Profile } from "@/types/types";

const useInfiniteScroll = (initialPage: number, initialList: Profile[]) => {
  const [list, setList] = useState<Profile[]>(initialList);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const loadMoreProfiles = useCallback(async () => {
    const newProfiles = await getProfiles({ page: page + 1, pageSize: 12 });

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

  return { loadingRef, hasMore, list };
};

export default useInfiniteScroll;
