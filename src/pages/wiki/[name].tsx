import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useAuthStore from "@/store/AuthStore";
import { UserProfile } from "@/types/types";
import { getProfiles, getUserProfile } from "@/api/profile";
import ProfileCard from "@/components/ProfileCard";
import FilledButton from "@/components/ui/Button/FilledButton";
import WikiProfileTitle from "@/components/WikiProfileTitle";

interface WikiPageProps {
  initialProfile: UserProfile;
  code: string;
}

export const getServerSideProps: GetServerSideProps<WikiPageProps> = async (
  context
) => {
  // URL 경로에서 'name' 파라미터 추출
  const { name } = context.params!;
  if (typeof name !== "string") {
    return { notFound: true };
  }

  // 'name'으로 'code'가 포함된 해당 유저의 프로필 데이터를 가져옴
  const [profileByName] = await getProfiles({ name });
  const currentCode = profileByName.code;

  // 가져온 'code'로 유저의 상세 프로필 데이터를 가져옴 (SSR)
  const res = await getUserProfile(currentCode);
  if (!res?.data) {
    return { notFound: true };
  }
  return {
    props: {
      initialProfile: res.data,
      code: currentCode,
    },
  };
};

const WikiPage = ({ initialProfile, code }: WikiPageProps) => {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { user, isLoggedIn } = useAuthStore();
  const methods = useForm();

  const myCode = user?.profile?.code;
  const isMe = isLoggedIn && myCode === userProfile.code;

  const handleEdit = () => {
    // 해당 위키 페이지가 수정 중인지 확인
    // getProfilePing(code);

    // postProfilePing(code);
    setIsEditing(!isEditing);
  };

  const onSubmit = (data: any) => {
    // PATCH profile/{code} 로 유저 프로필 정보 수정
  };

  const fetchUserProfile = useCallback(async () => {
    const updatedProfile = await getUserProfile(code);

    setUserProfile(updatedProfile?.data);
  }, []);

  useEffect(() => {
    if (!initialProfile) {
      fetchUserProfile();
    }
  }, [initialProfile, fetchUserProfile]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="relative flex justify-center w-full h-full my-20"
      >
        <div
          className={`${
            isEditing ? "pr-[520px] w-[1640px]" : "pr-[400px] w-[1260px]"
          } relative flex flex-col gap-[15px] Mobile:gap-3 Tablet:px-[60px] Mobile:px-5 PC:mx-10`}
        >
          {/* Profile title : 편집중에는 이름 + MD 에디터 */}
          <div className="relative mt-[78px] Tablet:mt-[60px] Mobile:mt-10">
            <WikiProfileTitle name={userProfile.name} />
            <div className="absolute top-0 right-0">
              <FilledButton
                onClick={handleEdit}
                editing={isEditing}
                type="button"
                // size="small"  // 모바일에서만 small ※padding값이..?
              >
                위키 참여하기
              </FilledButton>
            </div>
          </div>

          {/* Profile  Card */}
          <div className="PC:absolute PC:top-[38px] PC:right-0">
            <ProfileCard
              userProfile={userProfile}
              isMe={isMe}
              isEditing={isEditing}
            />
          </div>

          {/* Profile Content */}
          <div className="h-[1000px] mt-[41px] Tablet:mt-[45px] Mobile:mt-7 border border-red-500"></div>
        </div>

        <div className="absolute bottom-[50px] right-[50px]">
          {isEditing && <FilledButton type="submit">제출</FilledButton>}
        </div>
      </form>
    </FormProvider>
  );
};

export default WikiPage;
