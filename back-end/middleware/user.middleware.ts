import { NextFunction, Request, Response } from 'express';
import authenticateAccessToken from './authenticateAccessToken.middleware';

export default function userMiddleWare(req: Request, res: Response, next: NextFunction) {
    try {
        const nonSecurePaths = ['/register', '/login'];
        console.log(req.path);
        if (nonSecurePaths.includes(req.path)) {
            return next();
        }
        // for every secure path go through authentication
        authenticateAccessToken(req, res, next);
    } catch (err) {
        res.send(err);
    }
}
