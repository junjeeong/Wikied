import Image from "next/image";
import Link from "next/link";
import linkIcon from "@/assets/icon/ic_link.svg";

interface CustomLinkProps {
  link: string;
  size?: "small" | "medium";
}

const CustomLink = ({ link, size = "medium" }: CustomLinkProps) => {
  const imageSize = {
    small: { width: 16, height: 16 },
    medium: { width: 20, height: 20 },
  };

  return (
    <div className="flex items-center gap-[5px] w-fit px-[10px] py-[3px] rounded-[10px] bg-green50 text-green200">
      <Image
        src={linkIcon}
        width={imageSize[size].width}
        height={imageSize[size].height}
        alt="링크 아이콘"
      />
      <Link className={size === "medium" ? "text-md" : "text-xs"} href={link}>
        {link}
      </Link>
      <p className="text-"></p>
    </div>
  );
};

export default CustomLink;
