import { useState } from "react";
import { getProfiles } from "@/api/profile";
import { AxiosFailed, AxiosSuccess, Profile } from "@/types/types";
import { useRouter } from "next/router";

function isAxiosFailed(res: any): res is AxiosFailed {
  return !res.ok && "status" in res;
}

const useListState = (initialList: Profile[]) => {
  const [list, setList] = useState<Profile[]>(initialList);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const loadMoreProfiles = async () => {
    const res = await getProfiles({ page: page + 1, pageSize: 12 });

    if (res.ok) {
      const response = res as AxiosSuccess;
      const newList = response.data.list;

      if (newList.length === 0) {
        setHasMore(false);
      } else {
        setList((prev) => [...prev, ...newList]);
        setPage((prev) => prev + 1);
      }
    } else if (isAxiosFailed(res)) {
      if (res.status === 404) router.push("/404");
      else router.push("/500");
    }
  };

  return { list, loadMoreProfiles, hasMore };
};

export default useListState;
