import enemyRepository from '../repository/enemy.db';
import { Enemy } from '../model/enemy';
import { BattleType, EnemyType, worldId } from '../types';
import { Battle } from '../model/battle';

const getAllEnemies = async (): Promise<Enemy[]> => {
    return await enemyRepository.getEnemies();
};

const getEnemy = async (id: number): Promise<Enemy | null> => {
    const enemy = await enemyRepository.getEnemyById(id);
    if (!enemy) {
        return null;
    }
    return enemy;
};
const getEnemyTemplates = async (worldId: string) => {
    if(!worldId) throw new Error(`worldId does not exist`);

    const enemies = await enemyRepository.getEnemyTemplateByWorldId(worldId);
    if(!enemies) throw  new Error(`No enemies found for world ${worldId}`);

    return enemies;
};

const createEnemy = async ({ name, level, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, moveIds, battles }: Enemy): Promise<Enemy> => {
    const enemy = new Enemy({ name, level, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, moveIds, battles });
    return await enemyRepository.createEnemy(enemy);
};

const createEnemies = async (enemyArr: Enemy[]): Promise<Enemy[]> => {
    const newArr = await Promise.all(enemyArr.map(async (enemy) => {
        return await enemyRepository.createEnemy(enemy);
    }));
    return newArr;
};

// const mapBattleTypeToBattle = (battleType: BattleType): Battle => {
//     return {
//         ...battleType,
//         validate: () => {
//             return true;
//         }
//     };
// };

const updateEnemy = async (id: number, data: Partial<Enemy>): Promise<Enemy> => {
    const existingEnemy = await enemyRepository.getEnemyById(id);

    if (!existingEnemy) {
        throw new Error(`Enemy with id ${id} does not exist`)
    }

    // const battles = data.battles ? data.battles.map(mapBattleTypeToBattle) : existingEnemy.battles;

    return await enemyRepository.updateEnemy(id, {
        ...data,
        // battles,
        moveIds: data.moveIds ? data.moveIds : existingEnemy.moveIds,
    });
};

const deleteEnemy = async (id: number): Promise<void> => {
    const existingEnemy = await enemyRepository.getEnemyById(id);
    if (!existingEnemy) {
        throw new Error(`Enemy with id ${id} does not exist`)
    }

    await enemyRepository.deleteEnemy(id);
};

export {
    getAllEnemies,
    getEnemyTemplates,
    getEnemy,
    createEnemy,
    createEnemies,
    updateEnemy,
    deleteEnemy,
};
