import { useEffect } from "react";
import styles from "@/styles/game/battle/Player.module.css";


const Player: React.FC = () => {

    useEffect(() => {

    }, []);


    return (
        <>
            <div className={`${styles.player} ${styles.idle}`}></div>
            <div className={`${styles.shadow}`}></div>
        </>
    );
};

export default Player;
