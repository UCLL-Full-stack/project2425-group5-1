import { useEffect, useState } from "react";
import styles from "@/styles/game/battle/Player.module.css";
import { Character } from "@/types";

interface Props {
    state: "idle" | "attacking";
    player: Character;
}

const Player: React.FC<Props> = ({ state, player }) => {
    const [maxHp, setMaxHp] = useState<number>(0);

    useEffect(() => {
        setMaxHp(player.healthPoints);
    }, []);


    return (
        <>
            <div className={`${styles.player} ${styles[state]}`}>
                <div className={styles.healthContainer}>
                    <p style={{width: `${(player.healthPoints / maxHp) * 300}`}}>{player.healthPoints}/{maxHp}</p>
                    <div className={styles.liveHp} style={{width: `${Math.floor((player.healthPoints / maxHp) * 100)}%`}}></div>
                </div>
            </div>
            <div className={`${styles.shadow}`}></div>
        </>
    );
};

export default Player;
