import React, { useEffect } from 'react';
import styles from '@/styles/game/battle/Enemy.module.css';

interface EnemyProps {
    name: string;
    state: string;
}

const Enemy: React.FC<EnemyProps> = ({ name, state }) => {

    useEffect(() => {
        console.log(name);
    }, []);

    return (
        <>
            <div className={styles[name + "Container"]}>
                <div className={`${styles.enemy} ${styles[name]} ${styles[state]}`} />
                <div className={`${styles[name + "Shadow"]}`}></div>
            </div>
        </>
    );
}
    

export default Enemy;
