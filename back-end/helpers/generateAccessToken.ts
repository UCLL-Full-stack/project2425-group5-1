import jwt from 'jsonwebtoken';
// https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
export default function generateAccessToken(name: string, time: string) {
    const secret = process.env.TOKEN_SECRET || 'temporary_dev_secret';
    // 30 minutes = 1800 seconds
    return jwt.sign({ name: name }, secret, { expiresIn: time });
}
