import { User as UserPrisma, Character as CharacterPrisma } from '@prisma/client';

export class User {
    readonly id?: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly characterId?: number;

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        password: string;
        characterId?: number;
    }) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.characterId = user.characterId;
    }

    static from({
        id,
        name,
        email,
        password,
        characterId,
    }: UserPrisma & { character?: CharacterPrisma }) {
        return new User({
            id,
            name,
            email,
            password,
            characterId: characterId !== null ? characterId : undefined,
        });
    }
}
