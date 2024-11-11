import express from 'express';
import * as CharacterController from '../service/character.service';
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        await CharacterController.getCharacters(req, res);
    } catch (error) {
        next(error);
    }
});



router.delete('/delete', CharacterController.deleteCharacter);
router.post('/create', CharacterController.createCharacter);

export default router;
