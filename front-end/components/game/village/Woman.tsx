import styles from "@/styles/game/village/Woman.module.css";
import { useEffect, useRef, useState } from "react";

interface Props {
    isClicked?: (name: "" | "merchant" | "hatman" | "woman" | "questboard" ) => void;
    textHandler: string;
}

const Woman: React.FC<Props> = ({ isClicked, textHandler }) => {
    const [animationState, setAnimationState] = useState<"idle" | "walking">("walking");
    const villagerContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!villagerContainerRef.current || !isClicked) return;
        if(animationState === "idle") {
            isClicked("woman");
            villagerContainerRef.current.style.animationPlayState = "paused";
        } else {
            isClicked("");
            villagerContainerRef.current.style.animationPlayState = "running";
        }
        return () => {}
    }, [animationState]);

    useEffect(() => {
        if(!villagerContainerRef.current) return;
        if(textHandler === "") {
            setAnimationState("walking");
        }
    }, [textHandler]);

    return (
        <div className={`${styles.spritesheet_container} ${styles.animate_position}`}
            ref={villagerContainerRef}
            onClick={() => setAnimationState(animationState === "walking" ? "idle": "walking")}
        >
            <div className={
                `${styles.spritesheet} ${animationState === "walking" ?
                    `${styles.walking} ${styles.animate_walking}`
                    :
                    `${styles.idle} ${styles.animate_idle}`
                }`}
            />
        </div>
    );
}

export default Woman;