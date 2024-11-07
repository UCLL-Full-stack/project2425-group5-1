import express, { NextFunction, Request, Response } from 'express';
import userMiddleWare from '../middleware/user.middleware';
import userService from '../service/user.service';
const router = express.Router();

router.use(userMiddleWare);

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = userService.getUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password, character } = req.body;
        const user = userService.createUser(username, email, password, character);
        res.status(200).json({ message: 'User successfully created', user: user });
    } catch (error) {
        next(error);
    }
});

export default router;
