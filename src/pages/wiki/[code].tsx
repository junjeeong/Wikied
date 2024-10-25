import { getProfile } from "@/api/profile";
import ProfileCard from "@/components/ProfileCard";
import FilledButton from "@/components/ui/Button/FilledButton";
import useAuthStore from "@/store/AuthStore";
import { FormProvider, useForm } from "react-hook-form";

const WikiPage = () => {
  const methods = useForm();

  const onSubmit = (data: any) => {
    console.log("Form data: ", data);
  };

  const { user } = useAuthStore();
  // const code = user.profile.code;
  const code = "ed5652ad-9d61-4c26-9d85-617044b06534";
  // 프로필 조회 getProfile로 유저 프로필 데이터 가져오기

  // const userProfile = getProfile(code);
  const userProfile = {
    id: 472,
    code: "ed5652ad-9d61-4c26-9d85-617044b06534",
    image:
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/1512/1729820442316/userProfileImg.jpg",
    city: "서울",
    mbti: "INTP",
    job: "은행원",
    sns: "cat_official",
    birthday: "3월 7일",
    nickname: "없음",
    bloodType: "A",
    family: "부모님",
    nationality: "한국",
    content: "내용 없음",
    teamId: "9-3",
    securityQuestion: "좋아하는 동물은?",
    updatedAt: "2024-10-25T01:44:23.627Z",
    name: "연습용",
  };

  return (
    <div className="flex flex-col items-center p-5">
      <p>위키 {code} 페이지</p>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ProfileCard userProfile={userProfile} />
          <FilledButton type="submit">제출</FilledButton>
        </form>
      </FormProvider>
    </div>
  );
};

export default WikiPage;
