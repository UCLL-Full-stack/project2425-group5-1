import { Character } from '../types';
import prisma from './database';

const getUsers = async () => {
    try {
        const users = await prisma.user.findMany({
            include: {
                character: true, // Include related characters
            },
        });
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};

const createUser = async (
    username: string,
    email: string,
    password: string,
    character?: Character
) => {
    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password,
                character: character
                    ? {
                        create: character,
                    }
                    : undefined,
            },
        });
        return user;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};

const userRepositry = {
    createUser,
    getUsers,
};

export default userRepositry;
