import express, {Request, Response} from 'express';
import * as EnemyService from '../service/enemy.service';

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const enemies = await EnemyService.getAllEnemies();
        res.json(enemies);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
       const enemy = await EnemyService.getEnemy(Number(id));
       if (!enemy) {
           return res.status(404).json({ message: 'Enemy not found' });
       }
       res.json(enemy);
   } catch (error) {
       const err = error as Error;
       res.status(500).json({ message: err.message });
   }
});

router.post('/', async (req: Request, res: Response) => {
   try {
       const newEnemy = await EnemyService.createEnemy(req.body);
       res.status(201).json(newEnemy);
   } catch (error) {
       const err = error as Error;
       res.status(500).json({ message: err.message });
   }
});

router.put('/:id', async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
       const updatedEnemy = await EnemyService.updateEnemy(Number(id), req.body);
       res.json(updatedEnemy);
   } catch (error) {
       const err = error as Error;
       res.status(500).json({ message: err.message });
   }
});

router.delete('/:id', async (req: Request, res: Response) => {
   const { id } = req.params;
   try {
       await EnemyService.deleteEnemy(Number(id));
       res.json({ message: 'Enemy deleted successfully' });
   } catch (error) {
       const err = error as Error;
       res.status(500).json({ message: err.message });
   }
});

export default router;