import Image from "next/image";
import Link from "next/link";
import styles from "./CustomLink.module.css";
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
    <div className={styles["link-container"]}>
      <Image
        src={linkIcon}
        width={imageSize[size].width}
        height={imageSize[size].height}
        alt="링크 아이콘"
      />
      <Link className={styles[size]} href={link}>
        {link}
      </Link>
    </div>
  );
};

export default CustomLink;
