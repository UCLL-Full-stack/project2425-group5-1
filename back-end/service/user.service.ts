import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

/**
 * GET
 */
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                character: true, // Include the related characters
            },
        });
        res.send(users);
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
export const createUser = async (req: Request, res: Response) => {
    const { username, email, password, character } = req.body;
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password,
            character,
        },
    });
    res.json({ user: user });
};
