import express from 'express';
import userMiddleWare from '../middleware/user.middleware';
import * as UserController from '../service/user.service';
const router = express.Router();

router.use(userMiddleWare);

router.get('/', UserController.getUsers);

router.post('/', UserController.createUser);

export default router;
