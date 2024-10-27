import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useAuthStore from "@/store/AuthStore";
import { UserProfile } from "@/types/types";
import { getUserProfile } from "@/api/profile";
import ProfileCard from "@/components/ProfileCard";
import FilledButton from "@/components/ui/Button/FilledButton";

interface WikiPageProps {
  initialProfile: UserProfile;
  code: string;
}

export const getServerSideProps: GetServerSideProps<WikiPageProps> = async (
  context
) => {
  const { code } = context.params!;

  if (typeof code !== "string") {
    return { notFound: true };
  }

  const res = await getUserProfile(code);

  if (!res?.data) {
    return { notFound: true };
  }
  return {
    props: {
      initialProfile: res.data,
      code,
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

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = (data: any) => {
    // PATCH profile/{code} 로 유저 프로필 정보 수정
    console.log("Form data: ", data);
  };

  const fetchUserProfile = useCallback(async () => {
    const updatedProfile = await getUserProfile(code);

    setUserProfile(updatedProfile?.data);
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="relative w-full h-full"
      >
        <div className="">
          <ProfileCard
            userProfile={userProfile}
            isMe={isMe}
            isEditing={isEditing}
          />
          <FilledButton onClick={toggleEdit} editing={isEditing}>
            위키 참여하기
          </FilledButton>
        </div>

        <div className="absolute bottom-[50px] right-[50px]">
          <FilledButton type="submit">제출</FilledButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default WikiPage;
