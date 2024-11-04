import { TotalArticlesProps } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

const TotalArticles = ({ totalArticles }: TotalArticlesProps) => {
  return (
    <ul className="my-[20px]">
      <li className="flex text-lg text-gray-400 border-t border-b border-gray-200 pt-[11px] pb-[12px]  Mobile:hidden">
        <div className="w-1/12 text-center">번호</div>
        <div className="w-5/12 text-center">제목</div>
        <div className="w-2/12 text-center">작성자</div>
        <div className="w-2/12 text-center">좋아요</div>
        <div className="w-2/12 text-center">날짜</div>
      </li>
      {totalArticles.map(({ id, title, writer, likeCount, createdAt }) => (
        <Link href={`boards/${id}`} key={id}>
          <li className="flex text-lg text-gray-500 border-b border-gray-200 pt-[11px] pb-[12px] cursor-pointer Mobile:flex-col">
            <div className="w-1/12 text-center Mobile:hidden">{id}</div>
            <div className="w-5/12 text-center Mobile:w-full Mobile:text-left">
              {title}
            </div>

            {/* PC, Tablet 버전 */}
            <div className="w-2/12 text-center Mobile:hidden">
              {writer.name}
            </div>
            <div className="w-2/12 text-center Mobile:hidden">{likeCount}</div>
            <div className="w-2/12 text-center Mobile:hidden">
              {new Date(createdAt).toLocaleDateString()}
            </div>

            {/* Mobile 버전 */}
            <div className="flex justify-between Tablet:hidden PC:hidden">
              <div className="flex gap-[10px]">
                <div>{writer.name}</div>
                <div>{new Date(createdAt).toLocaleDateString()}</div>
              </div>
              <div className="flex gap-[5px] ">
                <Image
                  src={"/icons/ic_heart.svg"}
                  width={18}
                  height={18}
                  alt="좋아요"
                />
                {likeCount}
              </div>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default TotalArticles;
