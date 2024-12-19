import express, { Request, Response } from 'express';
import * as MoveService from '../service/move.service'

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const moves = await MoveService.getAllMoves();
        res.json(moves);
    } catch ( error ) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const move = await MoveService.getMove(Number(id));
        if (!move) {
            return res.status(404).json({ message: 'Move not found' });
        }
        res.json(move);
    } catch ( error ) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const newMove = await MoveService.createMove(req.body);
        res.status(201).json(newMove);
    } catch ( error ) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedMove = await MoveService.updateMove(Number(id), req.body);
        res.json(updatedMove);
    } catch ( error ) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await MoveService.deleteMove(Number(id));
        res.json({ message: 'Move deleted successfully' });
    } catch ( error ) {
        const err = error as Error;
        res.json(500).json({ message: err.message });
    }
});

export default router;