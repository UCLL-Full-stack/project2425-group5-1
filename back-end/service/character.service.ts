import characterRepository from '../repository/character.db';
import { Character } from '../model/character';
import { CharacterType } from '../types';

const getTemplateCharacters = async (): Promise<Character[]> => {
    const characters = await characterRepository.getCharacters();
    const characterTemplates = [];
    for(let i = 0 ; i < 7 ; i++) {
        characterTemplates.push(characters[i]);
    }
    return characterTemplates
};

const getCharacter = async (id: number): Promise<Character | null> => {
    const characters = await characterRepository.getCharacters();
    const characterExists = characters.some((character) => character.id === id );

    if (!characterExists) {
        throw new Error(`Character with id ${id} does not exist`);
    }

    return await characterRepository.getCharacterById(id);
};

const createCharacter = async ({ name, level, xp, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, progress, characterClass, moveIds }: CharacterType): Promise<Character> => {
    const character = new Character({ name, level, xp, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, progress, characterClass, moveIds });
    return await characterRepository.createCharacter(character);
};

const updateCharacter = async (id: number, data: Partial<CharacterType>): Promise<Character> => {
    const existingCharacter = await characterRepository.getCharacterById(id);
    if (!existingCharacter) {
        throw new Error(`Character with id ${id} does not exist`);
    }

    return await characterRepository.updateCharacter(id, {
        ...data,
        moveIds: data.moveIds ? data.moveIds : existingCharacter.moveIds,
    });
};

const deleteCharacter = async (id: number): Promise<void> => {
    const existingCharacter = await characterRepository.getCharacterById(id);
    if (!existingCharacter) {
        throw new Error(`Character with id ${id} does not exist`);
    }
    await characterRepository.deleteCharacter(id);
};

export {
    getTemplateCharacters,
    getCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};