import { useState } from "react";
import { getProfiles } from "@/api/profile";
import { AxiosFailed, AxiosSuccess, Profile } from "@/types/types";
import { useRouter } from "next/router";

const useListState = (initialList: Profile[]) => {
  const [list, setList] = useState<Profile[]>(initialList);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const loadMoreProfiles = async () => {
    const res = await getProfiles({ page: page + 1, pageSize: 12 });

    if (res.ok) {
      const response = res as AxiosSuccess;
      const list = response.data.list;
    } else {
      const response = res as AxiosFailed;
      if (response.status === 404) router.push("/404");
      else router.push("/500");
    }

    if (list.length === 0) {
      setHasMore(false);
    } else {
      setList((prev) => [...prev, ...list]);
      setPage((prev) => prev + 1);
    }
  };

  return { list, loadMoreProfiles, hasMore };
};

export default useListState;
