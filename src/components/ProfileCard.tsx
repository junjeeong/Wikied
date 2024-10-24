import userProfileImg from "@/assets/images/userProfileImg.jpg";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

interface UserProfile {
  id: number;
  code: string;
  image: string;
  city: string;
  mbti: string;
  job: string;
  sns: string;
  birthday: string;
  nickname: string;
  bloodType: string;
  family: string;
  nationality: string;
  content: string;
  teamId: string;
  securityQuestion: string;
  updatedAt: string;
  name: string;
}

interface ProfileCardProps {
  userProfile: UserProfile;
}

const ProfileCard = ({ userProfile }: ProfileCardProps) => {
  const { register } = useFormContext();

  const image = userProfileImg;
  const isEditing = true;
  const isMe = true;

  return (
    <div
      className={`${
        isEditing
          ? "w-[400px] h-[828px] p-10 gap-10"
          : "w-80 h-[671px] p-[30px] gap-[30px]"
      } flex flex-col rounded-[10px] shadow-[0_4px_20px_#00000014]`}
    >
      <div className="relative self-center w-[200px] h-[200px] m-[30px]">
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
          alt="유저 프로필 이미지"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className={`${isEditing ? "" : "gap-5"} flex`}>
          <label
            htmlFor="city"
            className={`${
              isEditing ? "w-20 h-[45px]" : "w-[60px] h-6"
            } content-center text-gray-400`}
          >
            거주 도시
          </label>
          {isMe && isEditing ? (
            <input
              className="w-60 h-[45px] rounded-[10px] px-5 py-[10.5px] bg-gray-100"
              id="city"
              type="text"
              placeholder="제공하지 않음"
              {...register("city")}
            />
          ) : (
            <p className="w-[180px] h-6 overflow-hidden whitespace-pre text-ellipsis">
              {userProfile.city}
            </p>
          )}
        </div>
        <p className="text-gray-400">MBTI</p>
        <p className="text-gray-400">직업</p>
        <p className="text-gray-400">SNS 계정</p>
        <p className="text-gray-400">생일</p>
        <p className="text-gray-400">별명</p>
        <p className="text-gray-400">혈액형</p>
        <p className="text-gray-400">국적</p>
      </div>
    </div>
  );
};

export default ProfileCard;
