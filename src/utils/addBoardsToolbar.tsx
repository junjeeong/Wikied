export const imageHandler = () => {
  setIsOpen(true);
};

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
