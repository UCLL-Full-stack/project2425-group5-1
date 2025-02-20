import prisma from './database';
import { User } from '../model/user';
import { UserType } from '../types';

const getUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await prisma.user.findMany({});
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await prisma.user.findUnique({
            where: { id },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw new Error('Failed to fetch user');
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await prisma.user.findUnique({
            where: { email },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(`Error fetching user with email ${email}:`, error);
        throw new Error('Failed to fetch user by email');
    }
};

const createUser = async ({ name, email, password }: User): Promise<User> => {
    try {
        const createdUser = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
        return User.from(createdUser);
    } catch (error) {
        console.error(`Error creating user:`, error);
        throw new Error('Failed to create user');
    }
};

const updateUser = async (id: number, data: Partial<UserType>): Promise<User> => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...data,
                characterId: data.characterId,
            },
        });
        return User.from(updatedUser);
    } catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
        throw new Error('Failed to update user');
    }
};

const deleteUser = async (id: number): Promise<void> => {
    try {
        const userWithCharacter = await prisma.user.findUnique({
            where: { id },
            include: {
                character: true,
            },
        });

        if (!userWithCharacter) {
            throw new Error(`User with id ${id} not found`);
        }

        await prisma.user.delete({
            where: { id },
        });

        if (userWithCharacter.character) {
            await prisma.character.delete({
                where: { id: userWithCharacter.character.id },
            });
            console.log(`Character with id ${userWithCharacter.character.id} deleted`);
        }
        console.log(`User with id ${id} deleted successfully`);
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        throw new Error('Failed to delete user');
    }
};

const userRepository = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail,
};

export default userRepository;
