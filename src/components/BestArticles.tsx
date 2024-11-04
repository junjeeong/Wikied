import { BestArticlesProps } from "@/types/types";
import Image from "next/image";
import FilledButton from "./ui/Button/FilledButton";
import { useEffect, useState } from "react";
import Link from "next/link";

const BestArticles = ({ bestArticles }: BestArticlesProps) => {
  const [articles, setArticles] = useState(bestArticles);
  const [isMobile, setIsMobile] = useState(false);

  const getArticles = () => {
    const width = window.innerWidth;
    if (width < 767) {
      setArticles(bestArticles.slice(0, 1)); //
      setIsMobile(true);
    } else {
      setArticles(bestArticles);
      setIsMobile(false);
    }
  };

  useEffect(() => {
    setArticles(bestArticles);
    getArticles();

    window.addEventListener("resize", getArticles);

    return () => {
      window.removeEventListener("resize", getArticles);
    };
  }, [bestArticles]);

  const size = isMobile ? "small" : "medium";

  return (
    <div className="relative mt-[60px]">
      <h2 className="text-3xl font-semibold text-gray-500 Mobile:text-2xl">
        베스트 게시글
      </h2>

      <ul className="mt-[60px] grid grid-cols-4 Tablet:grid-cols-2 Mobile:grid-cols-1 gap-[16px] ">
        {articles.map((article) => (
          <Link href={`/boards/${article.id}`} key={article.id}>
            <li className="h-[220px] shadow-[0_4px_20px_#00000014] rounded-[10px] cursor-pointer overflow-hidden hover:scale-105">
              <div className="relative h-[131px]">
                <Image
                  src={article.image ?? "/public/icons/ic_image.svg"}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
                  alt={article.title}
                  priority
                />
              </div>
              <div className="py-[19px] px-[19px]">
                <strong className="text-2lg font-semibold text-gray-500">
                  {article.title}
                </strong>
                <div className="mt-[6px] flex justify-between text-md text-gray-400">
                  <div className="flex gap-[8px] ">
                    <small>{article.writer.name}</small>
                    <small>
                      {new Date(article.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <small className="flex gap-[4px]">
                    <Image
                      src={"/icons/ic_heart.svg"}
                      width={18}
                      height={18}
                      alt="좋아요"
                    />
                    {article.likeCount}
                  </small>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>

      <div className="absolute top-0 right-0">
        <Link href={"/addboard"}>
          <FilledButton size={size}>게시글 등록하기</FilledButton>
        </Link>
      </div>
    </div>
  );
};

export default BestArticles;
