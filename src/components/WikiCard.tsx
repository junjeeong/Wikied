import Image from "next/image";
import LinkSVG from "/public/icons/ic_link.svg";
import Profile from "/public/icons/ic_profile.svg";

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
      <section className="flex flex-grow-1 justify-between p-[20px] bg-white">
        <div>
          <h2 className="text-2lg font-medium">{info.name}</h2>
          <div className="flex flex-col gap-[4px] mt-[8px] text-gray-300 text-md leading-4">
            <p>{info.city}</p>
            <p>{info.job}</p>
          </div>
        </div>
        <div>
          <div className="rounded-full w-[70px] h-[70px] text-gray-300 overflow-hidden relative">
            {info.image ? (
              <Image
                src={info.image}
                layout="fill"
                objectFit="cover"
                alt="profile image"
              />
            ) : (
              <Profile className="text-gray-300" />
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
