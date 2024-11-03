interface AddBordsTitleProps {
  title: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddBordsTitle = ({ title, onChange }: AddBordsTitleProps) => {
  return (
    <div className="flex justify-between items-center py-3 border-y">
      <input
        type="text"
        value={title}
        onChange={onChange}
        placeholder="제목을 입력해주세요"
        className="w-full outline-none text-lg bg-transparent text-gray-500 placeholder-gray-400 Mobile:placeholder:text-lg"
      />
      <span className="text-sm text-gray-400 Mobile:text-[13px] Mobile:leading-[22px]">
        {title.length}/
        <span className="text-green-200 Mobile:text-[13px] Mobile:leading-[22px]">
          30
        </span>
      </span>
    </div>
  );
};

export default AddBordsTitle;