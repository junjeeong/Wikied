export const calculateCharCount = (text: string) => {
  // 공백 포함 글자 수
  const charCountWithSpaces = Array.from(text).length;

  // 공백 제외 글자 수
  const charCountWithoutSpaces = Array.from(text.replace(/\s+/g, "")).length;

  return {
    withSpaces: charCountWithSpaces,
    withoutSpaces: charCountWithoutSpaces,
  };
};

export const stripHTML = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
