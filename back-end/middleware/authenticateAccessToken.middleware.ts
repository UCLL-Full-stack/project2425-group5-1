import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function authenticateAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const authHeader = req.headers.authorization;
        let token = JSON.parse(authHeader);
        console.log(token);
        if (token == null) {
            return res.status(401).json({ message: `Unauthorized` });
        }
        jwt.verify(token, process.env.TOKEN_SECRET || 'temporary_dev_secret', (err: null | Error, decoded: any) => {
                console.log(err);
                if (err) {
                    return res.sendStatus(403);
                }
                //@ts-ignore:next-line
                // req.username = decoded.name;
                next();
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}
