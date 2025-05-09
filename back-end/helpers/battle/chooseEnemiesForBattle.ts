import { Enemy } from "../../model/enemy";

const chooseEnemiesForBattle = ( selectedLevel: { world: number, level: number }, enemyPool: Enemy[] ): Enemy[] => {
    const rand = Math.random();
    let count: number;

    if (rand < 0.3 + selectedLevel.level * 0.03) {
        count = 2;
    } else if (rand < 0.1 + selectedLevel.level * 0.05) {
        count = 3;
    } else {
        count = 1;
    }

    const battleEnemies: Enemy[] = [];
    for(let i = 0 ; i < count ; i++) {
        const randomIndex = Math.floor(Math.random() * enemyPool.length);
        battleEnemies.push(enemyPool[randomIndex]);
    }

    return battleEnemies;
}

export default chooseEnemiesForBattle;
