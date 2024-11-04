import { GetServerSideProps } from "next";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useAuthStore from "@/store/AuthStore";
import { PatchBody, UserProfile } from "@/types/types";
import {
  getProfilePing,
  getProfiles,
  getUserProfile,
  patchProfile,
  postProfilePing,
} from "@/api/profile";
import ProfileCard from "@/components/ProfileCard";
import FilledButton from "@/components/ui/Button/FilledButton";
import WikiProfileTitle from "@/components/WikiProfileTitle";
import useViewport from "@/hooks/useViewport";
import useNotify from "@/hooks/useNotify";
import InfoIcon from "/public/icons/ic_info.svg";
import QuizModalContainer from "@/containers/QuizModalContainer";
import WikiContent from "@/components/WikiContent";
import OutlineButton from "@/components/ui/Button/OutlineButton";
import ConnectLostModal from "@/components/ConnectLostModal";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/LoadingSpinner";

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
  const [userProfile, setUserProfile] = useState<UserProfile>(initialProfile); // 현재 위키의 유저 프로필 정보
  const { user, isLoggedIn } = useAuthStore(); // 로그인 유무 및 내 위키 확인에 필요한 정보
  const { isMobile } = useViewport();
  const methods = useForm(); // 자식 컴포넌트에서 사용할 폼 메서드와 상태를 생성
  const { reset } = methods;
  const notify = useNotify();

  const [isEditing, setIsEditing] = useState<boolean>(false); // 사용자의 위키 편집 유무
  const [quizModalOpen, setQuizModalOpen] = useState<boolean>(false); // 퀴즈 모달 상태 관리
  const [editStatus, setEditStatus] = useState<string>("idle"); // 위키 편집 가능 여부
  const [registeredAt, setRegisteredAt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(userProfile.image);
  const [disconnectModalOpen, setDisconnectModalOpen] =
    useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState("");

  const TextEditor = dynamic(() => import("../../components/TextEditor"), {
    ssr: false,
    loading: LoadingSpinner,
  });

  const myCode = user?.profile?.code;
  const isMe = isLoggedIn && myCode === userProfile.code;

  function getUpdatedPatchBody() {
    const data: PatchBody = {
      securityAnswer: quizAnswer,
      securityQuestion: userProfile.securityQuestion,
      nationality: userProfile.nationality,
      family: userProfile.family,
      bloodType: userProfile.bloodType,
      nickname: userProfile.nickname,
      birthday: userProfile.birthday,
      sns: userProfile.sns,
      job: userProfile.job,
      mbti: userProfile.mbti,
      city: userProfile.city,
      image: userProfile.image,
      content: userProfile.content,
    };
    return data;
  }

  // 편집 상태에서 취소 버튼을 누르면
  const handleCancel = async () => {
    const pingdata = await postProfilePing(
      { securityAnswer: quizAnswer },
      code
    );
    console.log("pingdata: ", pingdata);
    const data = getUpdatedPatchBody();
    console.log("data: ", data);
    const res = await patchProfile({ code, body: data });
    console.log("res: ", res);
    setUserProfile({ userProfile, ...res });
    console.log("update : ", new Date(res.updatedAt));
    setIsEditing(false);
    reset();
  };

  // 퀴즈 모달에서 정답을 맞추면
  const handleQuizSuccess = (quizAnswer: string, registeredAt: string) => {
    setQuizAnswer(quizAnswer);
    setRegisteredAt(registeredAt);
    setIsEditing(true);
  };

  const closeQuizModal = () => {
    setQuizModalOpen(false);
  };

  // 위키 참여하기 버튼을 누르면
  const handleEdit = async () => {
    const res = await getUserProfile(code);
    setUserProfile(res?.data);
    // 해당 위키 페이지가 수정 중인지 확인
    const getPingData = await getProfilePing(code);
    console.log("getPingData: ", getPingData?.status);
    // status = 200 -> 누군가 편집 중
    if (getPingData?.status === 200) {
      const updatedTime = new Date(userProfile.updatedAt);
      const registeredTime = new Date(getPingData.data.registeredAt);
      console.log("updatedTime: ", updatedTime);
      console.log("registeredTime: ", registeredTime);
      if (updatedTime > registeredTime) {
        setQuizModalOpen(true);
      } else {
        // 누군가 수정중이라고 토스트와 함께 해당시간동안 위키참여하기 버튼 비활성화.
        setRegisteredAt(getPingData.data.registeredAt);
        setEditStatus("buttonDisabled");
        notify(
          "다른 친구가 편집하고 있어요. 나중에 다시 시도해 주세요.",
          "error"
        );
        setTimeout(() => {
          setEditStatus("textVisible");
        }, 3000);
      }
    }
    // status = 204 -> 편집 가능한 상태
    else {
      // 퀴즈 모달을 띄운다
      setQuizModalOpen(true);
    }
  };

  // 수정 가능한 시간 계산
  useEffect(() => {
    if (registeredAt) {
      const registeredTime = new Date(registeredAt).getTime();
      const now = Date.now();
      const delay = 5 * 60 * 1000 - (now - registeredTime);

      const timer = setTimeout(() => {
        setEditStatus("idle");
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [registeredAt]);

  // 편집 시작 시 5분 타이머 시작
  useEffect(() => {
    if (isEditing) {
      const timer = setTimeout(() => {
        setDisconnectModalOpen(true);
      }, 5 * 60 * 1000);
      return () => clearTimeout(timer);
    }
  }, [isEditing]);

  useEffect(() => {
    setUserProfile(initialProfile);
  }, [initialProfile]);

  const onSubmit = async (data: any) => {
    // PATCH profile/{code} 로 유저 프로필 정보 수정
    const editedUserProfile = {
      ...data,
      family: "",
      securityQuestion: userProfile.securityQuestion,
      // 이후 퀴즈모달 PR 완료되면 모달에서 퀴즈답안 받아서 수정
      securityAnswer: quizAnswer,
      image: imageUrl,
    };

    const response = await patchProfile({ code, body: editedUserProfile });
    console.log(response);
    console.log("update : ", new Date(response.updatedAt));

    setUserProfile(response);
    setIsEditing(false);
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
        className="relative flex justify-center w-full h-full mb-20"
      >
        <div
          className={`${
            isEditing ? "pr-[520px] w-[1640px]" : "pr-[400px] w-[1260px]"
          } relative flex flex-col gap-[15px] Mobile:gap-3 Tablet:px-[60px] Mobile:px-5 PC:mx-10`}
        >
          {/* Profile title */}
          {/* 편집 상태에서는 렌더링 제외 */}
          {!isEditing && (
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
          )}

          {/* Profile  Card */}
          {/* <div className="PC:absolute PC:top-[38px] PC:right-0 Tablet:mt-[107px] Mobile:mt-[70px]"> */}
          <div className="PC:absolute PC:top-[38px] PC:right-0 Tablet:mt-[107px] Mobile:mt-[70px]">
            <ProfileCard
              userProfile={userProfile}
              isMe={isMe}
              isEditing={isEditing}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />

            {/* 편집 상태일 때 취소 / 제출 버튼 렌더링 */}
            {isEditing && (
              <div className="PC:relative absolute Tablet:top-[35px] Mobile:top-[10px] Mobile:right-[20px] Tablet:right-[60px] flex gap-[10px] justify-end PC:mt-[33px]">
                <OutlineButton
                  type="button"
                  size="small"
                  onClick={handleCancel}
                >
                  취소
                </OutlineButton>
                <FilledButton type="submit" size="small">
                  제출
                </FilledButton>
              </div>
            )}
          </div>

          {/* Profile Content */}
          {isEditing && (
            <div className="mt-[40px] Tablet:mt-[10px] Mobile:mt-[15px]">
              <TextEditor contentData={userProfile.content} />
            </div>
          )}
          {!isEditing && (
            <div className="ql-editor mt-[41px] Tablet:mt-[45px] Mobile:mt-7 min-h-[500px]">
              <WikiContent content={userProfile.content} onClick={handleEdit} />
            </div>
          )}
        </div>
      </form>

      <QuizModalContainer
        isOpen={quizModalOpen}
        onClose={closeQuizModal}
        code={code}
        onSubmitSuccess={handleQuizSuccess}
      />
      <ConnectLostModal
        isOpen={disconnectModalOpen}
        onClose={() => setDisconnectModalOpen(false)}
        handleCancel={handleCancel}
      />
    </FormProvider>
  );
};

export default WikiPage;
