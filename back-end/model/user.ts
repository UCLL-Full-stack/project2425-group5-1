import { Character } from './character';
import { User as UserPrisma, Character as CharacterPrisma } from '@prisma/client';

export class User {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly character?: Character | null,
    ) {}

    static from(user: UserPrisma & { character?: CharacterPrisma | null }): User {
        return new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.character ? Character.from(user.character) : null
        );
    }
}

// import { User as UserPrisma, Character as CharacterPrisma } from '@prisma/client';

// export class User {
//     readonly id?: number;
//     readonly name: string;
//     readonly email: string;
//     readonly password: string;
//     readonly characterId?: number;

//     constructor(user: {
//         id?: number;
//         name: string;
//         email: string;
//         password: string;
//         characterId?: number;
//     }) {
//         this.id = user.id;
//         this.name = user.name;
//         this.email = user.email;
//         this.password = user.password;
//         this.characterId = user.characterId;
//     }

//     static from(userPrisma: UserPrisma & { character?: CharacterPrisma }) {
//         return new User({
//             id: userPrisma.id,
//             name: userPrisma.name,
//             email: userPrisma.email,
//             password: userPrisma.password,
//             characterId: userPrisma.character?.id,
//         });
//     }
// }
