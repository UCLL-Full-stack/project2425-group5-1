import styles from "@/styles/game/ui/TextContainer.module.css";
import { Dispatch, SetStateAction } from "react";

interface Props {
    textContent: string;
    isClicked: (arg0: string) => void;
}

const TextContainer: React.FC<Props> = ({ textContent, isClicked }) => {
    return (
        <div onClick={() => isClicked("")} className={styles.fillContainer}>
            <div className={styles.container}>
                {textContent.split("\n").map((text, i) => (
                    <span key={i} className={styles.gap}>
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default TextContainer;