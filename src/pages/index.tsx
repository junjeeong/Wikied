import { getUser } from "@/api/user";
import Button from "@/components/ui/Button";
import useAuthStore from "@/store/AuthStore";

const HomePage = () => {
  const { login } = useAuthStore();

  const handleLogin = async () => {
    await login("test5225@test.com", "test5225");
  };

  const handleUser = async () => {
    await getUser();
  };

  return (
    <div>
      <Button onClick={handleLogin}>로그인</Button>
      <div>
        <Button onClick={handleUser}>유저 정보 확인</Button>
      </div>
    </div>
  );
};

export default HomePage;
