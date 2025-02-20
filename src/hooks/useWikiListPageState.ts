import { useState } from "react";
import { getProfiles } from "@/api/profile";
import { Profile } from "@/types/types";

const useWikiListPageState = (initialList: Profile[]) => {
  const [list, setList] = useState<Profile[]>(initialList);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreProfiles = async () => {
    const res = await getProfiles({ page: page + 1, pageSize: 12 });

    if (res.data.length === 0) {
      setHasMore(false);
    } else {
      setList((prev) => [...prev, ...res.data]);
      setPage((prev) => prev + 1);
    }
  };

  return { list, loadMoreProfiles, hasMore };
};

export default useWikiListPageState;
