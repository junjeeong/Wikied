import Link from "next/link";
import WikiCard from "@/containers/WikiCard";
import { Profile } from "@/types/Profile"; // Profile 타입을 정의한 파일을 import

interface WikiCardListProps {
  list: Profile[];
}

const WikiCardList = ({ list }: WikiCardListProps) => {
  return (
    <div className="grid grid-cols-3 auto-rows-auto gap-[24px]">
      {list.map((el) => (
        <Link key={el.id} href={`/${el.code}`}>
          <WikiCard info={el} />
        </Link>
      ))}
    </div>
  );
};

export default WikiCardList;
