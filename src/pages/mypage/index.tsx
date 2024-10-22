import { patchUser } from "@/api/user";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface WikiForm {
  wikiQuestion: string;
  wikiAnswer: string;
}

const MyPage = () => {
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    getValues,
    formState: { errors: passwordErrors },
  } = useForm<ChangePasswordForm>();

  const {
    register: registerWiki,
    handleSubmit: handleWikiSubmit,
    formState: { errors: wikiErrors },
  } = useForm<WikiForm>();

  // 단순히 배경색을 흰색으로 바꾸는 코드
  useEffect(() => {
    document.body.style.backgroundColor = "white";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  const onChangePasswordSubmit: SubmitHandler<ChangePasswordForm> = async (
    data
  ) => {
    const res = await patchUser(data);
    console.log("비밀번호 변경 결과:", res);
  };

  const onWikiSubmit: SubmitHandler<WikiForm> = (data) => {
    // 위키 생성 로직 구현해야 함.
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mx-auto w-[400px] Mobile:w-[335px]">
      <h1 className="text-2xl font-semibold text-gray-500">계정 설정</h1>

      {/* 비밀번호 변경 폼 */}
      <form
        className="w-full mt-16 flex flex-col"
        onSubmit={handlePasswordSubmit(onChangePasswordSubmit)}
      >
        <label className="text-md text-gray-500" htmlFor="changePassword">
          비밀번호 변경
        </label>
        <div className="flex flex-col gap-2">
          <input
            className="w-full h-[45px] py-5 px-4 mt-2 rounded-xl bg-gray-50 placeholder:text-gray-400 text-sm"
            type="password"
            placeholder="기존 비밀번호"
            {...registerPassword("currentPassword", {
              required: "기존 비밀번호는 필수입니다.",
            })}
          />
          {passwordErrors.currentPassword && (
            <span className="pl-2 text-red-500 text-sm">
              {passwordErrors.currentPassword.message}
            </span>
          )}

          <input
            className="w-full h-[45px] py-5 px-4 rounded-xl bg-gray-50 placeholder:text-gray-400 text-sm"
            type="password"
            placeholder="새 비밀번호"
            {...registerPassword("newPassword", {
              required: "새 비밀번호는 필수입니다.",
            })}
          />
          {passwordErrors.newPassword && (
            <span className="pl-2 text-red-500 text-sm">
              {passwordErrors.newPassword.message}
            </span>
          )}

          <input
            className="w-full h-[45px] py-5 px-4 rounded-xl bg-gray-50 placeholder:text-gray-400 text-sm"
            type="password"
            placeholder="새 비밀번호 확인"
            {...registerPassword("confirmPassword", {
              required: "비밀번호 확인은 필수입니다.",
              validate: (value) => {
                if (value !== getValues("newPassword")) {
                  return "비밀번호가 일치하지 않습니다.";
                }
              },
            })}
          />
          {passwordErrors.confirmPassword && (
            <span className="pl-2 text-red-500 text-sm">
              {passwordErrors.confirmPassword.message}
            </span>
          )}
        </div>
        <button className="mt-4 ml-auto px-[20px] py-[11px] text-sm font-bold text-gray50 bg-green200 rounded-[10px] hover:bg-green100">
          변경하기
        </button>
      </form>

      {/* divider 따로 ui컴포넌트로 구현해야 함. */}
      <div className="w-full border border-gray-50 mt-[32px]"></div>

      {/* 위키 생성 폼 */}
      <form
        className="w-full mt-[32px] flex flex-col"
        onSubmit={handleWikiSubmit(onWikiSubmit)}
      >
        <label className="text-md text-gray-500" htmlFor="wikiRegister">
          위키 생성하기
        </label>
        <input
          className="mt-2 w-full h-[45px] py-5 px-4 rounded-xl bg-gray-50 placeholder:text-gray-400 text-sm"
          type="text"
          placeholder="질문을 입력해 주세요"
          {...registerWiki("wikiQuestion", { required: "질문은 필수입니다." })}
        />
        {wikiErrors.wikiQuestion && (
          <span className="pl-2 text-red-500 text-sm">
            {wikiErrors.wikiQuestion.message}
          </span>
        )}

        <input
          className="mt-2 w-full h-[45px] py-5 px-4 rounded-xl bg-gray-50 placeholder:text-gray-400 text-sm"
          type="text"
          placeholder="답을 입력해 주세요"
          {...registerWiki("wikiAnswer", { required: "답은 필수입니다." })}
        />
        {wikiErrors.wikiAnswer && (
          <span className="pl-2 text-red-500 text-sm">
            {wikiErrors.wikiAnswer.message}
          </span>
        )}

        <button className="mt-4 ml-auto px-[20px] py-[11px] text-sm font-bold text-gray50 bg-green200 rounded-[10px] hover:bg-green100">
          생성하기
        </button>
      </form>
    </div>
  );
};

export default MyPage;
