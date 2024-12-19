import prisma from './database';
import { Enemy } from '../model/enemy';
import { EnemyType } from '../types';

const getEnemies = async (): Promise<EnemyType[]> => {
    try {
        const enemiesPrisma = await prisma.enemy.findMany({
            include: {
                moves: true,
            }
        });
        return enemiesPrisma.map((enemyPrisma) => Enemy.from(enemyPrisma));
    } catch ( error ) {
        console.log('Error fetching enemies:', error);
        throw new Error('Failed to fetch enemies');
    }
};

const getEnemyById = async (id: number): Promise<EnemyType | null> => {
    try {
        const enemyPrisma = await prisma.enemy.findUnique({
            where: { id },
            include: {
                moves: true,
            }
        });
        return enemyPrisma ? Enemy.from(enemyPrisma) : null;
    } catch ( error ) {
        console.log('Error fetching enemy by id:', error);
        throw new Error('Failed to fetch enemy by id');
    }
};

const createEnemy = async (data: EnemyType): Promise<EnemyType> => {
    try {
        const newEnemyPrisma = await prisma.enemy.create({
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
                moves: {
                    connect: data.moves.map((move) => ({ id: move.id })),
                }
            },
            include: {
                moves: true,
            }
        });
        return Enemy.from(newEnemyPrisma);
    } catch ( error ) {
        console.log('Error creating enemy:', error);
        throw new Error('Failed to create enemy');
    }
};

const updateEnemy = async (id: number, data: Partial<EnemyType>): Promise<EnemyType> => {
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
                moves: data.moves
                    ? { connect: data.moves.map((move) => ({ id:move.id })) }
                    : undefined,
            },
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