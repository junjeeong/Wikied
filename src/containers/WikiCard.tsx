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
  const { name = "", city = "", job = "", image = "", code = "" } = info;

  return (
    <div className="flex flex-col w-full h-full border border-solid border-gray-100 shadow-[0_4px_20px_#00000014] rounded-[16px] cursor-pointer overflow-hidden">
      <section className="flex flex-grow-1 justify-between align-middle p-[20px] bg-white">
        <div>
          <h2 className="text-lg font-medium ">{name}</h2>
          <div className="text-gray-300">
            {city} <br /> {job}
          </div>
        </div>
        <div>
          <div className="w-[64px] h-[64px] rounded-[8px] relative">
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt="profile image"
            />
          </div>
        </div>
      </section>
      <section className="flex justify-between align-middle w-full px-[10px] py-[24px] bg-gray-100">
        <span className="text-gray-300 text-md font-medium">
          wikied.kr/{code}
        </span>
        <Image
          src="/icons/ic_link.svg"
          alt="link icon"
          width={16}
          height={16}
        />
      </section>
    </div>
  );
};

export default WikiCard;
