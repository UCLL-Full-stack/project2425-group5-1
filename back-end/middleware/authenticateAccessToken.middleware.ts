import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function authenticateAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
        const jwtToken = req.signedCookies.jwt;
        
        if (!jwtToken) {
            return res.status(401).json({ message: 'No token provided' });
        }

        jwt.verify(jwtToken, process.env.TOKEN_SECRET || 'temporary_dev_secret', (err: null | Error, decoded: any) => {
                if (err) {
                    return res.sendStatus(403).json({ message: "Forbidden" });
                }
                res.locals.username = decoded.name;
                next();
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}
