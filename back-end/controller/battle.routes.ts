import express, { NextFunction, Request, Response } from 'express';
import * as UserService from '../service/user.service';
import * as BattleService from "../service/battle.service";

const router = express.Router();

// create battle
router.post('/:userId/:selectedLevel', async (req: Request, res: Response) => {
    try {
        const { userId, selectedLevel } = req.params;
        console.log("Getting user");
        const user = await UserService.getUser(Number(userId));
        console.log("Getting character");
        const userCharacter = await UserService.getUserCharacter(Number(userId));
        if(!user || !userCharacter) throw new Error('User or character not found');
        console.log("Creating battle");
        const battle = await BattleService.createBattle(user, userCharacter, selectedLevel);
        res.status(200).json(battle);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message, error: error });
    }
});

export default router;
