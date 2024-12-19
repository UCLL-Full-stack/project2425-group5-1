import express, { Request, Response } from 'express';
import * as BattleService from '../service/battle.service';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const battles = await BattleService.getAllBattles();
        res.json(battles);
    } catch ( error ) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const battle = await BattleService.getBattle(Number(id));
        if (!battle) {
            return res.status(404).json({ message: 'Battle not found' });
        }
        res.json(battle);
    } catch ( error ) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req: Request, res: Response) => {
   try {
       const newBattle = await BattleService.createBattle(req.body);
       res.status(201).json(newBattle);
   } catch (error) {
       const err = error as Error;
       res.status(500).json({ message: err.message });
   }
});

router.put('/:id', async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
       const updatedBattle = await BattleService.updateBattle(Number(id), req.body);
       res.json(updatedBattle);
   } catch (error) {
       const err = error as Error;
       res.status(500).json({ message: err.message });
   }
});

router.delete('/:id', async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
       await BattleService.deleteBattle(Number(id));
       res.json({ message: 'Battle deleted successfully' });
   } catch (error) {
       const err = error as Error;
       res.status(500).json({ message: err.message });
   }
});

export default router;