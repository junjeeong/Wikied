import { postProfile } from "@/api/profile";
import { patchUser } from "@/api/user";
import { useForm, SubmitHandler } from "react-hook-form";

interface ChangePasswordForm {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

interface WikiForm {
  securityQuestion: string;
  securityAnswer: string;
}

const MyPage = () => {
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    getValues: changePasswordValue,
  } = useForm<ChangePasswordForm>();

  const {
    register: registerWiki,
    handleSubmit: handleWikiSubmit,
    formState: { errors: wikiErrors },
    getValues: registWikiValue,
  } = useForm<WikiForm>();

  const onChangePasswordSubmit: SubmitHandler<ChangePasswordForm> = async (
    data
  ) => {
    const res = await patchUser(data);
    console.log("비밀번호 변경 결과:", res);
  };

  const onSubmitWiki: SubmitHandler<WikiForm> = async (data) => {
    // 위키 생성 로직 구현해야 함.
    const res = await postProfile(data);
    console.log("새로 생성된 프로필:", res);
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
        <div className="flex flex-col gap-2 mt-[8px]">
          <input
            className="mypage-input"
            type="password"
            placeholder="기존 비밀번호"
            {...registerPassword("currentPassword", {
              required: "기존 비밀번호는 필수입니다.",
            })}
          />
          {passwordErrors.currentPassword && (
            <span className="errormessage">
              {passwordErrors.currentPassword.message}
            </span>
          )}

          <input
            className="mypage-input"
            type="password"
            placeholder="새 비밀번호"
            {...registerPassword("password", {
              required: "새 비밀번호는 필수입니다.",
            })}
          />
          {passwordErrors.password && (
            <span className="errormessage">
              {passwordErrors.password.message}
            </span>
          )}

          <input
            className="mypage-input placeholder: text-gray-400"
            type="password"
            placeholder="새 비밀번호 확인"
            {...registerPassword("passwordConfirmation", {
              required: "비밀번호 확인은 필수입니다.",
              validate: (value) => {
                if (value !== changePasswordValue("password")) {
                  return "비밀번호가 일치하지 않습니다.";
                }
              },
            })}
          />
          {passwordErrors.passwordConfirmation && (
            <span className="errormessage">
              {passwordErrors.passwordConfirmation.message}
            </span>
          )}
        </div>
        <button className="mypage-button hover: bg-green100">변경하기</button>
      </form>

      <div className="divider mt-[32px]"></div>

      {/* 위키 생성 폼 */}
      <form
        className="w-full mt-[32px] flex flex-col"
        onSubmit={handleWikiSubmit(onSubmitWiki)}
      >
        <label className="text-md text-gray-500" htmlFor="wikiRegister">
          위키 생성하기
        </label>
        <div className="flex flex-col gap-2 mt-[8px]">
          <input
            className="mypage-input placeholder: text-gray-400"
            type="text"
            placeholder="질문을 입력해 주세요"
            {...registerWiki("securityQuestion", {
              required: "질문은 필수입니다.",
            })}
          />
          {wikiErrors.securityQuestion && (
            <span className="errormessage">
              {wikiErrors.securityQuestion.message}
            </span>
          )}

          <input
            className="mypage-input placeholder: text-gray-400"
            type="text"
            placeholder="답을 입력해 주세요"
            {...registerWiki("securityAnswer", {
              required: "답은 필수입니다.",
            })}
          />
          {wikiErrors.securityAnswer && (
            <span className="errormessage">
              {wikiErrors.securityAnswer.message}
            </span>
          )}
        </div>

        <button className="mypage-button hover: bg-green100">생성하기</button>
      </form>
    </div>
  );
};

export default MyPage;
