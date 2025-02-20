import express, { Request, Response } from 'express';
import * as UserService from '../service/user.service';
import { UserType } from '../types';
import generateAccessToken from '../helpers/generateAccessToken';

const router = express.Router();

// get all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

// get user by id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
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

// get character by user id
router.get('/:id/character', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await UserService.getUserCharacter(Number(id));
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

// login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserService.getUserByEmail(email, password);
        res.status(200).json(user);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message, error: error });
    }
});

//register
router.post('/register', async (req: Request, res: Response) => {
    try {
        const user = <UserType>req.body;
        const newUser = await UserService.createUser(user);
        const token = generateAccessToken(newUser.name, '4h');
        res.status(200).json({ token: token, user: newUser });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

// add character to user
router.put('/addCharacter/:userId/:characterId', async (req: Request, res: Response) => {
    try {
        const { userId, characterId } = req.params;
        console.log(req.params);
        const updatedUser = await UserService.addCharacterToUser(Number(userId), Number(characterId));
        res.status(200).json(updatedUser);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
});

// remove user by id
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
