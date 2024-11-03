interface AddBoardsCountSpaceProps {
  charCountWithSpaces: number;
  charCountWithoutSpaces: number;
}

const AddBoardsCountSpace = ({
  charCountWithSpaces,
  charCountWithoutSpaces,
}: AddBoardsCountSpaceProps) => {
  return (
    <div className="mt-5 Mobile:mt-4">
      <span className="text-lg text-gray-600 font-medium Mobile:text-md">
        공백포함: 총 {charCountWithSpaces}자 | 공백제외: 총{" "}
        {charCountWithoutSpaces}자
      </span>
    </div>
  );
};

export default AddBoardsCountSpace;
