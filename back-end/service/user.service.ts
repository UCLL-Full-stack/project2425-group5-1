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

const getUser = async (id: number): Promise<User> => {
    const users = await userRepository.getUserById(id);

    if (!users) {
        throw new Error('User not found');
    }

    return users;
};

const getUserByName = async (name: string): Promise<User> => {
    const user = await userRepository.getUserByName(name);
    if(!user) throw new Error('User not found by name');

    return user;
}

const getUserByEmail = async (email: string, password: string): Promise<{ token: string; user: Partial<UserType> }> => {
    const user = await userRepository.getUserByEmail(email);
    if(!user) throw new Error('User not found by email');

    const passIsValid = await decryptor(password, user.password);
    if(passIsValid) {
        const token = generateAccessToken(user.name, '4h');
        return {token: token, user: { id: user.id, name: user.name, characterId: user.character?.id }};
    } else {
        throw new Error(`Password is not valid`);
    }
};

const getUserCharacter = async (id: number): Promise<Character> => {
    const user = await userRepository.getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    if (!user.character) {
        throw new Error('User character not found');
    }
    const character = await characterRepository.getCharacterById(user.character.id);
    if (!character) {
        throw new Error('Character not found');
    }
    return character;
};

const createUser = async ({ name, email, password }: UserType): Promise<User> => {
    const emailExists = await userRepository.getUserByEmail(email);
    if (emailExists !== null) {
        throw new Error(`User with email already exists`);
    }

    const encryptedPassword = await encryptor(password);

    const user: UserType = { name, email, password: encryptedPassword };
    return await userRepository.createUser(user);
};

const deleteUser = async (id: number): Promise<void> => {
    const existingUser = await userRepository.getUserById(id);
    if (!existingUser) {
        throw new Error('User not found');
    }

    await userRepository.deleteUser(id);
};

export {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    getUserCharacter,
    getUserByEmail,
    getUserByName
};
