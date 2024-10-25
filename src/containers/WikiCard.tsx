import Image from "next/image";

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
          <div className="rounded-[8px] w-[64px] h-[64px] overflow-hidden relative">
            <Image
              src={info.image}
              layout="fill"
              objectFit="cover"
              alt="profile image"
            />
          </div>
        </div>
      </section>
      <section className="flex justify-between align-middle w-full px-[24px] py-[24px] bg-gray-100">
        <span className="text-gray-300 text-md font-medium">
          wikied.kr/junjeeong
        </span>
        <Image
          src="/icons/ic_link.svg"
          alt="link icon"
          width={20}
          height={20}
        />
      </section>
    </div>
  );
};

export default WikiCard;
