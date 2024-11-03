import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import characterRouter from './controller/character.routes';
import userRouter from './controller/user.routes';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/character', characterRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
