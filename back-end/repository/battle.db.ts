import { Battle } from '@prisma/client';
import prisma from './database';
import { BattleType } from '../types';
const createBattle = async (battleStore: BattleType): Promise<Battle> => {
    try {
        const battle = await prisma.battle.create({
            data: battleStore,
        });
        return battle;
    } catch (error) {
        console.error(`Error creating battle:`, error);
        throw new Error('Failed to create battle');
    }
};

const battleRepository = {
    createBattle,
}

export default battleRepository;
