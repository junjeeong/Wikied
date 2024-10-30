// components/Editor.js
import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";

// dynamic import로 'react-quill'을 클라이언트 사이드에서만 로드
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const modules = useMemo(
    () => ({
      toolbar:{
        container: "#toolbar",
      }
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

  return (
    <>
    <CustomToolbar />
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      theme="snow"
      />
      </>
  );
};

export default Editor;
