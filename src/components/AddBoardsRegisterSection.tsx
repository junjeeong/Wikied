import useViewport from "@/hooks/useViewport";
import FilledButton from "./ui/Button/FilledButton";
import formatCurrentDate from "@/utils/formatCurrentDate";

interface AddBonSubmitoardsRegisterSectionProps {
  onSubmit: () => void;
  onUpdateArticle: () => void;
  isButtonDisabled: boolean;
  articleId: number;
}

const AddBoardsRegisterSection = ({
  onSubmit,
  onUpdateArticle,
  isButtonDisabled,
  articleId,
}: AddBonSubmitoardsRegisterSectionProps) => {
  const { isMobile } = useViewport();

  const buttonSize = isMobile ? "small" : "medium";

  return (
    <div className="flex flex-col gap-6 mb-[33px]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold Tablet:text-xl Mobile:text-lg">
          {articleId ? "게시물 수정하기" : "게시물 등록하기"}
        </h2>

        {articleId ? (
          <FilledButton
            type="button"
            onClick={onUpdateArticle}
            disabled={isButtonDisabled}
            size={buttonSize}
          >
            수정하기
          </FilledButton>
        ) : (
          <FilledButton
            type="button"
            onClick={onSubmit}
            disabled={isButtonDisabled}
            size={buttonSize}
          >
            등록하기
          </FilledButton>
        )}
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
