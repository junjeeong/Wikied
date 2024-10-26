import { getProfiles } from "@/api/profile";
import { SearchInput } from "@/components/SearchInput";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { q } = context.query;
  const res = getProfiles({ name: q as string });

  return {
    props: {
      list: res,
    },
  };
};

const SearchPage = ({ list }) => {
  const router = useRouter();
  const { q } = router.query;

  return <SearchInput size="large" value={q as string} />;
};

export default SearchPage;
