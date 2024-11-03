import express from 'express';
import * as CharacterController from '../service/character.service';
const router = express.Router();

router.get('/', CharacterController.getCharacters);
router.delete('/delete', CharacterController.deleteCharacter);
router.post('/create', CharacterController.createCharacter);

export default router;
