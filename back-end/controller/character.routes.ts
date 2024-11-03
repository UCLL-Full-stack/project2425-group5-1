import express from 'express';
import * as CharacterController from '../service/character.service';
const router = express.Router();

router.get('/', CharacterController.getCharacters);
router.post('/', CharacterController.createCharacter);

export default router;
