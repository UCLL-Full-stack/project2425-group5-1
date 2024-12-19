import characterRepository from '../repository/character.db';
import { Character } from '../model/character';
import { CharacterType } from '../types';

const getAllCharacters = async (): Promise<Character[]> => {
    return await characterRepository.getCharacters();
};

const getCharacter = async (id: number): Promise<Character | null> => {
    const characters = await characterRepository.getCharacters();
    const characterExists = characters.some((character) => character.id === id );

    if (!characterExists) {
        throw new Error(`Character with id ${id} does not exist`);
    }

    return await characterRepository.getCharacterById(id);
};

const createCharacter = async ({ name, level, xp, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, progress, characterClass }: CharacterType): Promise<Character> => {
    const character = new Character({ name, level, xp, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, progress, characterClass });
    return await characterRepository.createCharacter(character);
};

const updateCharacter = async (id: number, data: Partial<CharacterType>): Promise<Character> => {
    const existingCharacter = await characterRepository.getCharacterById(id);
    if (!existingCharacter) {
        throw new Error(`Character with id ${id} does not exist`);
    }

    return await characterRepository.updateCharacter(id, data);
};

const deleteCharacter = async (id: number): Promise<void> => {
    const existingCharacter = await characterRepository.getCharacterById(id);
    if (!existingCharacter) {
        throw new Error(`Character with id ${id} does not exist`);
    }
    await characterRepository.deleteCharacter(id);
};

export {
    getAllCharacters,
    getCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};