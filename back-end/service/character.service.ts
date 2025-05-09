import characterRepository from '../repository/character.db';
import { Character } from '../model/character';
import { CharacterType } from '../types';
import userRepository from '../repository/user.db';

const getTemplateCharacters = async (): Promise<Character[]> => {
    const characters = await characterRepository.getTemplateCharacters();
    if(!characters) {
        throw new Error(`Something went wrong with fetching the character templates!\n\n${characters}`);
    }
    return characters;
};

const getCharacter = async (username: string): Promise<Character | null> => {
    const character = await characterRepository.getCharacterByUserName(username);
    console.log(character, username);

    if (!character) {
        throw new Error(`User with name ${username} does not have a character!`);
    }

    return character;
};

const createCharacter = async (username: string, characterClass: string): Promise<Character> => {
        // const existingCharacter = await characterRepository.getCharacterByUserName(username);
        // console.log(existingCharacter);
        // if(!existingCharacter || existingCharacter) {
        //     throw new Error(`User with username ${username} does not exist or already has a character!`);
        // }

        const templateChar = await characterRepository.getTemplateCharacters();
        if(!templateChar) throw new Error(`Template characters not found!`);

        const chosenTemplateChar = templateChar.find(char => char.characterClass === characterClass);
        if(!chosenTemplateChar) throw new Error(`Chosen character class does not exist!`);

        return await characterRepository.createCharacter(username, chosenTemplateChar);
};

const updateCharacter = async (id: number, data: Partial<Character>): Promise<Character> => {
    const existingCharacter = await characterRepository.getCharacterById(id);
    if (!existingCharacter) {
        throw new Error(`Character with id ${id} does not exist`);
    }

    return await characterRepository.updateCharacter(id, {
        moves: data.moves,
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