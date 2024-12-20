import styles from "@/styles/game/MenuSigns.module.css";
import Image from "next/image";

const MenuSigns: React.FC = () => {
    return (
        <div className={styles.blacksmith}>
            <Image src="/images/ui/arrow_signs.png" width={128} height={128} className={styles.image} quality={100} alt="Shop" draggable={false}  />
        </div>
    );
}

export default MenuSigns