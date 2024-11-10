import styles from "@/styles/game/MenuSigns.module.css";
import Image from "next/image";

export default function MenuSigns() {
    return (
        <div className={styles.blacksmith}>
            <Image src="/images/ui/arrow_signs.png" width={128} height={128} className={styles.image} quality={100} alt="Shop" />
        </div>
    );
}
