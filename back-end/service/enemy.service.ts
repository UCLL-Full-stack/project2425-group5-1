import enemyRepository from '../repository/enemy.db';
import { Enemy } from '../model/enemy';

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

const createEnemy = async ({ name, level, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, moveIds }: Enemy): Promise<Enemy> => {
    const enemy = new Enemy({ name, level, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, moveIds });
    return await enemyRepository.createEnemy(enemy);
};

const createEnemies = async (enemyArr: Enemy[]): Promise<Enemy[]> => {
    const newArr = await Promise.all(enemyArr.map(async (enemy) => {
        return await enemyRepository.createEnemy(enemy);
    }));
    return newArr;
};

const updateEnemy = async (id: number, data: Partial<Enemy>): Promise<Enemy> => {
    const existingEnemy = await enemyRepository.getEnemyById(id);

    if (!existingEnemy) {
        throw new Error(`Enemy with id ${id} does not exist`)
    }

    return await enemyRepository.updateEnemy(id, {
        ...data,
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

const EnemyService =  {
    getAllEnemies,
    getEnemyTemplates,
    getEnemy,
    createEnemy,
    createEnemies,
    updateEnemy,
    deleteEnemy,
};

export default EnemyService;
