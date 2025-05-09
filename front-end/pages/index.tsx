import Music from "@/components/settings/Music";
import LoginForm from "@/components/main-menu/LoginForm";
import RegisterForm from "@/components/main-menu/RegisterForm";
import SplashScreen from "@/components/main-menu/SplashScreen";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Language from "@/components/settings/Language";
import UserService from "@/services/UserService";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
	const [showState, setShowState] = useState("login" as "login" | "register");
	const router = useRouter();


	useEffect(() => {
		UserService.checkJwt(router);
	}, []);

	const setShow = (show: "login" | "register") => {
		setShowState(show);
	};

	return (
		<>
			<RegisterForm setShow={setShow} showState={showState} />
			<LoginForm setShow={setShow} showState={showState} />

			<SplashScreen />
			<Music musicPath="/music/Soliloquy.mp3" volume={0.07} />
			<Language />
		</>
	);
}

export const getServerSideProps = async (context: { locale: any; }) => {
	const { locale } = context;
	return {
		props: {
			...(await serverSideTranslations(locale ?? "en", ["common"]))
		}
	}
}

export default Home;