import FilledButton from "../Button/FilledButton";

const ImageAddModal = () => {
  return (
    <>
      <div className="flex flex-col items-center gap-5 pt-[30px] mb-5">
        <span className="text-2lg text-gray-500 font-semibold">이미지</span>
        <label htmlFor="image" className="flex rounded-[10px] bg-gray-100 w-[354px] h-[160px] Mobile:w-[338px] Mobile:h-[278px]"></label>
        <input id="image" type="file" className="hidden"></input>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="rounded-[10px] bg-gray-300 text-background text-md font-semibold px-5 py-[8px]">삽입하기</button>
      </div>
    </> 
  );
};

export default ImageAddModal;
