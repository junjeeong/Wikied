import { useFormContext } from "react-hook-form";

interface InputProps {
  isMe: boolean;
  isEditing: boolean;
  label: string;
  Id: string;
  inputValue: string;
}

const ProfileInput = ({
  isMe,
  isEditing,
  label,
  Id,
  inputValue,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // input 필드에서 엔터키를 사용했을 때 폼이 제출되는 것을 방지
  const handlekeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div
      className={`${
        isMe && isEditing
          ? "Tablet:gap-4 Tablet:mr-[23px] Mobile:gap-[7px]"
          : "PC:gap-5 gap-[10px]"
      } flex`}
    >
      <label
        htmlFor={Id}
        className={`${
          isMe && isEditing
            ? "PC:w-20 h-[45px] w-[60px] Mobile:h-[34px]"
            : "w-[60px] h-6 Mobile:w-[55px] Mobile:h-[18px]"
        } content-center text-gray-400`}
      >
        {label}
      </label>
      {isMe && isEditing ? (
        <input
          className="PC:w-60 h-[45px] rounded-[10px] px-5 py-[10.5px] bg-gray-100 focus:outline-none focus:bg-gray-200 w-[200px] Mobile:h-[34px] Mobile:px-4 Mobile:py-2"
          id={Id}
          type="text"
          placeholder="정보를 입력해 주세요"
          {...register(Id)}
          onKeyDown={handlekeyDown}
          autoComplete="off"
        />
      ) : (
        <p className="w-[180px] h-6 overflow-hidden whitespace-pre text-ellipsis Tablet:w-[383px] Mobile:w-[148px] Mobile:h-[18px]">
          {inputValue}
        </p>
      )}
    </div>
  );
};

export default ProfileInput;
