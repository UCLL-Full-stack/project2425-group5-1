import styles from "@/styles/game/ui/TextContainer.module.css";
import { useEffect, useState } from "react";

interface Props {
    textContent: string[];
    isClicked: (arg0: string) => void;
    children?: React.ReactNode;
}

const TextContainer: React.FC<Props> = ({ textContent, isClicked, children }) => {
    const [clicks, setClicks] = useState<number>(textContent.length);

    useEffect(() => {
        console.log(clicks);
        if(clicks === -1) {
            isClicked("");
        }
    }, [clicks]);

    const handleClick = () => {
        setClicks(clicks - 1);
    };
    [clicks - 1]
    return (
        <div onClick={handleClick} className={styles.fillContainer}>
            <div className={styles.container}>
                {clicks >= 1 && clicks <= textContent.length ?
                    textContent.slice().reverse()[clicks - 1].split("\n").map((text, i) => (
                        <span key={i} className={styles.gap}>
                            {text}
                        </span>
                    ))
                :
                    children
                }
            </div>
        </div>
    );
}

export default TextContainer;