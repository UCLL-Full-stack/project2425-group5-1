import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import SplashScreen from "@/components/SplashScreen";
import { useState } from "react";

export default function Home() {
  const [showState, setShowState] = useState("login" as "login" | "register");

  const setShow = (show: "login" | "register") => {
    setShowState(show);
  };

  return (
    <>
      <SplashScreen />
      <RegisterForm setShow={setShow} showState={showState} />
      <LoginForm setShow={setShow} showState={showState} />
    </>
  );
}
