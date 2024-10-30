// import LoginForm from "@/containers/LoginForm";

// const Login = () => {
//   return (
//     <>
//       <LoginForm />
//     </>
//   );
// };

// export default Login;

import ConnectLostModal from "@/components/ConnectLostModal";
import ModalOverlay from "@/components/ModalOverlay";
import LoginForm from "@/containers/LoginForm";
import ProfileSettings from "@/containers/ProfileSettings";
import useAuthStore from "@/store/AuthStore";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { isLoggedIn, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      if (user?.profile === null) {
        setShowSettings(true);
      } else {
        router.push(`/wiki/${user?.profile.code}`);
      }
    }
  }, [isLoggedIn, user, router]);

  return (
    <>
      {!showSettings ? (
        <LoginForm setShowSettings={setShowSettings} />
      ) : (
        <ProfileSettings setShowSettings={setShowSettings} />
      )}
    </>
  );
};

export default Login;
