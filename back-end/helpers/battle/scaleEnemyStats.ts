import { Enemy } from "../../model/enemy";

const scaleEnemyStats = (enemy: Enemy, world: number, level: number): Enemy => {
    const worldMultiplier = 1 + world * 0.25;
    const levelMultiplier = 1 + level * 0.05;
    const totalMultiplier = (worldMultiplier * 0.7) + (levelMultiplier * 0.3);

    return {
        ...enemy,
        strength: Math.round(enemy.strength * totalMultiplier),
        speed: Math.round(enemy.speed * totalMultiplier),
        magic: Math.round(enemy.magic * totalMultiplier),
        dexterity: Math.round(enemy.dexterity * totalMultiplier),
        healthPoints: Math.round(enemy.healthPoints * totalMultiplier),
        manaPoints: Math.round(enemy.manaPoints * totalMultiplier),
        luck: Math.round(enemy.luck * totalMultiplier),
        defense: Math.round(enemy.defense * totalMultiplier),
        magicDefense: Math.round(enemy.magicDefense * totalMultiplier),
        world: -1, // Remove it from the base enemy pool
    };
};

export default scaleEnemyStats;
