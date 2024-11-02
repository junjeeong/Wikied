import { useRouter } from "next/router";
import { Profile } from "@/types/types";
import ProfileSVG from "/public/icons/ic_profile.svg";
import CustomLinkContainer from "./CustomLinkContainer";

interface SearchedWikiCardProps {
  info: Profile;
}

const SearchedWikiCard = ({ info }: SearchedWikiCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${info.name}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex relative w-[859px] h-[142px] px-[36px] py-[24px] border rounded-[10px] shadow-[0_4px_20px_#00000014]  cursor-pointer hover:scale-105 transition-all Tabel:w-[696px] Tablet:h-[142px] Mobile:w-[334px] Mobile:h-[150px] "
    >
      <div className="flex gap-[32px] flex-grow">
        <ProfileSVG className="w-[85px] h-[85px] text-gray-300" />
        <div>
          <h2 className="text-gray-500 text-2xl">{info.name}</h2>
          <span className="mt-[14px] text-gray-400">
            {info.city}, {info.nationality} <br />
            {info.job}
          </span>
        </div>
      </div>
      <div className="absolute bottom-[24px] right-[36px]">
        {/* <CustomLinkContainer /> */}
      </div>
    </div>
  );
};

export default SearchedWikiCard;
