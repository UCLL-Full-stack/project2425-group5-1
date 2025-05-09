import express, { Request, Response } from 'express';
import * as CharacterService from '../service/character.service';
import * as UserService from "../service/user.service";
import { CharacterType } from '../types';
import { Character } from '../model/character';

const router = express.Router();


// get character from jwt user
router.get('/', async (req: Request, res: Response) => {
    try {
        const user = await CharacterService.getCharacter(res.locals.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

// Get template characters
router.get('/template', async (req: Request, res: Response) => {
    try {
        const characters = await CharacterService.getTemplateCharacters();
        res.json(characters);
    } catch (error) {
        console.log(error);
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const { characterClass } = <{characterClass: string}>req.body;
        const newCharacter = await CharacterService.createCharacter(res.locals.username, characterClass);
        res.status(200).json(newCharacter);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedCharacter = await CharacterService.updateCharacter(Number(id), req.body);
        res.json(updatedCharacter);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await CharacterService.deleteCharacter(Number(id));
        res.json({ message: 'Character deleted successfully' });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

export default router;
