import express, { Request, Response } from 'express';
import * as UserService from '../service/user.service';
import { UserType } from '../types';
import generateAccessToken from '../helpers/generateAccessToken';

// const cookie = require('cookie');
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

// login
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await UserService.getUserByEmail(email, password);
        res.cookie("jwt", token, {
            signed: true,
            httpOnly: true,
            secure: process.env.NEXT_PUBLIC_NODE_ENV === "production",
            sameSite: process.env.NEXT_PUBLIC_NODE_ENV === "production" ? "none" : "lax",
            maxAge: 1000 * 60 * 60 * 4, // 4 hours
            path: "/",
        });
        if(user.character || user.characterId) { // User has character
            res.status(200).json({ message: "Logged in successfully!", redirect: "http://localhost:8080/game" });
        } else { //
            res.status(200).json({ message: "Logged in successfully!", redirect: "http://localhost:8080/characterCreator" });
        }
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
