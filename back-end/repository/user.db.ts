import User from '../model/user';
import { UserInput } from '../types';
import prisma from './database';

const getUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await prisma.user.findMany({
            include: {
                character: true,
            },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
};


const createUser = async (
    name: string,
    email: string,
    password: string,
) => {
    try {
        const userPrisma = await prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
        return new User(userPrisma);
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};


// const createUser = async (userData: UserInput): Promise<User> => {
//     try {
//         const userPayload = {
//             name: userData.name,
//             email: userData.email,
//             password: userData.password,
//             }

//         const createdUser = await prisma.user.create({
//             data: userPayload,
//         });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         throw new Error('Failed to create user');
//     }
// };

const userRepositry = {
    createUser,
    getUsers,
};

export default userRepositry;
