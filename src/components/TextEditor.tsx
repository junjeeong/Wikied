import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import ReactModule from "./ReactModule";
import { useFormContext } from "react-hook-form";
import LoadingSpinner from "./LoadingSpinner";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const TextEditor: React.FC = () => {
  const { setValue } = useFormContext();

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
    setValue("context", value);
  };

  const modules: {} = useMemo(
    () => ({
      toolbar: {
        container: "#toolBar",
        // handlers: {
        //   bold: handleBold,
        // },
      },
    }),
    []
  );

  return (
    <div id="Quill">
      <div
        id="toolBar"
        className="flex justify-center rounded-[10px] bg-gray-100 mb-[60px] Tablet:mb-10 Mobile:mb-[15px]"
      >
        <ReactModule />
      </div>

      <ReactQuill
        onChange={handleChange}
        formats={formats}
        modules={modules}
        className="min-h-[800px]"
        placeholder="내용을 입력해주세요."
      />
    </div>
  );
};

export default TextEditor;
