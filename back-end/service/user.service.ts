import { UserType } from '../types';
import userRepository from '../repository/user.db';
import characterRepository from '../repository/character.db';
import { User } from '../model/user';

const getAllUsers = async (): Promise<User[]> => {
    return await userRepository.getUsers();
};

const getUser = async (id: number): Promise<User | null> => {
    const users = await userRepository.getUsers();
    const userExists = users.some((user) => user.id === id);
    
    if (!userExists) {
        throw new Error('User not found');
    }

    return await userRepository.getUserById(id);
};

const createUser = async ({ name, email, password, characterId}: UserType): Promise<User> => {
    if (!characterId) {
        throw new Error('Character id is required');
    }

    const character = await characterRepository.getCharacterById( characterId );
    if (!character) {
        throw new Error(`Character with id ${characterId} not found`);
    }

    const user = new User({ name, email, password, characterId });
    return await userRepository.createUser(user);
};

const updateUser = async (id: number, data: Partial<UserType>): Promise<User> => {
    const existingUser = await userRepository.getUserById(id);
    if (!existingUser) {
        throw new Error('User not found');
    }

    return await userRepository.updateUser(id, data);
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
    updateUser,
    deleteUser,
};