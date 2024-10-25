import Image from "next/image";
import ProfileInput from "./ProfileInput";

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
  // 수정해야 할 부분
  const isEditing = true;
  const isMe = true;

  const defaultURL = "https://example.com/...";
  userProfile.image = defaultURL;

  return (
    <div
      className={`${
        isEditing
          ? "w-[400px] h-[828px] p-10 gap-10"
          : "w-80 h-[671px] p-[30px] gap-[30px]"
      } flex flex-col rounded-[10px] shadow-[0_4px_20px_#00000014]`}
    >
      <div
        className={`${
          isEditing ? "m-5" : "m-[30px]"
        } relative self-center w-[200px] h-[200px]`}
      >
        {userProfile.image === defaultURL ? (
          <div className="w-full h-full rounded-full bg-gray-400 "></div>
        ) : (
          <Image
            src={userProfile.image}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            alt="유저 프로필 이미지"
          />
        )}
      </div>

      <div className="flex flex-col gap-4">
        <ProfileInput
          isMe={isMe}
          isEditing={isEditing}
          label="거주 도시"
          Id="city"
          inputValue={userProfile.city}
        />
        <ProfileInput
          isMe={isMe}
          isEditing={isEditing}
          label="MBTI"
          Id="mbti"
          inputValue={userProfile.mbti}
        />
        <ProfileInput
          isMe={isMe}
          isEditing={isEditing}
          label="직업"
          Id="job"
          inputValue={userProfile.job}
        />
        <ProfileInput
          isMe={isMe}
          isEditing={isEditing}
          label="SNS 계정"
          Id="sns"
          inputValue={userProfile.sns}
        />
        <ProfileInput
          isMe={isMe}
          isEditing={isEditing}
          label="생일"
          Id="birthday"
          inputValue={userProfile.birthday}
        />
        <ProfileInput
          isMe={isMe}
          isEditing={isEditing}
          label="별명"
          Id="nickname"
          inputValue={userProfile.nickname}
        />
        <ProfileInput
          isMe={isMe}
          isEditing={isEditing}
          label="혈액형"
          Id="bloodType"
          inputValue={userProfile.bloodType}
        />
        <ProfileInput
          isMe={isMe}
          isEditing={isEditing}
          label="국적"
          Id="nationality"
          inputValue={userProfile.nationality}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
