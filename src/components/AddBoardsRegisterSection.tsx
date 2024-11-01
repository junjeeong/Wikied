import FilledButton from "./ui/Button/FilledButton";
import formatCurrentDate from "@/utils/formatCurrentDate";


interface AddBonSubmitoardsRegisterSectionProps {
  onSubmit: () => void;
  isButtonDisabled: boolean;
}

const AddBoardsRegisterSection = ({
  onSubmit,
  isButtonDisabled,
}: AddBonSubmitoardsRegisterSectionProps) => {
  return (
    <div className="flex flex-col gap-6 mb-[33px]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold Tablet:text-xl Mobile:text-lg">
          게시물 등록하기
        </h2>
        <FilledButton
          type="button"
          onClick={onSubmit}
          disabled={isButtonDisabled}
        >
          등록하기
        </FilledButton>
      </div>
      <div>
        <span className="text-lg text-gray-400 Mobile:text-xs">
          등록일 : {formatCurrentDate()}
        </span>
      </div>
    </div>
  );
};

export default AddBoardsRegisterSection;