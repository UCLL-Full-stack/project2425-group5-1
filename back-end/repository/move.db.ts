import prisma from './database';
import { Move } from '../model/move';
import { MoveType } from '../types';

const getMoves = async (): Promise<MoveType[]> => {
    try {
        const movesPrisma = await prisma.move.findMany();
        return movesPrisma.map((movePrisma) => Move.from(movePrisma));
    } catch ( error ) {
        console.error('Error fetching move:', error);
        throw new Error('Failed to fetch moves');
    }
};

const getMoveById = async (id: number): Promise<MoveType | null> => {
    try {
        const movePrisma = await prisma.move.findUnique({ 
            where: { id } 
        });
        return movePrisma ? Move.from(movePrisma) : null;
    } catch ( error ) {
        console.error(`Error fetching move by id ${id}:`, error);
        throw new Error('Failed to fetch move');
    }
};

const createMove = async (data: MoveType): Promise<MoveType> => {
    try {
        const newMovePrisma = await prisma.move.create({
            data: {
                name: data.name,
                attack: data.attack,
                magicAttack: data.magicAttack,
                manaPoints: data.manaPoints,
                aoe: data.aoe,
            }
        });
        return Move.from(newMovePrisma);
    } catch ( error ) {
        console.error('Error creating move:', error);
        throw new Error('Failed to create move');
    }
};

const updateMove = async (id: number, data: Partial<MoveType>): Promise<MoveType> => {
    try {
        const updatedMovePrisma = await prisma.move.update({
            where: { id },
            data: {
                name: data.name,
                attack: data.attack,
                magicAttack: data.magicAttack,
                manaPoints: data.manaPoints,
                aoe: data.aoe,
            },
        });
        return Move.from(updatedMovePrisma);
    } catch ( error ) {
        console.error('Error updating move:', error);
        throw new Error('Failed to update move');
    }
};

const deleteMove = async (id: number): Promise<void> => {
    try {
        await prisma.move.delete({
            where: { id },
        });
    } catch ( error ) {
        console.error('Error deleting move:', error);
        throw new Error('Failed to delete move');
    }
};

const moveRepository = {
    getMoves,
    getMoveById,
    createMove,
    updateMove,
    deleteMove,
};

export default moveRepository;