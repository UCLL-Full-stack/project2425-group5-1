import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';

import characterRouter from './controller/character.routes';
import userRouter from './controller/user.routes';
import enemyRouter from './controller/enemy.routes';
import moveRouter from './controller/move.routes';
import battleRouter from './controller/battle.routes';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userMiddleWare from './middleware/user.middleware';
import helmet from 'helmet';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use('/user', userMiddleWare, userRouter);
app.use('/character', userMiddleWare, characterRouter);
app.use('/move', userMiddleWare, moveRouter);
app.use('/enemy', userMiddleWare, enemyRouter);
app.use('/battle', userMiddleWare, battleRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Course API',
            version: '1.0.0',
        },
    },
    apis: ['./controller/*.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
