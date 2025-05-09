import prisma from './database';
import { Enemy } from '../model/enemy';
import { EnemyType } from '../types';

const getEnemies = async (): Promise<Enemy[]> => {
    try {
        const enemiesPrisma = await prisma.enemy.findMany({
            include: {
                moves: true,
            }
        });
        return enemiesPrisma;
    } catch ( error ) {
        throw new Error(`Failed to fetch enemies\n\n\n${error}`);
    }
};

const getEnemiesByWorld = async (worldNumber: number): Promise<Enemy[]> => {
    try {
        const enemiesPrisma = await prisma.enemy.findMany({
            where: {
                world: worldNumber,
                AND: {
                    isTemplate: true,
                }
            },
            include: {
                elements: true,
                moves: true,
            }
        });

        return enemiesPrisma;
    } catch (error) {
        throw new Error(`Failed to fetch enemies by world number\n\n\n${error}`);
    }
}

const getEnemyById = async (id: number): Promise<Enemy | null> => {
    try {
        const enemyPrisma = await prisma.enemy.findUnique({
            where: { id },
            include: {
                moves: true,
            }
        });
        return enemyPrisma ? enemyPrisma : null;
    } catch ( error ) {
        console.error(`Error creating user:`, error);
        throw new Error('Failed to create user');
    }
};

const createEnemy = async (newEnemy: EnemyType): Promise<Enemy> => {
    try {
        if(!newEnemy.elements || !newEnemy.moves) throw new Error(`elements or moves missing from enemy!`);
        
        const enemy = prisma.enemy.create({
            data: {
                name: newEnemy.name,
                strength: newEnemy.strength,
                speed: newEnemy.speed,
                defense: newEnemy.defense,
                healthPoints: newEnemy.healthPoints,
                manaPoints: newEnemy.manaPoints,
                magic: newEnemy.magic,
                dexterity: newEnemy.dexterity,
                luck: newEnemy.luck,
                magicDefense: newEnemy.magicDefense,
                world: newEnemy.world,
                isBoss: newEnemy.isBoss,
                elements: {
                    connect: newEnemy.elements.map(e => ({ id: e.id }))
                },
                moves: {
                    connect: newEnemy.moves.map(m => ({ id: m.id }))
                },
            }
        });

        return enemy;
    } catch(error) {
        throw new Error(`Failed to create new enemy\n\n\n${error}`);
    }
}

// const updateEnemy = async (id: number, data: Partial<Enemy>): Promise<Enemy> => {
//     try {
//         const updatedEnemyPrisma = await prisma.enemy.update({
//             where: {id},
//             data: {
//                 name: data.name,
//                 level: data.level,
//                 strength: data.strength,
//                 speed: data.speed,
//                 magic: data.magic,
//                 dexterity: data.dexterity,
//                 healthPoints: data.healthPoints,
//                 manaPoints: data.manaPoints,
//                 luck: data.luck,
//                 defense: data.defense,
//                 magicDefense: data.magicDefense,
//                 moves: data.moveIds
//                     ? {
//                         set: [],
//                         connect: data.moveIds.map(id => ({ id }))
//                     }
//                     : undefined,
//             },
//             include: {
//                 moves: true,
//             }
//         });
//         return Enemy.from(updatedEnemyPrisma);
//     } catch ( error ) {
//         console.log('Error updating enemy:', error);
//         throw new Error('Failed to update enemy');
//     }
// };

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
    createEnemy,
    // updateEnemy,
    deleteEnemy,
    getEnemiesByWorld,
};

export default enemyRepository;