import Button from "@/components/Button";
import styles from "./index.module.css";
import Image from "next/image";
import titleImg from "@/assets/images/img_home1.png";

const MainPage = () => {
  return (
    <div className={styles["page-container"]}>
      <div className={styles["title-section"]}>
        <h2 className={styles["title"]}>
          남들이 만드는
          <br />
          <span className={styles["title-bold"]}>나만의 위키</span>
        </h2>
        <Button>위키 만들기</Button>
        <Image
          className={styles["title-image"]}
          src={titleImg}
          width={498}
          height={590}
          alt="타이틀 섹션 이미지"
        />
        <p className="text-7xl text-blue-600">테일윈드 적용 테스트</p>
      </div>

      <div className={styles["write-section"]}>
        <div className={styles["round-section"]}></div>
        <p>WRITE</p>
        <p className={styles.As}>친구의 위키,</p>
        <p className="">직접 작성해 봐요</p>
      </div>
    </div>
  );
};

export default MainPage;
