import styles from "@/styles/game/village/Woman.module.css";
import { useEffect, useRef, useState } from "react";

export default function Woman() {
    const [animationState, setAnimationState] = useState<"idle" | "walking">("walking");
    const villagerContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!villagerContainerRef.current) return;
        if(animationState === "idle") {
            villagerContainerRef.current.style.animationPlayState = "paused";
        } else {
            villagerContainerRef.current.style.animationPlayState = "running";
        }
        return () => {}
    }, [animationState]);

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