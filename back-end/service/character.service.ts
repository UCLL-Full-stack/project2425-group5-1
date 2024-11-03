import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

/**
 * GET
 */
export const getCharacters = async () => {
    try {
        return await prisma.character.findMany();
    } catch (error) {
        console.error(error);
    }
};

/**
 * POST
 */
export const createCharacter = async (req: Request, res: Response) => {
    const {
        name,
        level,
        xp,
        strength,
        speed,
        magic,
        dexterity,
        healthPoints,
        manaPoints,
        luck,
        defense,
        magicDefense,
        progress,
        user,
    } = req.body;

    const character = await prisma.character.create({
        data: {
            name,
            level,
            xp,
            strength,
            speed,
            magic,
            dexterity,
            healthPoints,
            manaPoints,
            luck,
            defense,
            magicDefense,
            progress,
            user,
        },
    });

    res.json(character);
};
