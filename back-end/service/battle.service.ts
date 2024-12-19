import battleRepository from '../repository/battle.db';
import { Battle } from '../model/battle';
import { BattleType } from '../types';

const getAllBattles = async (): Promise<Battle[]> => {
    return await battleRepository.getBattles();
};

const getBattle = async (id: number): Promise<Battle | null> => {
    const battles = await battleRepository.getBattles();
    const battleExists = battles.some((battle) => battle.id === id);

    if (!battleExists) {
        throw new Error (`Battle with id ${id} does not exist`);
    }

    return await battleRepository.getBattleById(id);
};

const createBattle = async ({ turn, currentTurn, state, character, characterId }: BattleType): Promise<Battle> => {
    const battle = new Battle({ turn, currentTurn, state, character, characterId });
    return await battleRepository.createBattle(battle);
};

const updateBattle = async (id: number, data: Partial<BattleType>): Promise<Battle> => {
    const existingBattle = await battleRepository.getBattleById(id);

    if (!existingBattle) {
        throw new Error (`Battle with id ${id} does not exist`);
    }

    return await battleRepository.updateBattle(id, data);
};

const deleteBattle = async (id: number): Promise<void> => {
    const existingBattle = await battleRepository.getBattleById(id);

    if (!existingBattle) {
        throw new Error (`Battle with id ${id} does not exist`);
    }

    await battleRepository.deleteBattle(id);
};

export {
    getAllBattles,
    getBattle,
    createBattle,
    updateBattle,
    deleteBattle,
};
