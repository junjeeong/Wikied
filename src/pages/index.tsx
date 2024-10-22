import Image from "next/image";
import Button from "@/components/ui/Button";
import LandingTexts from "@/components/ui/LandingTexts";
import titleImg from "@/assets/images/img_home1.png";
import writeImg from "@/assets/images/img_home4.png";
import shareImg1 from "@/assets/images/img_item1.png";
import shareImg2 from "@/assets/images/img_item2.png";
import shareImg3 from "@/assets/images/img_item3.png";
import shareImg4 from "@/assets/images/img_item4.png";

const MainPage = () => {
  const SECTION_TEXTS = {
    write: {
      subtitle: "WRITE",
      line1: "친구의 위키,",
      line2: "직접 작성해 봐요",
    },
    share: {
      subtitle: "SHARE",
      line1: "내 위키 만들고",
      line2: "친구에게 공유해요",
    },
    view: {
      subtitle: "VIEW",
      line1: "친구들이 달아준",
      line2: "내용을 확인해 봐요",
    },
  };

  const shareItems = [
    { src: shareImg1, bgColor: "#B2A5FD" },
    { src: shareImg2, bgColor: "#ADEDDE" },
    { src: shareImg3, bgColor: "#DEE5F5" },
    { src: shareImg4, bgColor: "#DEE5F5" },
  ];

  return (
    <div className="flex flex-col font-nexon">
      <div className="flex flex-col items-center relative">
        <h2 className="text-center mt-[100px] mb-10 text-4xl leading-[46px] font-light">
          남들이 만드는
          <br />
          <span className="inline-block mt-[15px] text-[60px] leading-[69px] font-bold">
            나만의 위키
          </span>
        </h2>
        <Button>위키 만들기</Button>
        <Image
          className="absolute z-20 top-[calc(100%+44px)]"
          src={titleImg}
          width={336}
          height={398}
          alt="타이틀 섹션 이미지"
        />
      </div>

      <div className="bg-gray500 mt-[268px] relative">
        {/* <div className="bg-green200 absolute top-[-90px] left-1/2 -translate-x-1/2 z-10 rounded-full w-[104vw] h-[180px] aspect-[104/180]"></div> */}

        <div className="flex gap-[10px] px-5 mt-[274px] mb-[100px]">
          <div className="flex flex-col gap-[30px]">
            <LandingTexts texts={SECTION_TEXTS.write} mode="dark" />
            <video className="rounded-[10px] " width={133} autoPlay loop muted>
              <source src="/videos/landing-keyboard.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="relative w-[60%]">
            <Image
              src={writeImg}
              // fill={true}
              width={520}
              height={681}
              alt="write 섹션 이미지"
            />
          </div>
        </div>
      </div>

      <div className="mt-[100px]">
        <div className="px-5">
          <LandingTexts texts={SECTION_TEXTS.share} textAlign="right" />
        </div>
        <div className="flex justify-center gap-[10px] mt-10 mb-[100px]">
          <div className="w-[76px] h-[76px] rounded-[10px] bg-[#DEE5F5]"></div>
          {shareItems.map((item, index) => (
            <Image
              key={index}
              src={item.src}
              alt={`share 이미지 ${index + 1}`}
              width={76}
              height={76}
              className={`bg-[${item.bgColor}] rounded-[10px]`}
            />
          ))}
          <div className="w-[76px] h-[76px] rounded-[10px] bg-[#DEE5F5]"></div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
