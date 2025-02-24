import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex flex-col mb-44 w-[1200px] h-[250px]">
        <h2 className="font-bold text-[#3ecfad] text-[80px]">
          404 Page not found
        </h2>
        <p className="mt-4 text-gray-400">
          존재하지 않는 주소를 입력하셨거나,
          <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </p>
        <div className="relative flex mt-8">
          <div className="-bottom-3 -left-4 absolute bg-gray-100 opacity-50 rounded-full w-12 h-12" />
          <Link href="/">메인으로 가기</Link>
          <Image
            src="/icons/arrow_right.png"
            alt=""
            width={18}
            height={18}
            className="ml-3"
          />
        </div>
      </div>
    </main>
  );
};

export default NotFound;
