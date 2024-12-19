import styles from "@/styles/game/ui/TextContainer.module.css";
import { useEffect, useState } from "react";

interface Props {
    textContent?: string[];
    isClicked?: (name: "" | "merchant" | "hatman" | "woman" | "questboard" ) => void;
    children?: React.ReactNode;
    Skippable?: boolean;
}

const TextContainer: React.FC<Props> = ({ textContent, isClicked, children, Skippable = true }) => {
    const [clicks, setClicks] = useState<number>(textContent ? textContent.length : 0);
    const [toggle, setToggle] = useState<boolean>(false);
    const [skippable, setSkippable] = useState<boolean>(Skippable);

    useEffect(() => {
        if((clicks === -1 || (!children && clicks <= 0)) && skippable) {
            setToggle(true);
            isClicked ? isClicked("") : null;
        }
    }, [clicks]);

    const handleClick = () => {
        if(clicks >= 0 && skippable) {
            setClicks(clicks - 1);
        }
    };

    if(toggle && skippable) return <></>;
    return (
        <>
            {children || textContent ?
                <div onClick={handleClick} className={styles.fillContainer}>
                    <div className={styles.container}>
                        {textContent && clicks >= 1 && clicks <= textContent.length ?
                            textContent.slice().reverse()[clicks - 1].split("\n").map((text, i) => (
                                <span key={i} className={styles.gap}>{text}</span>
                            ))
                        : children}
                    </div>
                </div>
            : null}
        </>
    );
}

export default TextContainer;
