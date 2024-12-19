import { useEffect } from "react";
import styles from "@/styles/game/battle/Player.module.css";

interface Props {
    state: "idle" | "attacking";
}

const Player: React.FC<Props> = ({ state }) => {

    useEffect(() => {

    }, []);


    return (
        <>
            <div className={`${styles.player} ${styles[state]}`}></div>
            <div className={`${styles.shadow}`}></div>
        </>
    );
};

export default Player;
