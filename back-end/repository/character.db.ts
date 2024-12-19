import prisma from './database';
import { Character } from '../model/character';

const getCharacters = async (): Promise<Character[]> => {
    try {
        const charactersPrisma = await prisma.character.findMany({
            include: {
                user: true,
                moves: true,
            },
        });
        return charactersPrisma.map((characterPrisma) => Character.from(characterPrisma));
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw new Error('Failed to fetch characters');
    }
};

const getCharacterById = async (id: number): Promise<Character | null> => {
    try {
        const characterPrisma = await prisma.character.findUnique({
            where: { id },
            include: {
                user: true,
                moves: true,
            },
        });
        return characterPrisma ? Character.from(characterPrisma) : null;
    } catch (error) {
        console.error('Error fetching character:', error);
        throw new Error('Failed to fetch character');
    }
};

const createCharacter = async ({
    name,
    level,
    xp,
    strength,
    speed,
    magic,
    dexterity,
    healthPoints,
    manaPoints,
    luck,
    defense,
    magicDefense,
    progress,
    characterClass,
    moveIds,
}: Character): Promise<Character> => {
    try {
        if (!moveIds || moveIds.length === 0) {
            throw new Error('Move IDs must be provided');
        }

        const newCharacterPrisma = await prisma.character.create({
            data: {
                name,
                level,
                xp,
                strength,
                speed,
                magic,
                dexterity,
                healthPoints,
                manaPoints,
                luck,
                defense,
                magicDefense,
                progress,
                characterClass,
                moves: {
                    connect: moveIds.map((moveId: number) => ({ id: moveId })),
                },
            },
            include: {
                user: true,
                moves: true,
            },
        });

        return Character.from(newCharacterPrisma);
    } catch (error) {
        console.error('Error creating character:', error);
        throw new Error(`Failed to create character with name ${name}`);
    }
};


const updateCharacter = async (
    id: number,
    data: Partial<Character>
): Promise<Character> => {
    try {
        const updatedCharacter = await prisma.character.update({
            where: { id },
            data: {
                name: data.name,
                level: data.level,
                xp: data.xp,
                strength: data.strength,
                speed: data.speed,
                magic: data.magic,
                dexterity: data.dexterity,
                healthPoints: data.healthPoints,
                manaPoints: data.manaPoints,
                luck: data.luck,
                defense: data.defense,
                magicDefense: data.magicDefense,
                progress: data.progress,
                characterClass: data.characterClass,
                moves: data.moveIds
                    ? { 
                        set: [],
                        connect: data.moveIds.map(id => ({ id }))
                    }
                    : undefined,
            },
            include: {
                user: true,
                moves: true,
            },
        });
        return Character.from(updatedCharacter);
    } catch (error) {
        console.error(`Error updating character with id ${id}:`, error);
        throw new Error('Failed to update character');
    }
};

const deleteCharacter = async (id: number): Promise<void> => {
    try {
        await prisma.character.delete({
            where: { id },
        });
    } catch (error) {
        console.error(`Error deleting character with id ${id}:`, error);
        throw new Error('Failed to delete character');
    }
};

export default {
    getCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};
