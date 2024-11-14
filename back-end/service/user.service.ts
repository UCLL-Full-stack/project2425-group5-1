import userRepositry from '../repository/user.db';
import User from '../model/user';
import { UserInput } from '../types';

/**
 * GET
 */
const getUsers = async (): Promise<User[]> => {
    try {
        return await userRepositry.getUsers();
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Unable to fetch users.');
    }
};


const createUser = async ({ name, email, password }: UserInput): Promise<User> => {
    try {
        // // Validate name
        // if (typeof name !== 'string' || name.trim() === '') {
        //     throw new Error('Invalid user name');
        // }

        // // Validate email
        // if (typeof email !== 'string' || email.trim() === '') {
        //     throw new Error('Invalid email address');
        // }

        // // Validate password
        // if (typeof password !== 'string' || password.trim() === '') {
        //     throw new Error('Invalid password');
        // }

        const newUser = new User({ name, email, password });

        return await userRepositry.createUser(name, email, password);

    } catch (error) {
        console.error('Error in createUser service:', error);
        throw new Error('Unable to create user.');
    }
};


const userService = {
    createUser,
    getUsers,
};

export default userService;
