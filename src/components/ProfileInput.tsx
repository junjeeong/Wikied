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

  return (
    <div className={`${isEditing ? "" : "gap-5"} flex`}>
      <label
        htmlFor={Id}
        className={`${
          isEditing ? "w-20 h-[45px]" : "w-[60px] h-6"
        } content-center text-gray-400`}
      >
        {label}
      </label>
      {isMe && isEditing ? (
        <input
          className="w-60 h-[45px] rounded-[10px] px-5 py-[10.5px] bg-gray-100"
          id={Id}
          type="text"
          placeholder="정보를 입력해 주세요"
          {...register(Id)}
        />
      ) : (
        <p className="w-[180px] h-6 overflow-hidden whitespace-pre text-ellipsis">
          {inputValue}
        </p>
      )}
    </div>
  );
};

export default ProfileInput;
