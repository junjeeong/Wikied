import { getProfiles } from "@/api/profile";
import { GetServerSideProps } from "next";
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

interface Props {
  list: Profile[];
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const res = await getProfiles();
  return {
    props: {
      list: res,
    },
  };
};

export const WikiList: React.FC<Props> = ({ list }) => {
  return (
    <>
      <div className="mt-[24px] mb-[24px] text-xl text-gray-400">모든 위키</div>
      <div className="grid grid-cols-3 auto-rows-auto gap-[24px]">
        {list.map((el) => (
          <WikiCard key={el.id} info={el} />
        ))}
      </div>
    </>
  );
};

export default WikiList;
