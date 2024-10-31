import dynamic from "next/dynamic";
import { useMemo, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";
import FilledButton from "../components/ui/Button/FilledButton";
import { useState, useRef } from "react";
import formatCurrentDate from "@/utils/formatCurrentDate";
import { stripHTML, calculateCharCount } from "@/utils/calculatedCharCount";
import { postArticle } from "@/api/article";
import ImageAddModalContainer from "./ImageAddModalContainer";

// dynamic import로 'react-quill'을 클라이언트 사이드에서만 로드
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorProps {
  initialTitle?: string;
  initialContent?: string;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
}



const imageHandler = () => {

}

const Editor = ({
  initialTitle = "",
  initialContent = "",
  onTitleChange,
  onContentChange,
}: EditorProps) => {
  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: imageHandler, // 커스텀 이미지 핸들러 설정
        },
      },
    }),
    []
  );

  const formats = [
    "bold",
    "italic",
    "underline",
    "align",
    "list",
    "bullet",
    "color",
    "image",
  ];

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [charCountWithSpaces, setCharCountWithSpaces] = useState(0);
  const [charCountWithoutSpaces, setCharCountWithoutSpaces] = useState(0);

  const isButtonDisabled =
    title.trim() === "" || stripHTML(content).trim() === "";

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 30) {
      setTitle(newTitle);
      onTitleChange(newTitle);
    }
    setTitle(newTitle);
    onTitleChange(newTitle);
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    const plainText = stripHTML(value);

    const { withSpaces, withoutSpaces } = calculateCharCount(plainText);
    setCharCountWithSpaces(withSpaces);
    setCharCountWithoutSpaces(withoutSpaces);
    onContentChange(value);
  };

  const defaultUrl = "https://example.com/..."

  const onSubmit = async() => {
    const res = await postArticle({
      // image: image || defaultUrl,
      image: defaultUrl,
      content: content,
      title: title,
    });
    console.log(res)
  }

  return (
    <div className="w-full max-w-[1060px] min-h-[846px] px-[30px] pt-[46px] pb-[40px] shadow-[0_4px_20px_#00000014]">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold Tablet:text-xl Mobile:text-lg">
            게시물 등록하기
          </h2>
          <FilledButton type="button" onClick={onSubmit} disabled={isButtonDisabled}>등록하기</FilledButton>
        </div>
        <div>
          <span className="text-lg text-gray-400 Mobile:text-xs">
            등록일 : {formatCurrentDate()}
          </span>
        </div>
      </div>

      {/* {제목 입력란} */}
      <div className="mt-[33px] border-y py-3">
        <div className="flex justify-between items-center">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
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
      </div>

      <div className="mt-5 Mobile:mt-4">
        <span className="text-lg text-gray-600 font-medium Mobile:text-md">
          공백포함: 총 {charCountWithSpaces}자 | 공백제외: 총{" "}
          {charCountWithoutSpaces}자
        </span>
      </div>

      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        theme="snow"
        placeholder="본문을 입력해주세요"
      />
      <CustomToolbar />
      <ImageAddModalContainer onClose={} onImageUpload={}/>
    </div>
  );
};

export default Editor;
