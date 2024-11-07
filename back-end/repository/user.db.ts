import { Character } from '../types';
import prisma from './database';

const getUsers = async () => {
    const users = await prisma.user.findMany({
        include: {
            character: true, // Include the related characters
        },
    });
    return users;
};

const createUser = async (
    username: string,
    email: string,
    password: string,
    character?: Character
) => {
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
};

const userRepositry = {
    createUser,
    getUsers,
};

export default userRepositry;
