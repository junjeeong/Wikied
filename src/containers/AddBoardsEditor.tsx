import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "@/components/CustomToolbar";
import { useState, useRef, useMemo,useEffect } from "react";
import { stripHTML, calculateCharCount } from "@/utils/calculatedCharCount";
import { postArticle } from "@/api/article";
import ImageAddModalContainer from "./ImageAddModalContainer";
import ReactQuill, { ReactQuillProps } from "react-quill";
import CountSpace from "@/components/AddBoardsCountSpace";
import AddBordsTitle from "@/components/AddBoardsTitle";
import AddBoardsRegisterSection from "@/components/AddBoardsRegisterSection";
import { useRouter } from "next/router";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import OutlineButton from "@/components/ui/Button/OutlineButton";

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

// dynamic import로 'react-quill'을 클라이언트 사이드에서만 로드
// Document 객체에 접근해야 하기 때문에
const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import("react-quill");
    QuillComponent.Quill.register("modules/imageActions", ImageActions);
    QuillComponent.Quill.register("modules/imageFormats", ImageFormats);
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <QuillComponent ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { ssr: false }
);

interface AddBoardsEditorProps {
  addPage?: boolean;
}

const AddBoardsEditor = ({ addPage = true }: AddBoardsEditorProps) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [charCountWithSpaces, setCharCountWithSpaces] = useState<number>(0);
  const [charCountWithoutSpaces, setCharCountWithoutSpaces] =
    useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const quillRef = useRef<ReactQuill | null>(null); // ReactQuill ref 타입 지정
  const router = useRouter();

  const modules = useMemo(
    () => ({
      imageActions: {}, 
      imageFormats: {}, 
      toolbar: {
        container: "#toolbar",
        handlers: {
          image: () => setIsOpen(true), // 커스텀 이미지 핸들러 설정
        },
        ImageResize: {
          modules: ["Resize"],
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
    "clean",
    "float",
    "height",
    "width",
  ];

  const isButtonDisabled =
    title.trim() === "" || stripHTML(content).trim() === "";

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 30) {
      setTitle(newTitle);
    }
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    const plainText = stripHTML(value);
    //공백 있는/없는 문자열세기
    const { withSpaces, withoutSpaces } = calculateCharCount(plainText);
    setCharCountWithSpaces(withSpaces);
    setCharCountWithoutSpaces(withoutSpaces);
  };

  //이미지 url 추출(src)
  const extractImageUrl = (contentHtml: string): string | null => {
    const doc = new DOMParser().parseFromString(contentHtml, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.getAttribute("src") : null;
  };

  const defaultUrl =
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wikied/user/1429/1730515529281/empty_png"; //이미지 첨부 안 할때 첨부 할 빈 이미지

  const onSubmit = async () => {
    const imageUrl = extractImageUrl(content);

    await postArticle({
      image: imageUrl || defaultUrl,
      content: content,
      title: title,
    });
    router.push("/boards");
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const handleClick = () => {
    router.push("/boards");
  };

  const onImageUpload = (url: string) => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection(); // 현재 커서 위치 가져오기
      // range 값이 없으면 문서 끝에 이미지를 추가
      const insertIndex = range ? range.index : editor.getLength();

      editor.insertEmbed(insertIndex, "image", url); // 이미지 삽입
      // 이미지가 추가된 위치가 뷰포트에 들어오도록 스크롤

      if (range) {
        editor.setSelection(range.index + 2, 0); // 커서를 이미지 다음 위치로 이동
      }
      const imgElement = editor.root.querySelector(`img[src="${url}"]`); 
      if (imgElement) {
        imgElement.setAttribute("width", "400px"); //이미지가 에디터 안으로 들어오도록 크기 지정
        imgElement.setAttribute("height", "auto");
      }

      quillRef.current.focus(); // 에디터에 포커스
    }
    setIsOpen(false);
  };


  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-screen bg-background pb-8 Tablet:px-[60px] Mobile:px-5">
      <div className="w-full max-w-[1060px] min-h-[846px] px-[30px] pt-[46px] pb-[40px] shadow-[0_4px_20px_#00000014]">
        <AddBoardsRegisterSection
          onSubmit={onSubmit}
          isButtonDisabled={isButtonDisabled}
        />
        <AddBordsTitle title={title} onChange={handleTitleChange} />
        <CountSpace
          charCountWithSpaces={charCountWithSpaces}
          charCountWithoutSpaces={charCountWithoutSpaces}
        />
        <QuillNoSSRWrapper
          forwardedRef={quillRef}
          value={content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          theme="snow"
          placeholder="본문을 입력해주세요"
        />
        <CustomToolbar />
        <ImageAddModalContainer
          isOpen={isOpen}
          onClose={onClose}
          onImageUpload={onImageUpload}
        />
      </div>
      {addPage && <OutlineButton onClick={handleClick}>목록으로</OutlineButton>}
    </div>
  );
};

export default AddBoardsEditor;
