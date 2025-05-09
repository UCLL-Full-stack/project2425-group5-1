import express, { NextFunction, Request, Response } from 'express';
import * as UserService from '../service/user.service';
import * as BattleService from "../service/battle.service";
import * as CharacterService from "../service/character.service";

const router = express.Router();

// check existing battles
// router.get("/getExisting/", async (req: Request, res: Response) => {
//     try {
//         const currentUser = await UserService.getUserByName(res.locals.username);
//         const existingBattle = await BattleService.getExistingBattle(currentUser);

//         if(existingBattle) {
//             console.log(existingBattle);
//             res.status(200).json(existingBattle);
//         }
//     } catch (error) {
//         const err = error as Error;
//         res.status(500).json({ message: err.message, error: error });
//     }
// });

// create battle
router.post('/', async (req: Request, res: Response) => {
    try {
        const selectedLevel = req.body as { world: number, level: number };
        console.log("Creating battle");
        const battle = await BattleService.createBattle(res.locals.username, selectedLevel);
        console.log(`Battle:\n\n${battle}`);
        res.status(200).json(battle);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message, error: error });
    }
});

export default router;
