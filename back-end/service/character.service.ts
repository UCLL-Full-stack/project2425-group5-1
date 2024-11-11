import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

/**
 * GET
 */
export const getCharacters = async (req: Request, res: Response) => {
    try {
        const characters = await prisma.character.findMany();
        res.status(200).json(characters); // Stuur de data terug als JSON-response
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

    try {
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
                userId,
            },
        });
    res.json(character);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to create character' });
    }
};

/**
 * DELETE
 */
export const deleteCharacter = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        console.log(id);
        const characters = await prisma.character.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json(characters); // Stuur de data terug als JSON-response
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'Failed to fetch characters' }); // Geef een foutmelding terug
    }
};
