import { User } from '../types/index';
import prisma from './database';

const getCharacters = async () => {
    // const users = await prisma.user.findMany({
    //     include: {
    //         character: true, // Include the related characters
    //     },
    // });
    // return users;
};

const createCharacter = async (
    name: string,
    level: number,
    xp: number,
    strength: number,
    speed: number,
    magic: number,
    dexterity: number,
    healthPoints: number,
    manaPoints: number,
    luck: number,
    defense: number,
    magicDefense: number,
    progress: string,
    user: User
) => {
    const character = await prisma.character.create({
        data: {
            name,
            level,
            xp,
            strength,
            speed,
            magic,
            dexterity,
            healthPoints,
            manaPoints,
            luck,
            defense,
            magicDefense,
            progress,
            user: user,
        },
    });
    return character;
    // const user = await prisma.user.create({
    //     data: {
    //         username,
    //         email,
    //         password,
    //         character: character
    //             ? {
    //                   create: character,
    //               }
    //             : undefined,
    //     },
    // });
    // return user;
};

const characterRepositry = {
    createCharacter,
    getCharacters,
};

export default characterRepositry;
