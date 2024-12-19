import prisma from './database';
import { Battle } from '../model/battle';
import { BattleType } from '../types';

const getBattles = async (): Promise<Battle[]> => {
    try {
        const battlesPrisma = await prisma.battle.findMany({
            include: {
                character: true,
            }
        });
        return battlesPrisma.map((battlePrisma) => Battle.from(battlePrisma));
    } catch (error) {
        console.error('Error fetching battles:', error);
        throw new Error('Failed to fetch battles');
    }
};

const getBattleById = async (id: number): Promise<Battle | null> => {
    try {
        const battlePrisma = await prisma.battle.findUnique({
            where: { id },
            include: {
                character: true,
            }
        });
        return battlePrisma ? Battle.from(battlePrisma) : null;
    } catch (error) {
        console.error(`Error fetching battle with id ${id}:`, error);
        throw new Error('Failed to fetch battle');
    }
};
const createBattle = async ({ turn, currentTurn, state, characterId }: Battle): Promise<Battle> => {
    try {
        console.log("Received characterId:", characterId);  // Log de waarde van characterId
        if (!characterId) {
            throw new Error("Character ID is required to create a battle");
        }

        const newBattlePrisma = await prisma.battle.create({
            data: {
                turn,
                currentTurn,
                state,
                character: {
                    connect: {
                        id: characterId,  // Dit verbindt de bestaande character met de battle
                    }
                }
            },
            include: {
                character: true,
            },
        });
        

        return Battle.from(newBattlePrisma);
    } catch (error) {
        console.error('Error creating battle:', error);
        throw new Error('Failed to create battle');
    }
};




const updateBattle = async (id: number, data: Partial<BattleType>): Promise<Battle> => {
    try {
        const updatedBattlePrisma = await prisma.battle.update({
            where: { id },
            data: {
                turn: data.turn,
                currentTurn: data.currentTurn,
                state: data.state,
            },
            include: {
                character: true,
            }
        });
        return Battle.from(updatedBattlePrisma);
    } catch (error) {
        console.error(`Error updating battle with id ${id}:`, error);
        throw new Error('Failed to update battle');
    }
};

const deleteBattle = async (id: number): Promise<void> => {
    try {
        await prisma.battle.delete({
            where: { id },
            include: { 
                character: true,
            }
        });
    } catch (error) {
        console.error(`Error deleting battle with id ${id}:`, error);
        throw new Error('Failed to delete battle');
    }
};

const battleRepository = {
    getBattles,
    getBattleById,
    createBattle,
    updateBattle,
    deleteBattle,
};

export default battleRepository;