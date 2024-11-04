import { Profile } from "@/types/types";
import ProfileSVG from "/public/icons/ic_profile.svg";
import CustomLinkContainer from "./CustomLinkContainer";
import Link from "next/link";
import useViewport from "@/hooks/useViewport";

interface SearchedWikiCardProps {
  info: Profile;
}

const SearchedWikiCard = ({ info }: SearchedWikiCardProps) => {
  const { isMobile } = useViewport();

  return (
    <div className=" relative flex w-[859px] h-[142px] px-[36px] py-[24px] border rounded-[10px] shadow-[0_4px_20px_#00000014]  cursor-pointer hover:scale-105 transition-all Tabel:w-[696px] Tablet:h-[142px] Mobile:w-[334px] Mobile:h-[150px] ">
      <Link href={`/wiki/${info.name}`}>
        <div className="flex gap-[32px]">
          <ProfileSVG className="w-[85px] h-[85px] text-gray-300 Mobile:w-[60px] Mobile:h-[60px]" />
          <div className="w-[350px]">
            <h2 className="text-gray-500 text-2xl Mobile:text-lg">
              {info.name}
            </h2>
            <span className="mt-[14px] text-gray-400 Mobile: text-sm">
              {info.city}, {info.nationality} <br />
              {info.job}
            </span>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-[24px] right-[36px] Mobile:bottom-[15px] Mobile:right-[21px]">
        <CustomLinkContainer
          link={`/wiki/${info.name}`}
          size={isMobile ? "small" : "medium"}
        />
      </div>
    </div>
  );
};

export default SearchedWikiCard;
