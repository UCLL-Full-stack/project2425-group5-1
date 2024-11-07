import userRepositry from '../repository/user.db';
import { Character } from '../types';

/**
 * GET
 */
const getUsers = async () => {
    return userRepositry.getUsers();
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
    return userRepositry.createUser(username, email, password, character);
};

const userService = {
    createUser,
    getUsers,
};

export default userService;
