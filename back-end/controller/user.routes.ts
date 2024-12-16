import express, { NextFunction, Request, Response } from 'express';
import userMiddleWare from '../middleware/user.middleware';
import userService from '../service/user.service';
import { UserInput } from '../types';

const router = express.Router();

router.use(userMiddleWare);

// Route to get all users
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Route to register a new user
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json({ message: 'User successfully created', result });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

export default router;
