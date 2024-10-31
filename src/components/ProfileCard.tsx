import { useState } from "react";
import Image from "next/image";
import ProfileInput from "./ProfileInput";
import ProfileImg from "/public/icons/ic_profile.svg";
import CameraImg from "/public/icons/ic_camera.svg";
import ArrowBottom from "/public/icons/ic_arrow_bottom2.svg";
import { postImage } from "@/api/image";
import { UserProfile } from "@/types/types";

interface ProfileCardProps {
  userProfile: UserProfile;
  isMe: boolean;
  isEditing: boolean;
}

const ProfileCard = ({ userProfile, isMe, isEditing }: ProfileCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // 클릭 시 유저 프로필의 영역이 확장됨
  const expandContent = () => {
    setIsExpanded(!isExpanded);
  };

  const convertFileName = (fileName: string) => {
    return fileName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  };

  // 프로필 이미지 파일 업로드
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const maxSizeInMB = 5;
      if (file.size / 1024 / 1024 > maxSizeInMB) {
        alert("파일 크기가 너무 큽니다. 5MB 이하의 파일을 선택해주세요!");
        return;
      }

      const newFileName = convertFileName(file.name);
      const newFile = new File([file], newFileName, { type: file.type });
      const formData = new FormData();
      formData.append("image", newFile); // 이미지 파일을 FormData에 추가
      try {
        // postImage 함수 호출 및 반환된 URL을 상태에 저장
        const result = await postImage(formData);
        if (result && result.url) {
          setImageUrl(result.url);
        }
      } catch (err) {
        console.error("이미지 업로드 중 에러 발생:", err);
      }
    }
  };

  return (
    <div
      className={`transition-all ease-in-out ${
        isMe && isEditing
          ? "w-[400px] h-[828px] p-10 gap-10 pb-9 Tablet:flex-col Tablet:h-[388px] Tablet:px-4 Tablet:pb-[37px] Tablet:gap-8 Mobile:flex-col Mobile:h-[511px] Mobile:pt-6 Mobile:px-[34px] Mobile:pb-[17px] Mobile:gap-6"
          : `PC:w-80 h-[671px] p-[30px] gap-[30px] Tablet:gap-10 Mobile:pt-[15px] Mobile:px-5 Mobile:pb-[41px] Mobile:gap-5 ${
              isExpanded
                ? "Tablet:h-[270px] Mobile:h-64"
                : "Tablet:h-[130px] Mobile:h-[126px]"
            }`
      } flex relative text-md rounded-[10px] shadow-[0_4px_20px_#00000014] w-full PC:flex-col  Tablet:pt-5 Mobile:text-xs  mx-auto`}
    >
      <div
        className={`${
          isMe && isEditing
            ? "m-5 self-center Mobile:m-0"
            : "m-[30px] Mobile:m-0"
        } relative PC:self-center w-[200px] h-[200px] Tablet:w-[71px] Tablet:h-[71px] Tablet:m-0 Mobile:w-[62px] Mobile:h-[62px]`}
      >
        {userProfile.image === null ? (
          <ProfileImg className="w-full h-full text-gray-400" />
        ) : (
          <Image
            src={imageUrl ?? userProfile.image}
            fill
            className="rounded-full"
            style={{ objectFit: "cover" }}
            alt="유저 프로필 이미지"
            priority
            sizes="(max-width: 767px) 62px, (max-width: 1199px) 71px, 200px"
          />
        )}
        {isMe && isEditing && (
          <>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="image"
              className="relative block w-full h-full transition-transform duration-300 transform cursor-pointer hover:scale-105"
            >
              <div className="absolute top-0 left-0 rounded-full w-full h-full bg-[#00000080]"></div>
              <CameraImg className="absolute w-9 h-9 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 right-0 text-gray-200 Tablet:w-5 Tablet:h-5 Mobile:w-[17px] Mobile:h-[17px] " />
            </label>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={expandContent}
        className="absolute left-1/2 -translate-x-1/2 bottom-[5px]"
      >
        <ArrowBottom
          className={`${isMe && isEditing ? "hidden" : ""} ${
            isExpanded ? "scale-y-[-1]" : ""
          } w-6 h-6 text-gray-300 PC:hidden`}
        />
      </button>

      <div
        className={`${
          isMe && isEditing
            ? "Tablet:h-[228px] Tablet:flex-wrap Mobile:flex-wrap"
            : "Tablet:gap-1 Mobile:gap-2"
        } ${
          isExpanded ? "" : "overflow-hidden"
        } flex flex-col content-between gap-4 w-full`}
      >
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
