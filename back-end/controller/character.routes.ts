import express, { Request, Response } from 'express';
import * as CharacterService from '../service/character.service';
import { CharacterType } from '../types';

const router = express.Router();

// Get template characters
router.get('/template', async (req: Request, res: Response) => {
   try {
       const characters = await CharacterService.getTemplateCharacters();
       res.json(characters);
   } catch (error) {
       const err = error as Error;
       res.status(500).json({ message: err.message });
   }
});

router.get('/:id', async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
       const character = await CharacterService.getCharacter(Number(id));
       if (!character) {
           return res.status(404).json({ message: 'Character not found' });
       }
       res.json(character);
   } catch (error) {
       const err = error as Error;
       res.status(500).json({ message: err.message });
   }
});

router.post('/', async (req: Request, res: Response) => {
   try {
        const character = <CharacterType>req.body;
        const newCharacter = await CharacterService.createCharacter(character);
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
