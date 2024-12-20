import Music from "@/components/settings/Music";
import Village from "@/components/game/Village";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import localFont from 'next/font/local';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const quinquefiveFont = localFont({ src: "./fonts/quinque-five-font/Quinquefive-ALoRM.ttf" });

const Game: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        if(!JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token) router.push("/");
    }, []);

    return (
        <main className={quinquefiveFont.className}>
            <Village />
            <Music musicPath='/music/rpg_village_loop.mp3' volume={0.07} />
        </main>
    );
};


export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"]))
        }
    };
};

export default Game;