import { EnemyType } from '../types';
import enemyRepository from '../repository/enemy.db';

// Get all enemies
const getAllEnemies = async (): Promise<EnemyType[]> => {
    return await enemyRepository.getEnemies();
};

// Get a specific enemy by ID
const getEnemy = async (id: number): Promise<EnemyType | null> => {
    return await enemyRepository.getEnemyById(id);
};

// Create a new enemy
const createEnemy = async (data: EnemyType): Promise<EnemyType> => {
    return await enemyRepository.createEnemy(data);
};

// Update a enemy by ID
const updateEnemy = async (id: number, data: Partial<EnemyType>): Promise<EnemyType> => {
    return await enemyRepository.updateEnemy(id, data);
};

// Delete a enemy by ID
const deleteEnemy = async (id: number): Promise<void> => {
    await enemyRepository.deleteEnemy(id);
};

export {
    getAllEnemies,
    getEnemy,
    createEnemy,
    updateEnemy,
    deleteEnemy,
};
