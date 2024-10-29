import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomLink from "@/components/ui/CustomLink";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomLinkContainer = () => {
  const router = useRouter();
  const [fullUrl, setFullUrl] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    const url = `${window.location.origin}${router.asPath}`;
    setFullUrl(url);
  }, [router.asPath]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(fullUrl);
  };

  const notify = () => {
    if (!isToastVisible) {
      setIsToastVisible(true);
      toast.success("위키 링크가 복사되었습니다.", {
        onClose: () => setIsToastVisible(false),
        // className은 임시로 설정, Toast 커스텀하는 방법 찾는중
        className:
          "font-medium w-[247px] rounded-[10px] font-pretendard border border-[#4CBFA4] bg-[#EEF9F6] text-md h-[50px] px-[20px] py-[13px] text-[#32A68A]",
      });
    }
  };

  const handleClick = () => {
    copyToClipboard();
    notify();
  };

  return (
    <div>
      <CustomLink link={fullUrl} handleClick={handleClick} />
    </div>
  );
};

export default CustomLinkContainer;
