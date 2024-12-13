import Music from "@/components/Music";
import LoginForm from "@/components/main-menu/LoginForm";
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
      <Music musicPath="/music/Soliloquy.mp3" volume={0.07} />
    </>
  );
}
