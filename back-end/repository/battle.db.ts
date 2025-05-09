import prisma from './database';
import { BattleType } from '../types';
import { Battle } from '../model/battle';
import { Character } from '../model/character';


const getExistingBattle = async (character: Character): Promise<Battle | null> => {
    try {
        const battle = await prisma.battle.findFirst({
            where: {
                characterId: character.id
            },
            include: {
                enemies: {
                    include: {
                        moves: true,
                        elements: true,
                    },
                },
                character: {
                    include: {
                        moves: true,
                    }
                }
            }
        });

        if(!battle) return null;
        return battle;
    } catch (error) {
        console.error(`Error finding existing battle:`, error);
        throw new Error('Failed to find existing battle');
    }
};

const createBattle = async (battleStore: BattleType): Promise<Battle> => {
    try {
        if(!battleStore.enemies) throw new Error(`Enemies are required to create a new battle!`);

        const battle = await prisma.battle.create({
            data: {
                turnCount: battleStore.turnCount,
                currentTurn: battleStore.currentTurn,
                reward: battleStore.reward,
                characterId: battleStore.characterId,
                enemies: {
                    connect: battleStore.enemies.map(enemy => ({id: enemy.id}))
                }
            },
            include: {
                enemies: {
                    include: {
                        moves: true,
                        elements: true,
                    },
                },
                character: {
                    include: {
                        moves: true,
                    }
                }
            }
        })

        return battle;
    } catch(error) {
        throw new Error(`Failed to create new battle!\n\n\n${error}`);
    }
};

const battleRepository = {
    getExistingBattle,
    createBattle,
}

export default battleRepository;
