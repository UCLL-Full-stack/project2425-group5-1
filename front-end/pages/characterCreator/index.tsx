import SplashScreen from "@/components/main-menu/SplashScreen";
import TemplateCharacterContainer from "@/components/main-menu/TemplateCharacterContainer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const characterCreator: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        if(!JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token) router.push("/");
    }, []);
    
    return (
        <>
            <TemplateCharacterContainer />
            <SplashScreen skip={true} />
        </>
    );
};

export default characterCreator;
