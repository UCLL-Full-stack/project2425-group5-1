import SplashScreen from "@/components/main-menu/SplashScreen";
import TemplateCharacterContainer from "@/components/main-menu/TemplateCharacterContainer";

const characterCreator: React.FC = () => {
    return (
        <>
            <TemplateCharacterContainer />
            <SplashScreen skip={true} />
        </>
    );
};

export default characterCreator;
