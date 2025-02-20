import { useEffect, useRef } from "react";

const useInfiniteScroll = (loadMore: () => Promise<void>, hasMore: boolean) => {
  const loadingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = loadingRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
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
  }, [loadMore, hasMore]);

  return loadingRef;
};

export default useInfiniteScroll;
