import { BattleType } from '../types';
import battleRepository from '../repository/battle.db';

// Get all battles
const getAllBattles = async (): Promise<BattleType[]> => {
    return await battleRepository.getBattles();
};

// Get a specific battle by ID
const getBattle = async (id: number): Promise<BattleType | null> => {
    return await battleRepository.getBattleById(id);
};

// Create a new battle
const createBattle = async (data: BattleType): Promise<BattleType> => {
    return await battleRepository.createBattle(data);
};

// Update a battle by ID
const updateBattle = async (id: number, data: Partial<BattleType>): Promise<BattleType> => {
    return await battleRepository.updateBattle(id, data);
};

// Delete a battle by ID
const deleteBattle = async (id: number): Promise<void> => {
    await battleRepository.deleteBattle(id);
};

export {
    getAllBattles,
    getBattle,
    createBattle,
    updateBattle,
    deleteBattle,
};
