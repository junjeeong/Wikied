import { GetServerSidePropsContext } from "next";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useAuthStore from "@/store/AuthStore";
import { PatchBody, UserProfile } from "@/types/types";
import {
  getProfilePing,
  getProfiles,
  getProfilesByName,
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // URL 경로에서 'name' 파라미터 추출
  const { name } = context.params!;
  let res;
  if (typeof name !== "string") {
    return { notFound: true };
  }

  // 'name'으로 'code'가 포함된 해당 유저의 프로필 데이터를 가져옴
  res = await getProfilesByName({ name });

  const currentCode = res.data.list[0].code;

  // 가져온 'code'로 유저의 상세 프로필 데이터를 가져옴 (SSR)
  res = await getUserProfile(currentCode);
  if (res.ok)
    return {
      props: {
        initialProfile: res.data,
        code: currentCode,
      },
    };
  else {
    if (res.data.status === 404) return { notFound: true };
    else
      return {
        redirect: {
          destination: "/500",
        },
      };
  }
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
    await postProfilePing({ securityAnswer: quizAnswer }, code);
    const data = getUpdatedPatchBody();
    const res = await patchProfile({ code, body: data });
    setUserProfile({ userProfile, ...res });
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
    const userProfile = await getUserProfile(code);
    setUserProfile(userProfile?.data);
    // 해당 위키 페이지가 수정 중인지 확인
    const getPingData = await getProfilePing(code);

    // status = 200 -> 누군가 편집 중
    if (getPingData.data.status === 200) {
      const updatedTime = new Date(userProfile.data.updatedAt);
      const registeredTime = new Date(getPingData.data.registeredAt);

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

    const res = await patchProfile({ code, body: editedUserProfile });

    setUserProfile(res.data);
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
        className="relative flex justify-center mb-[40px] w-full h-full"
      >
        <div
          className={`${
            isEditing ? "pr-[520px] w-[1640px]" : "pr-[400px] w-[1260px]"
          } relative flex flex-col gap-[15px] Mobile:gap-3 Tablet:px-[60px] Mobile:px-5 PC:mx-10`}
        >
          {/* Profile title */}
          {/* 편집 상태에서는 렌더링 제외 */}
          {!isEditing && (
            <div className="relative mt-[78px] Mobile:mt-10 Tablet:mt-[60px]">
              <WikiProfileTitle name={userProfile.name} />
              <div className="top-0 right-0 absolute">
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
          {/* <div className="PC:top-[38px] PC:right-0 PC:absolute Mobile:mt-[70px] Tablet:mt-[107px]"> */}
          <div className="PC:top-[38px] PC:right-0 PC:absolute Mobile:mt-[70px] Tablet:mt-[107px]">
            <ProfileCard
              userProfile={userProfile}
              isMe={isMe}
              isEditing={isEditing}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            />

            {/* 편집 상태일 때 취소 / 제출 버튼 렌더링 */}
            {isEditing && (
              <div className="Mobile:top-[10px] Tablet:top-[35px] Mobile:right-[20px] Tablet:right-[60px] absolute PC:relative flex justify-end gap-[10px] PC:mt-[33px]">
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
            <div className="mt-[40px] Mobile:mt-[15px] Tablet:mt-[10px]">
              <TextEditor contentData={userProfile.content} />
            </div>
          )}
          {!isEditing && (
            <div className="mt-[41px] Mobile:mt-7 Tablet:mt-[45px] min-h-[500px] ql-editor">
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
