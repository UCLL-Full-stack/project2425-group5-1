import React, { useEffect, useState } from 'react';
import styles from '@/styles/game/battle/Enemy.module.css';
import { EnemyType } from '@/types';

interface EnemyProps {
    enemyId: number | undefined;
    name: string;
    state: string;
    onClick: (enemy?: EnemyType) => void;
    selected: EnemyType | null;
    enemy: EnemyType;
}

const Enemy: React.FC<EnemyProps> = ({ enemyId, name, state, onClick, selected, enemy }) => {
    const [selectionStyle, setSelectionStyle] = useState({});
    const [maxHp, setMaxHp] = useState<number>(0);

    useEffect(() => {
        setMaxHp(enemy.healthPoints);
        return() => {}
    }, []);

    useEffect(() => {
        if(!selected)  return;
        enemyId === selected.id ? setSelectionStyle({transition: "all 0.4s ease", filter: "brightness(150%)", transform: "scaleX(-1.2) scaleY(1.2)"}) : setSelectionStyle({filter: "brightness(100%)", transition: "all 0.4s ease"});
    }, [selected]);

    return (
        <>
            <div style={selectionStyle} className={styles[name + "Container"]} onClick={() => onClick()}>
                <div className={`${styles.enemy} ${styles[name]} ${styles[state]}`}/>
                <div className={`${styles[name + "Shadow"]}`} />
                <div className={styles.healthContainer}>
                    <p style={{width: `${(enemy.healthPoints / maxHp) * 300}`}}>{enemy.healthPoints}/{maxHp}</p>
                    <div className={styles.liveHp} style={{width: `${Math.floor((enemy.healthPoints / maxHp) * 100)}%`}}></div>
                </div>
            </div>
        </>
    );
}
    

export default Enemy;
