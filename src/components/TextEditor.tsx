import React, { useState } from "react";
import ReactQuill from "react-quill";

const TextEditor: React.FC = () => {
  const [content, setContent] = useState<string>("");

  const handleChange = (value: string) => {
    setContent(value);
  };

  return (
    <div className="p-4 bg-orange-500 rounded shadow-md">
      <ReactQuill
        value={content}
        onChange={handleChange}
        theme="snow"
        className="h-80" // 원하는 높이로 조정
      />
    </div>
  );
};

export default TextEditor;
