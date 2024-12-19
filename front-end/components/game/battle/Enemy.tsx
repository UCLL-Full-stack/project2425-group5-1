import React, { useEffect, useState } from 'react';
import styles from '@/styles/game/battle/Enemy.module.css';
import { EnemyType } from '@/types';

interface EnemyProps {
    name: string;
    state: string;
    onClick: (enemy?: EnemyType) => void;
    selected: EnemyType | null;
}

const Enemy: React.FC<EnemyProps> = ({ name, state, onClick, selected }) => {
    const [selectionStyle, setSelectionStyle] = useState({});

    useEffect(() => {
        if(!selected)  return;
        name === selected.name ? setSelectionStyle({transition: "all 0.4s ease", filter: "brightness(150%)", transform: "scaleX(-1.2) scaleY(1.2)"}) : setSelectionStyle({filter: "brightness(100%)", transition: "all 0.4s ease"});
    }, [selected]);

    return (
        <>
            <div style={selectionStyle} className={styles[name + "Container"]} onClick={() => onClick()}>
                <div className={`${styles.enemy} ${styles[name]} ${styles[state]}`} />
                <div className={`${styles[name + "Shadow"]}`}></div>
            </div>
        </>
    );
}
    

export default Enemy;
