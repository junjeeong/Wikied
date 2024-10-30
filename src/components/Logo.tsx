import Image from "next/image";
import Link from "next/link";

const Logo = () => (
  <Link href="/" aria-label="홈으로 이동">
    <Image src={"/logo/wikied.svg"} width={107} height={30} alt="wikied logo" />
  </Link>
);

export default Logo;
