import Profile from "/public/icons/ic_profile.svg";
import CustomLink from "../components/ui/CustomLink";

interface SearchedWikiCardProps {
  info: {
    id: 1;
    code: string;
    name: string;
    job: string;
    city: string;
    image: string;
    updatedAt: string;
    nationality: string;
  };
}

const SearchedWikiCard = ({ info }: SearchedWikiCardProps) => {
  return (
    <div className="w-[859px] h-[142px] px-[36px] py-[24px] border rounded-[10px] shadow-[0_4px_20px_#00000014] Tabel:w-[696px] Tablet:h-[142px] Mobile:w-[334px] Mobile:h-[150px] ">
      <div className="flex gap-[32px]">
        <Profile className="w-[85px] h-[85px] text-gray-300" />
        <div>
          <h2 className="text-gray-500 text-2xl">{info.name}</h2>
          <span className="mt-[14px] text-gray-400">
            {info.city}, {info.nationality} <br />
            {info.job}
          </span>
        </div>
      </div>
      <CustomLink link={`https://www.wikied.kr/${info.id}`} />
    </div>
  );
};

export default SearchedWikiCard;
