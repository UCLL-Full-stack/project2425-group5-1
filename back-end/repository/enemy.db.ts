import prisma from './database';
import { Enemy } from '../model/enemy';

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
        console.log('Error fetching enemy by id:', error);
        throw new Error('Failed to fetch enemy by id');
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
                ? { connect: data.battles.map((battle) => ({ id: battle.id })) }
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
    createEnemy,
    updateEnemy,
    deleteEnemy,
};

export default enemyRepository;