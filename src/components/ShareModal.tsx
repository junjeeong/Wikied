import URLCopyButton from "@/components/URLCopyButton";
import { useEffect } from "react";

const ShareModal = ({
  setIsOpen,
  url,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  url: string;
}) => {
  const handleClose = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const shareToKakao = () => {
    if (!window.Kakao) return;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "Wikied",
        description: "친구의 위키를 직접 수정하고 공유해보세요.",
        imageUrl: "https://9-3-wikied.vercel.app/images/img_item2.png",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: "Wikied - 지인의 위키를 직접 수정해 보세요.",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  const shareToTwitter = () => {
    const text = "Wikied - 지인의 위키를 직접 수정해보세요.";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    // 스크립트가 없으면 로드
    if (!window.Kakao && !document.getElementById("kakao-sdk")) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      script.id = "kakao-sdk";
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init("7023a087c6f0eb7c153e01ddd366b9c9");
        }
      };
      document.head.appendChild(script);
    } else if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init("7023a087c6f0eb7c153e01ddd366b9c9");
    }
  }, []);

  return (
    <div className="z-[98] fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="z-[99] w-[460px] h-[310px] rounded-[20px] bg-white relative flex flex-col">
        <h1 className="border-b-[#E6E8ED] border-b flex justify-center text-2lg font-bold h-[52px] items-center">
          위키 공유
        </h1>
        <div className="py-10 flex gap-10 justify-center">
          <button
            className="hover:scale-110 transition-transform duration-300"
            onClick={shareToKakao}
          >
            <img
              src="/icons/kakaotalk.svg"
              alt="카카오톡"
              width={72}
              height={72}
            />
          </button>
          <button
            className="hover:scale-110 transition-transform duration-300"
            onClick={shareToTwitter}
          >
            <img src="/icons/x.svg" alt="트위터" width={72} height={72} />
          </button>
        </div>
        <button
          className="absolute top-[14px] right-[14px]"
          onClick={handleClose}
        >
          <img
            src="/icons/ic_close.svg"
            alt="닫기 버튼"
            width={24}
            height={24}
          />
        </button>
        <div className="px-5">
          <URLCopyButton url={url} />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
