import { useCallback, useEffect, useMemo, useRef } from "react";
import { postImage } from "@/api/image";
import { useFormContext } from "react-hook-form";
import ReactQuill from "react-quill";
import ReactModule from "./ReactModule";

interface TextEditorProps {
  contentData: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ contentData }) => {
  const { setValue } = useFormContext();
  const quillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const editorContainer = editor.root; // root 속성에 접근
      editorContainer.classList.add("prose"); // prose 클래스 추가
      editorContainer.classList.add("max-w-none");
    }
  }, []);

  const formats: string[] = [
    "bold",
    "italic",
    "underline",
    "header",
    "list",
    "align",
    "image",
    "video",
    "link",
    "color",
    "background",
    "code-block",
    "blockquote",
  ];

  const handleChange = (value: string) => {
    setValue("content", value);
  };

  const convertFileName = (fileName: string) => {
    return fileName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files ? input.files[0] : null;

      if (!file) {
        return;
      }

      const maxSizeInMB = 5;
      if (file.size / 1024 / 1024 > maxSizeInMB) {
        alert("파일 크기가 너무 큽니다. 5MB 이하의 파일을 선택해주세요!");
        return;
      }

      const newFileName = convertFileName(file.name);
      const newFile = new File([file], newFileName, { type: file.type });
      const formData = new FormData();
      formData.append("image", newFile); // 이미지 파일을 FormData에 추가

      try {
        // postImage 함수 호출 및 반환된 URL을 상태에 저장
        const result = await postImage(formData);
        const imgUrl = result.url;

        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, "image", imgUrl);
            editor.setSelection({ index: range.index + 1, length: 0 });
          } else {
            editor.insertEmbed(0, "image", imgUrl);
            editor.setSelection({ index: 1, length: 0 });
          }
        }
      } catch (error) {
        console.log(error);
      }
    });
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: "#toolBar",
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [imageHandler]
  );

  return (
    <div id="Quill">
      <div
        id="toolBar"
        className="rounded-[10px] bg-gray-100 mb-[60px] Tablet:mb-10 Mobile:mb-[15px]"
      >
        <ReactModule />
      </div>

      <ReactQuill
        ref={quillRef}
        onChange={handleChange}
        formats={formats}
        modules={modules}
        className=""
        placeholder="내용을 입력해 주세요."
        defaultValue={contentData}
      />
    </div>
  );
};

export default TextEditor;
