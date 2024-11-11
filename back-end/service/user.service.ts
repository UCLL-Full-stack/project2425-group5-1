import userRepositry from '../repository/user.db';
import { Character } from '../types';

/**
 * GET
 */
const getUsers = async () => {
    try {
        return await userRepositry.getUsers();
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Unable to fetch users.');
    }
};

/**
 * POST
 */
const createUser = async (
    username: string,
    email: string,
    password: string,
    character?: Character
) => {
    try {
        return await userRepositry.createUser(username, email, password, character);
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Unable to create user.');
    }
    };

const userService = {
    createUser,
    getUsers,
};

export default userService;
