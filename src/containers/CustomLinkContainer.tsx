import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomLink from "@/components/ui/CustomLink";
import useNotify from "@/hooks/useNotify";

const CustomLinkContainer = () => {
  const router = useRouter();
  const [fullUrl, setFullUrl] = useState("");

  useEffect(() => {
    const url = `${window.location.origin}${router.asPath}`;
    setFullUrl(url);
  }, [router.asPath]);

  const notify = useNotify();
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(fullUrl);
  };

  const handleClick = () => {
    copyToClipboard();
    notify("위키 링크가 복사되었습니다.", "success");
  };

  return (
    <div>
      <CustomLink link={fullUrl} handleClick={handleClick} />
    </div>
  );
};

export default CustomLinkContainer;
