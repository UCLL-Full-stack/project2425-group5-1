import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  return (
    <>
      <SplashScreen />
      <LoginForm />
      <RegisterForm />
    </>
  );
}
