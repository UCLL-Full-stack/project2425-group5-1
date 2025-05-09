import prisma from './database';
import { Character } from '../model/character';
import { JsonValue } from '@prisma/client/runtime/library';
import { CharacterType } from '../types';

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
        throw new Error(`Failed to fetch characters!\n\n\n${error}`);
    }
};

const getTemplateCharacters = async (): Promise<Character[] | null> => {
    try {
        const characterTemplate = await prisma.character.findMany({
            orderBy: {
                id: "asc"
            },
            take: 7,
            include: {
                moves: true,
            }
        });
        return characterTemplate;
    } catch(error) {
        throw new Error(`Failed to fetch character templates!\n\n\n${error}`);
    }
}

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
        throw new Error(`Failed to fetch character\n\n\n${error}`);
    }
};

const createCharacter = async ( username: string, chosenTemplateCharacter: Character): Promise<Character> => {
    try {
        const newCharacterPrisma = await prisma.character.create({
            data: {
                characterClass: chosenTemplateCharacter.characterClass,
                name: chosenTemplateCharacter.name,
                defense: chosenTemplateCharacter.defense,
                dexterity: chosenTemplateCharacter.dexterity,
                healthPoints: chosenTemplateCharacter.healthPoints,
                level: chosenTemplateCharacter.level,
                luck: chosenTemplateCharacter.luck,
                magic: chosenTemplateCharacter.magic,
                magicDefense: chosenTemplateCharacter.magicDefense,
                manaPoints: chosenTemplateCharacter.manaPoints,
                progress: chosenTemplateCharacter.progress,
                strength: chosenTemplateCharacter.strength,
                speed: chosenTemplateCharacter.speed,
                xp: chosenTemplateCharacter.xp,
                
                user: {
                    connect: {
                        name: username,
                    }
                },
                moves: {
                    connect: chosenTemplateCharacter.moves.map((move) => ({
                        id: move.id,
                    }))
                }
            },
            include: {
                user: false,
                moves: true,
            },
        });

        return newCharacterPrisma;
    } catch (error) {
        throw new Error(`Failed to create character with name: ${name}\n\n\n${error}`);
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
                moves: {
                    connect: data.moves?.map(m => ({ id: m.id }))
                }
            },
            include: {
                moves: true,
            },
        });
        return Character.from(updatedCharacter);
    } catch (error) {
        console.error(`Error updating character with id ${id}:`, error);
        throw new Error('Failed to update character');
    }
};

const getCharacterByUserName = async (name: string): Promise<Character | null> => {
    try {
        const character = await prisma.character.findFirst({
            where: {
                user: {
                    is: {
                        name: name,
                    }
                }
            },
            include: {
                battle: true,
                moves: true,
            }
        })
        return character;
    } catch (error) {
        throw new Error(`Error getting character with name: ${name}\n\n\n${error}`);
    }
}

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
    getCharacterByUserName,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    getTemplateCharacters,
};
