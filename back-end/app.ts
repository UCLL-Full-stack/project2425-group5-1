import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import characterRouter from './controller/character.routes';
import userRouter from './controller/user.routes';
import enemyRouter from './controller/enemy.routes';
import moveRouter from './controller/move.routes';
import battleRouter from './controller/battle.routes';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userMiddleWare from './middleware/user.middleware';
import helmet from 'helmet';
import jwt from 'jsonwebtoken';

const app = express();
const cookieParser = require('cookie-parser');
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(cookieParser(process.env.COOKIE_SECRET || "developer_cookie_secret"));

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
app.use('/api/verifyJwt', (req: Request, res: Response) => {
    const token = req.signedCookies.jwt;
    if(token) {
        jwt.verify(token, process.env.TOKEN_SECRET || 'temporary_dev_secret', (err: null | Error, decoded: any) => {
            if (err) {
                return res.sendStatus(403).json({ message: "Forbidden" });
            }
            console.log(Date.now() / 1000, decoded);
            if (Math.floor(Date.now() / 1000) >= decoded.exp) { // token is expired
                console.log(Math.floor(Date.now() / 1000));
                console.log(decoded);
            }
            res.status(200).json({ message: "Authenticated", redirectUrl: "/game" });
        });
    } else {
        res.status(401).json({ message: "Not Authenticated" });
    }
});

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
