import LoginForm from "@/components/main-menu/LoginForm";
import MenuMusic from "@/components/main-menu/MenuMusic";
import RegisterForm from "@/components/main-menu/RegisterForm";
import SplashScreen from "@/components/main-menu/SplashScreen";
import { useState } from "react";

export default function Home() {
  const [showState, setShowState] = useState("login" as "login" | "register");

  const setShow = (show: "login" | "register") => {
    setShowState(show);
  };

  return (
    <>
      <RegisterForm setShow={setShow} showState={showState} />
      <LoginForm setShow={setShow} showState={showState} />

      <SplashScreen />
      <MenuMusic />
    </>
  );
}
