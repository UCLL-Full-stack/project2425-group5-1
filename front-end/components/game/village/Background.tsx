import styles from "@/styles/game/village/Background.module.css";
import Image from "next/image";

const Background: React.FC = () => {
    return (
        <>
            <Image className={`${styles.image}`} src="/images/sprites/environment-preview.png" width={1536} height={288} alt="Background Image" quality={100} draggable={false}  />
        </>
    );
}

export default Background;