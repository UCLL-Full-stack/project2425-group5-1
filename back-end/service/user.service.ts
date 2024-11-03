import { Request, Response } from 'express';
import { User } from '../types';

/**
 * GET
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const user: User = {
            id: 1,
            email: 'johndoe@gmail.com',
            password: 'password123',
            username: 'johndoe',
        };
        res.send(user);
    } catch (error: unknown) {
        let msg = 'unknown error';
        if (error instanceof Error) {
            msg = error.message;
        }
        res.status(400).json({ status: 'error', errorMessage: msg });
    }
};

/**
 * POST
 */
