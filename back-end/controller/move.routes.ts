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

router.get('/getmoves/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log("NR:", id);

        if (isNaN(Number(id))) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const move = await MoveService.getMove(Number(id));
        console.log(move);
        if (!move) {
            return res.status(404).json({ message: 'Move not found' });
        }
        res.json(move);
    } catch ( error ) {
        console.log("TEST");
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.get('/multiple', async (req: Request, res: Response) => {
    try {
        const { ids } = req.query;

        // const idArray = Array.isArray(ids) ? ids : typeof ids === 'string' ? [ids] : [];
        // if (idArray.length === 0) throw new Error(`Ids not found`);

        // const numberArray = idArray.map(id => {
        //     const num = Number(id);
        //     if (isNaN(num)) throw new Error(`Invalid id: ${id}`);
        //     return num;
        // });

        console.log(ids);

        // const moves = await MoveService.getMultipleMovesById(numberArray);
        // res.status(200).json(moves)
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
        res.status(500).json({ message: err.message });
    }
});

export default router;