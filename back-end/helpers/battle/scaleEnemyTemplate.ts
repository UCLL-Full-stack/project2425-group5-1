import { EnemyType } from "../../types";

const scaleEnemyTemplate = async (enemiesTemplate: EnemyType[], worldId: number, levelId: number) => {
    const newEnemies = enemiesTemplate.map(enemyTemplate => {
        enemyTemplate.defense = enemyTemplate.defense + (1 * worldId) + levelId;
        enemyTemplate.healthPoints = enemyTemplate.healthPoints + 5 * worldId + levelId * 1.2;
        enemyTemplate.strength = enemyTemplate.strength + (1 * worldId) + levelId;
        enemyTemplate.magicDefense = enemyTemplate.magicDefense + (1 * worldId) + levelId;
        enemyTemplate.magic = enemyTemplate.magic + (1 * worldId) + levelId;
        enemyTemplate.speed = enemyTemplate.speed + (1 * worldId) + levelId;
        enemyTemplate.dexterity = enemyTemplate.dexterity + (1 * worldId) + levelId;
        enemyTemplate.luck = enemyTemplate.luck + (1 * worldId) + levelId;
        enemyTemplate.level = enemyTemplate.level + (1 * worldId) + levelId;
        return enemyTemplate
    });
    
    return newEnemies;
};

export default scaleEnemyTemplate;
