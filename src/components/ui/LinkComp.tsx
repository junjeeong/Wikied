import Image from "next/image";
import Link from "next/link";
import styles from "./LinkComp.module.css";
import linkIcon from "@/assets/icon/ic_link.svg";

interface LinkCompProps {
  link: string;
  size?: "small" | "medium";
}

const LinkComp = ({ link, size = "medium" }: LinkCompProps) => {
  const imageSize = {
    small: { width: 16, height: 16 },
    medium: { width: 20, height: 20 },
  };

  return (
    <div className={styles.linkContainer}>
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

export default LinkComp;
