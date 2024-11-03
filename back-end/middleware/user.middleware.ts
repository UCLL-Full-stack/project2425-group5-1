import { NextFunction, Request, Response } from 'express';

export default function usersMiddleWare(req: Request, res: Response, next: NextFunction) {
    try {
        const nonSecurePaths = ['/register', '/login'];
        if (nonSecurePaths.includes(req.path)) {
            return next();
        }
        console.log('user middleWare working');
    } catch (err) {
        res.send(err);
    }
    next();
}
