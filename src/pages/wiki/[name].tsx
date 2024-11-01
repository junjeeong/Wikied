import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useAuthStore from "@/store/AuthStore";
import { UserProfile } from "@/types/types";
import { getProfilePing, getProfiles, getUserProfile } from "@/api/profile";
import ProfileCard from "@/components/ProfileCard";
import FilledButton from "@/components/ui/Button/FilledButton";
import WikiProfileTitle from "@/components/WikiProfileTitle";
import TextEditor from "@/components/TextEditor";
import useViewport from "@/hooks/useViewport";
import useNotify from "@/hooks/useNotify";
import InfoIcon from "/public/icons/ic_info.svg";
import QuizModalContainer from "@/containers/QuizModalContainer";
import WikiContent from "@/components/WikiContent";
import OutlineButton from "@/components/ui/Button/OutlineButton";

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
  const { isMobile } = useViewport();
  const notify = useNotify();
  const [registeredAt, setRegisteredAt] = useState("");
  const [editStatus, setEditStatus] = useState("idle");
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const myCode = user?.profile?.code;
  const isMe = isLoggedIn && myCode === userProfile.code;

  const closeQuizModal = () => {
    setQuizModalOpen(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleEdit = async () => {
    // 해당 위키 페이지가 수정 중인지 확인
    const getPingData = await getProfilePing(code);
    // status = 200 -> 누군가 편집 중
    if (getPingData?.status === 200) {
      // 누군가 수정중이라고 토스트와 함께 해당시간동안 위키참여하기 버튼 비활성화.
      setEditStatus("buttonDisabled");
      notify(
        "다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.",
        "error"
      );
      setTimeout(() => {
        setEditStatus("textVisible");
      }, 2000);
      setTimeout(() => {
        setEditStatus("idle");
      }, 5 * 60 * 1000); // 시간 계산 정확히 안한 상태
    }
    // status = 204 -> 편집 가능한 상태
    else {
      // 퀴즈 모달 띄우고 registeredAt을 리턴받는다.
      setQuizModalOpen(true);
      // 이후 5분(4분30초?) 간격으로 퀴즈 모달 계속 띄우면서 갱신
      setIsEditing(true);
    }
    // console.log(getPingData);
    // console.log(getPingData?.data);
    // console.log(getPingData?.data.registeredAt);
    // console.log(getPingData?.status);
    // getProfilePing(code);

    // postProfilePing(code);
  };

  const onSubmit = (data: any) => {
    // PATCH profile/{code} 로 유저 프로필 정보 수정
    console.log(data);
    setUserProfile(data);
    console.log(userProfile);
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
                size={`${isMobile ? "small" : "medium"}`}
                disabled={editStatus === "buttonDisabled"}
              >
                위키 참여하기
              </FilledButton>
            </div>

            {editStatus !== "idle" && (
              <div className="flex items-center gap-[15px] mt-4 px-[20px] py-[15px] text-gray-400">
                <InfoIcon className="w-5 h-5" />
                <p>앞 사람의 편집이 끝나면 위키참여가 가능합니다.</p>
              </div>
            )}
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
          <div className="mt-[41px] Tablet:mt-[45px] Mobile:mt-7 min-h-[500px]">
            {isEditing ? (
              <TextEditor />
            ) : (
              <WikiContent content={userProfile.content} />
            )}
          </div>
        </div>

        <div className="absolute bottom-[50px] right-[50px]">
          {isEditing && (
            <>
              <OutlineButton type="button" onClick={handleCancel}>
                취소
              </OutlineButton>
              <FilledButton type="submit">제출</FilledButton>
            </>
          )}
        </div>
      </form>
      <QuizModalContainer isOpen={quizModalOpen} onClose={closeQuizModal} />
    </FormProvider>
  );
};

export default WikiPage;
