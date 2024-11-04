import { UseFormRegister, FieldErrors } from "react-hook-form";
import FilledButton from "../Button/FilledButton";

interface ChangePasswordType {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

interface UserSettingsProps {
  onSubmitPasswordChange: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  passwordErrors: FieldErrors<ChangePasswordType>;
  registerPassword: UseFormRegister<ChangePasswordType>;
  getValues: (name?: keyof ChangePasswordType) => any;
}

const UserSettings = ({
  onSubmitPasswordChange,
  passwordErrors,
  registerPassword,
  getValues,
}: UserSettingsProps) => {
  return (
    <div className="flex flex-col justify-center min-h-screen -mt-[80px] mx-auto w-[400px] Mobile:w-[335px]">
      <h1 className="text-2xl font-semibold text-gray-500">계정 설정</h1>
      <form
        className="w-full mt-[40px] flex flex-col"
        onSubmit={onSubmitPasswordChange}
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
            className="mypage-input placeholder:text-gray-400"
            type="password"
            placeholder="새 비밀번호 확인"
            {...registerPassword("passwordConfirmation", {
              required: "비밀번호 확인은 필수입니다.",
              validate: (value) => {
                if (value !== getValues("password")) {
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
        <div className="ml-auto mt-[20px]">
          <FilledButton size="small">변경하기</FilledButton>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
