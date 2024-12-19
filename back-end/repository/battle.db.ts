import prisma from './database';
import { Battle } from '../model/battle';
import { BattleType } from '../types';

const getBattles = async (): Promise<BattleType[]> => {
    try {
        const battlesPrisma = await prisma.battle.findMany({
            include: {
                character: true,
                enemies: true,
            }
        });
        return battlesPrisma.map((battlePrisma) => Battle.from(battlePrisma));
    } catch (error) {
        console.error('Error fetching battles:', error);
        throw new Error('Failed to fetch battles');
    }
};

const getBattleById = async (id: number): Promise<BattleType | null> => {
    try {
        const battlePrisma = await prisma.battle.findUnique({
            where: { id },
            include: {
                character: true,
                enemies: true,
            }
        });
        return battlePrisma ? Battle.from(battlePrisma) : null;
    } catch (error) {
        console.error(`Error fetching battle with id ${id}:`, error);
        throw new Error('Failed to fetch battle');
    }
};

const createBattle = async (data: BattleType): Promise<BattleType> => {
    try {
        const newBattlePrisma = await prisma.battle.create({
            data: {
                turn: data.turn,
                currentTurn: data.currentTurn,
                state: data.state,
                character: {
                    connect: { id: data.characterId },
                },
                enemies: {
                    connect: data.enemies.map((enemy) => ({ id: enemy.id })),
                },
            },
            include: {
                character: true,
                enemies: true,
            }
        });
        return Battle.from(newBattlePrisma);
    } catch (error) {
        console.error('Error creating battle:', error);
        throw new Error('Failed to create battle');
    }
};

const updateBattle = async (id: number, data: Partial<BattleType>): Promise<BattleType> => {
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
                enemies: true,
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
                enemies: true,
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