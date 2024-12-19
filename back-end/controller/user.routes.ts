import express, { Request, Response } from 'express';
import * as UserService from '../service/user.service';
import { UserType } from '../types';

const router = express.Router();

router.get('/', async (_req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await UserService.getUser(Number(id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const user = <UserType>req.body;
        const newUser = await UserService.createUser(user);
        res.status(200).json(newUser);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updatedUser = await UserService.updateUser(Number(id), req.body);
        res.status(200).json(updatedUser);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await UserService.deleteUser(Number(id));
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

export default router;
