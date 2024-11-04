import sanitizeHtml from "@/lib/sanitizeHtml";

interface NoSSRContentProps {
  content: string;
}

const NoSsrContent = ({ content }: NoSSRContentProps) => {
  const cleanContent = sanitizeHtml(content);

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{
        __html: cleanContent,
      }}
    />
  );
};

export default NoSsrContent;
