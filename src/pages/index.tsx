import FilledButton from "@/components/ui/Button/FilledButton";
import OutlineButton from "@/components/ui/Button/OutlineButton";
import RandingButton from "@/components/ui/Button/RandingButton";

const HomePage = () => {
  return (
    <div>
      <div>
        <FilledButton>로그인</FilledButton>
      </div>
      <div>
        <OutlineButton>목록으로</OutlineButton>
      </div>
      <div>
        <RandingButton mode="Bottom">내 위키 만들기</RandingButton>
      </div>
    </div>
  );
};

export default HomePage;
