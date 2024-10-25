import Image from "next/image";
import LinkSVG from "/public/icons/ic_link.svg";

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

interface WikiCardProps {
  info: Profile;
}

const WikiCard = ({ info }: WikiCardProps) => {
  return (
    <div className="flex flex-col w-full h-full border border-solid border-gray-100 shadow-[0_4px_20px_#00000014] rounded-[16px] cursor-pointer overflow-hidden hover:scale-105 transition-all">
      <section className="flex flex-grow-1 justify-between align-middle p-[20px] bg-white">
        <div>
          <h2 className="text-2lg font-medium ">{info.name}</h2>
          <div className="mt-[4px] text-md leading-4 text-gray-300">
            {info.city} <br /> {info.job}
          </div>
        </div>
        <div>
          <div className="rounded-full w-[64px] h-[64px] text-gray-300 overflow-hidden relative">
            {info.image ? (
              <Image
                src={info.image}
                layout="fill"
                objectFit="cover"
                alt="profile image"
              />
            ) : (
              <Image
                src="/icons/ic_profile.svg"
                layout="fill"
                objectFit="cover"
                alt="proflie image"
              />
            )}
          </div>
        </div>
      </section>
      <section className="flex justify-between align-middle w-full px-[24px] py-[24px] bg-gray-100">
        <span className="text-gray-400 text-md font-semibold truncate max-w-xs">
          wikied.kr/{info.code}
        </span>
        <LinkSVG className="text-gray-400 font-semibold w-[40px]" />
      </section>
    </div>
  );
};

export default WikiCard;
