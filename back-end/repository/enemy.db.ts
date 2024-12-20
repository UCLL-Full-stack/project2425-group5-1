import prisma from './database';
import { Enemy } from '../model/enemy';
import { MoveType, worldId } from '../types';
import moveRepository from './move.db';
import { Move } from '../model/move';

const getEnemies = async (): Promise<Enemy[]> => {
    try {
        const enemiesPrisma = await prisma.enemy.findMany({
            include: {
                moves: true,
                battles: true,
            }
        });
        return enemiesPrisma.map((enemyPrisma) => Enemy.from(enemyPrisma));
    } catch ( error ) {
        console.log('Error fetching enemies:', error);
        throw new Error('Failed to fetch enemies');
    }
};

const enemyTemplatesByWorld: {[key in string]: string[]} = {
    "1": ["slime", "skeleton",],
    "2": ["skeleton",],
    "3": [],
    "4": [],
    "5": [],
    "6": [],
    "7": [],
    "8": [],
    "9": [],
    "10": [],
}
const getEnemyTemplateByWorldId = async (worldId: string): Promise<Enemy[]> => {
    try {
        if (!enemyTemplatesByWorld.hasOwnProperty(worldId)) throw new Error(`World id does not exist in templates`);

        const enemyArr = enemyTemplatesByWorld[worldId];

        const enemyTemplate: Enemy[] = [];

        await Promise.all(enemyArr.map(async name => {
            const enemyPrisma = await prisma.enemy.findFirst({
                where: { name: name },
                include: {
                    moves: true,
                    battles: true,
                }
            });
            if(enemyPrisma) {
                let newMoves: Move[] = []
                enemyPrisma.moves.map(async move => {
                    const moveStats = await moveRepository.getMoveById(move.id);
                    if(!moveStats) return;
                    newMoves.push(moveStats);
                })
                console.log(newMoves);
                enemyTemplate.push(Enemy.from(enemyPrisma));
            }
        }));

        return enemyTemplate;
    } catch (error) {
        console.error(`Error getting template enemies by world id:`, error);
        throw new Error('Failed to get template enemies by worldId');
    }
};

const getEnemyById = async (id: number): Promise<Enemy | null> => {
    try {
        const enemyPrisma = await prisma.enemy.findUnique({
            where: { id },
            include: {
                moves: true,
                battles: true,
            }
        });
        return enemyPrisma ? Enemy.from(enemyPrisma) : null;
    } catch ( error ) {
        console.error(`Error creating user:`, error);
        throw new Error('Failed to create user');
    }
};

const createEnemy = async ({ name, level, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, moveIds, battles}: Enemy): Promise<Enemy> => {
    try {
        if (!moveIds || moveIds.length === 0) {
            throw new Error('Move IDs must be provided');
        }
        const newEnemyPrisma = await prisma.enemy.create({
            data: {
                name,
                level,
                strength,
                speed,
                magic,
                dexterity,
                healthPoints,
                manaPoints,
                luck,
                defense,
                magicDefense,
                moves: {
                    connect: moveIds.map((moveId: number) => ({ id: moveId })),
                },

                battles: {
                    connect: battles.map((battle) => ({ id: battle.id })),
                }
            },
            include: {
                moves: true,
                battles: true,
            }
        });
        return Enemy.from(newEnemyPrisma);
    } catch ( error ) {
        console.log('Error creating enemy:', error);
        throw new Error('Failed to create enemy');
    }
};

const updateEnemy = async (id: number, data: Partial<Enemy>): Promise<Enemy> => {
    try {
        const updatedEnemyPrisma = await prisma.enemy.update({
            where: {id},
            data: {
                name: data.name,
                level: data.level,
                strength: data.strength,
                speed: data.speed,
                magic: data.magic,
                dexterity: data.dexterity,
                healthPoints: data.healthPoints,
                manaPoints: data.manaPoints,
                luck: data.luck,
                defense: data.defense,
                magicDefense: data.magicDefense,
                moves: data.moveIds
                    ? {
                        set: [],
                        connect: data.moveIds.map(id => ({ id }))
                    }
                    : undefined,

                battles: data.battles
                ? { connect: data.battles }
                : undefined,
            },
            include: {
                moves: true,
                battles: true,
            }
        });
        return Enemy.from(updatedEnemyPrisma);
    } catch ( error ) {
        console.log('Error updating enemy:', error);
        throw new Error('Failed to update enemy');
    }
};

const deleteEnemy = async (id: number): Promise<void> => {
    try {
        await prisma.enemy.delete({
            where: { id }
        });
    } catch ( error ) {
        console.log('Error deleting enemy:', error);
        throw new Error('Failed to delete enemy');
    }
};

const enemyRepository = {
    getEnemies,
    getEnemyById,
    getEnemyTemplateByWorldId,
    createEnemy,
    updateEnemy,
    deleteEnemy,
};

export default enemyRepository;