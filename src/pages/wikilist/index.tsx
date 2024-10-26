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
  list: Profile[];
}

export const getServerSideProps: GetServerSideProps<
  WikiListProps
> = async () => {
  const res = await getProfiles();
  console.log(res);

  return {
    props: {
      list: res,
    },
  };
};

export const WikiList = ({ list }: WikiListProps) => {
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
    </div>
  );
};

export default WikiList;
