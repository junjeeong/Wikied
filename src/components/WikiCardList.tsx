import WikiCard from "@/components/WikiCard";

interface Profile {
  updatedAt: string;
  job: string;
  nationality: string;
  city: string;
  image: string;
  code: string;
  name: string;
  id: number;
}

interface WikiCardListProps {
  list: Profile[];
}

const WikiCardList = ({ list }: WikiCardListProps) => {
  return (
    <div className="grid grid-cols-3 auto-rows-auto gap-[24px] Tablet:grid-cols-2 Mobile:grid-cols-1">
      {list.map((el) => (
        <WikiCard key={el.id} info={el} />
      ))}
    </div>
  );
};

export default WikiCardList;
