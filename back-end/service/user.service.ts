import { UserType } from '../types';
import userRepository from '../repository/user.db';
import characterRepository from '../repository/character.db';
import { User } from '../model/user';
import encryptor from '../helpers/encryptor';
import decryptor from '../helpers/decryptor';
import { Character } from '../model/character';
import generateAccessToken from '../helpers/generateAccessToken';

const getAllUsers = async (): Promise<User[]> => {
    return await userRepository.getUsers();
};

const getUser = async (id: number): Promise<User | null> => {
    const users = await userRepository.getUserById(id);

    if (!users) {
        throw new Error('User not found');
    }

    return await users;
};

const getUserByEmail = async (email: string, password: string): Promise<{ token: string; user: Partial<User> }> => {
    const user = await userRepository.getUserByEmail(email);
    if(!user) throw new Error('User not found by email');

    const passIsValid = await decryptor(password, user.password);
    if(passIsValid) {
        const token = generateAccessToken(user.name, '4h');
        return {token: token, user: { id: user.id, name: user.name }};
    } else {
        throw new Error(`Password is not valid`);
    }
};

const getUserCharacter = async (id: number): Promise<Character | null> => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.characterId) {
        throw new Error('User characterId not found');
    }
    const character = await characterRepository.getCharacterById(user.characterId);
    if (!character) {
        throw new Error('Character not found');
    }
    return await character;
};

const createUser = async ({ name, email, password }: UserType): Promise<User> => {
    const emailExists = await userRepository.getUserByEmail(email);
    if (emailExists !== null) {
        throw new Error(`User with email already exists`);
    }

    const encryptedPassword = await encryptor(password);

    const user = new User({ name, email, password: encryptedPassword });
    return await userRepository.createUser(user);
};

const addCharacterToUser = async (userId: number, characterId: number): Promise<User> => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if(user.characterId !== undefined) {
        throw new Error('User already has a character');
    }

    return await userRepository.updateUser(userId, { characterId: characterId });
};

const deleteUser = async (id: number): Promise<void> => {
    const existingUser = await userRepository.getUserById(id);
    if (!existingUser) {
        throw new Error('User not found');
    }

    await userRepository.deleteUser(id);
};

export { getAllUsers, getUser, createUser, deleteUser, addCharacterToUser, getUserCharacter, getUserByEmail };
