import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import ReactModule from "./ReactModule";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/router";
import LoadingSpinner from "./LoadingSpinner";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const TextEditor: React.FC = () => {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const router = useRouter();
  const currentPath = router.pathname;
  const isBoardsPage = currentPath === "/boards";

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
        handlers: {
          // bold:
        },
      },
    }),
    []
  );

  return (
    <div className="ql-container">
      {!isBoardsPage && (
        <div id="toolBar" className="rounded-[10px]">
          <ReactModule />
        </div>
      )}
      <ReactQuill
        onChange={handleChange}
        formats={formats}
        modules={modules}
        className=""
      />
      {isBoardsPage && (
        <div id="toolBar" className="rounded-[20px] ">
          <ReactModule />
        </div>
      )}
    </div>
  );
};

export default TextEditor;
