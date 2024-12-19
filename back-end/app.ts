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

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/character', characterRouter);
app.use('/battle', battleRouter);
app.use('/move', moveRouter);
app.use('/enemy', enemyRouter);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Course API",
            version: "1.0.0",
        },
    },
    apis: ["./controller/*.routes.ts"],
}

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
