import Image from "next/image";
import LandingButton from "@/components/ui/Button/LandingButton";
import useAuthStore from "@/store/AuthStore";
import Link from "next/link";

const MainPage = () => {
  const { isLoggedIn, user } = useAuthStore();
  const linkURL = isLoggedIn ? `/wiki/${user?.name}` : "/login";

  const shareItems = [
    { src: "/images/img_item1.png", bgColor: "#B2A5FD" },
    { src: "/images/img_item2.png", bgColor: "#ADEDDE" },
    { src: "/images/img_item3.png", bgColor: "#DEE5F5" },
    { src: "/images/img_item4.png", bgColor: "#DEE5F5" },
  ];

  return (
    <div className="flex flex-col items-center bg-landing-light font-nexon">
      {/* title section */}
      <section className="relative w-full">
        <div className="flex flex-col items-center Mobile:pt-[100px] pt-[120px]">
          <h2 className="text-center pb-10 Mobile:text-[40px] text-[60px] Mobile:leading-[46px] leading-[69px] font-light">
            남들이 만드는
            <br />
            <span className="inline-block mt-[15px] Mobile:text-[60px] text-[90px] Mobile:leading-[69px] leading-[103.5px] font-bold">
              나만의 위키
            </span>
          </h2>
          <Link href={linkURL}>
            <LandingButton>위키 만들기</LandingButton>
          </Link>
          <Image
            className="absolute z-20 Mobile:top-[368px] top-[461px] Mobile:w-[336px] Mobile:h-[398px]"
            src={"/images/img_home1.png"}
            width={498}
            height={590}
            alt="타이틀 섹션 이미지"
          />
        </div>
      </section>
      {/* write section */}
      <section className="relative bg-gray-500 w-full Mobile:px-5 Tablet:px-12 mt-[268px] Tablet:mt-[493.71px] PC:mt-[507px]">
        <div className="rounded-t-[50%] bg-gray-500 absolute top-[-90px] Tablet:top-[-117px] PC:top-[-200px] left-1/2 -translate-x-1/2 z-10 w-[calc(100%+118px)] Tablet:w-[calc(100%+40px)] PC:w-[calc(100%+80px)] h-[180px] Tablet:h-[234px] PC:h-[400px]"></div>

        <div className="flex max-w-[924px] w-full justify-center mx-auto gap-[10px] Tablet:gap-[20px] PC:gap-[40px] mt-[274px] Tablet:mt-[303.29px] PC:mt-[330px] mb-[100px] Tablet:mb-[160px] PC:mb-[200px]">
          <div className="flex flex-col justify-between flex-grow flex-shrink-0 gap-[30px] Tablet:gap-[40px] PC:gap-[60px]">
            <div>
              <p className="section-title">WRITE</p>
              <p className="text-gray-50 text-[16px] leading-[18.4px] Mobile:mt-[10px] Tablet:text-[32px] Tablet:leading-[36.8px] mt-[20px] PC:text-[50px] PC:leading-[57.5px]">
                친구의 위키,
                <br />
                직접 작성해 봐요
              </p>
            </div>

            <div className="relative pb-[120%] overflow-hidden rounded-[10px] w-full aspect-[0.808]">
              <video
                className="absolute top-0 left-0 w-full h-full object-cover rounded-[10px] "
                autoPlay
                loop
                muted
              >
                <source src="/videos/landing-keyboard.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="relative flex-grow flex-shrink-0 aspect-[0.761] Tablet:w-[365px] PC:w-[520px]">
            <Image
              src={"/images/img_home4.png"}
              className="w-full h-full"
              alt="write 섹션 이미지"
              width={192}
              height={300}
            />
          </div>
        </div>
      </section>
      {/* share section */}
      <section className="max-w-[924px] w-full Mobile:px-5 Tablet:px-12 section-padding">
        <div className="text-right">
          <p className="section-title">SHARE</p>
          <p className="text-gray-500 text-[16px] leading-[18.4px] Mobile:mt-[10px] Tablet:text-[32px] Tablet:leading-[36.8px] mt-[20px] PC:text-[50px] PC:leading-[57.5px]">
            내 위키 만들고
            <br />
            친구에게 공유해요
          </p>
        </div>

        <div className="flex justify-center overflow-visible gap-[10px] Tablet:gap-[20px] PC:gap-[70px] mt-10 Tablet:mt-20 PC:mt-[120px]">
          <div className="w-[76px] Tablet:w-[147px] PC:w-[218px] aspect-square flex-grow flex-shrink-0 rounded-[10px] bg-[#DEE5F5]"></div>
          {shareItems.map((item, index) => (
            <div
              key={index}
              className="rounded-[10px] w-[76px] Tablet:w-[147px] PC:w-[218px] aspect-square flex-grow flex-shrink-0"
              style={{ backgroundColor: item.bgColor }}
            >
              <Image
                key={index}
                className="w-full h-full"
                src={item.src}
                alt={`share 이미지 ${index + 1}`}
                width={218}
                height={218}
              />
            </div>
          ))}
          <div className="w-[76px] Tablet:w-[147px] PC:w-[218px] aspect-square flex-grow flex-shrink-0 rounded-[10px] bg-[#DEE5F5]"></div>
        </div>
      </section>
      {/* view section */}
      <section className="w-full bg-landing-bold Mobile:px-5 Tablet:px-12 section-padding">
        <div className="w-full max-w-[924px] mx-auto">
          <div className="text-left">
            <p className="section-title">VIEW</p>
            <p className="text-gray-500 text-[16px] leading-[18.4px] Mobile:mt-[10px] Tablet:text-[32px] Tablet:leading-[36.8px] mt-[20px] PC:text-[50px] PC:leading-[57.5px]">
              친구들이 달아준
              <br />
              내용을 확인해 봐요
            </p>
          </div>

          <div className="flex flex-col mt-10 Tablet:mt-20 PC:mt-[120px] gap-[10px] Tablet:gap-[22px] PC:gap-[40px]">
            <Image
              src={"/images/img_home3.png"}
              className="w-full h-auto"
              alt="view 이미지 1"
              width={924}
              height={280}
            />

            <div className="flex justify-between gap-[10px] Tablet:gap-[22px] PC:gap-[40px] ">
              <div className="bg-purple-100 rounded-[10px]">
                <Image
                  src={"/images/img_bell.png"}
                  alt="bell 이미지"
                  width={280}
                  height={280}
                />
              </div>
              <div>
                <Image
                  src={"/images/img_home2.png"}
                  alt="view 이미지 2"
                  width={604}
                  height={280}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* bottom section */}
      <section className="flex flex-col items-center w-full gap-10 bg-gray-500 section-padding">
        <h3 className="text-background font-bold Mobile:text-[30px] Mobile:leading-[34.5px] text-[60px] leading-[69px] ">
          나만의 위키 만들어 보기
        </h3>
        <Link href={linkURL}>
          <LandingButton mode="Bottom">지금 시작하기</LandingButton>
        </Link>
      </section>
      {/* footer section */}
      <footer className="bg-gray-600 text-background font-pretendard w-full Mobile:text-[8px] Mobile:leading-[9.55px] text-[14px] leading-[16.71px] px-5 py-10 Tablet:px-12 Tablet:py-[60px] PC:p-20">
        <p className="font-bold Mobile:text-[10px] Mobile:leading-[11.93px] text-[16px] leading-[19.09px]">
          Copyright ⓒ Wikied.All Rights Reserved
        </p>
        <p className="pt-[10px] Mobile:pb-[20px] pb-[30px]">
          사업자등록번호 000-00-00000 &nbsp;|&nbsp; 통신판매신고
          제2020-서울-00000호 &nbsp;|&nbsp; 대표 : 이지은 <br />
          서울특별시 중구 청계천로 123, 위키드빌딩
        </p>
        <div className="flex Mobile:gap-[15px] gap-[30px] font-medium">
          <span>서비스 이용약관</span>
          <span>개인정보 취급방법</span>
          <span>전자금융거래 기본약관</span>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
