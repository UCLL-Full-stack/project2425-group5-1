import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

/**
 * GET
 */
export const getCharacters = async (req: Request, res: Response) => {
    try {
        const characters = await prisma.character.findMany();
        res.json(characters); // Stuur de data terug als JSON-response
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to fetch characters' }); // Geef een foutmelding terug
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
        userId,
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
            user: {
                connect: { id: userId },
            },
        },
    });

    res.json(character);
};
