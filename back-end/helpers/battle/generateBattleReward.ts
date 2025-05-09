const generateBattleReward = (selectedLevel: {world: number, level: number}, enemyCount: number): {
    xp: number;
    gold: number;
} => {
    const baseXpPerEnemy = 20;
    const baseGoldPerEnemy = 15;

    const worldMultiplier = 1 + selectedLevel.world * 0.3;
    const levelMultiplier = 1 + selectedLevel.level * 0.1;
    const enemyMultiplier = 1 + (enemyCount - 1) * 0.5;

    const totalMultiplier = (worldMultiplier * 0.6) + (levelMultiplier * 0.3) + (enemyMultiplier * 0.1);

    const xp = Math.round(baseXpPerEnemy * totalMultiplier);
    const randomGoldFactor = 0.9 + Math.random() * 0.2;
    const gold = Math.round(baseGoldPerEnemy * totalMultiplier * randomGoldFactor);

    return { xp, gold };
};

export default generateBattleReward;
