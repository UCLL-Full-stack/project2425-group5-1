import { Move } from "./move";
import { Battle } from "./battle";
import { Character as CharacterPrisma, Move as MovePrisma, Battle as BattlePrisma } from "@prisma/client";

export class Character {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly level: number,
        public readonly xp: number,
        public readonly strength: number,
        public readonly speed: number,
        public readonly magic: number,
        public readonly dexterity: number,
        public readonly healthPoints: number,
        public readonly manaPoints: number,
        public readonly luck: number,
        public readonly defense: number,
        public readonly magicDefense: number,
        public readonly progress: any,
        public readonly characterClass: string,
        public readonly moves: readonly Move[],
        public readonly battle?: Battle | null
    ) {}

    static from(
        character: CharacterPrisma & { moves?: MovePrisma[]; battle?: BattlePrisma | null }
    ): Character {
        return new Character(
            character.id,
            character.name,
            character.level,
            character.xp,
            character.strength,
            character.speed,
            character.magic,
            character.dexterity,
            character.healthPoints,
            character.manaPoints,
            character.luck,
            character.defense,
            character.magicDefense,
            character.progress,
            character.characterClass,
            character.moves?.map(Move.from) || [],
            character.battle ? Battle.from(character.battle) : null
        );
    }
}

// import { JsonValue } from "@prisma/client/runtime/library";
// import { Battle as BattlePrisma, Move as MovePrisma, User as UserPrisma, Character as CharacterPrisma, Element as ElementPrisma, Enemy as EnemyPrisma } from "@prisma/client";
// import { BattleType, MoveType, UserType } from "../types";

// export class Character {
//     readonly id?: number;
//     readonly name: string;
//     readonly level: number;
//     readonly xp: number;
//     readonly strength: number;
//     readonly speed: number;
//     readonly magic: number;
//     readonly dexterity: number;
//     readonly healthPoints: number;
//     readonly manaPoints: number;
//     readonly luck: number;
//     readonly defense: number;
//     readonly magicDefense: number;
//     readonly progress: JsonValue;
//     readonly characterClass: string;
//     readonly user?: UserType;
//     readonly moves: MoveType[];
//     readonly battle?: BattleType;

//     constructor(char: {
//         id?: number,
//         name: string,
//         level: number,
//         xp: number,
//         strength: number,
//         speed: number,
//         magic: number,
//         dexterity: number,
//         healthPoints: number,
//         manaPoints: number,
//         luck: number,
//         defense: number,
//         magicDefense: number,
//         progress: JsonValue,
//         characterClass: string,
//         user?: UserType,
//         moves: MoveType[],
//         battle?: BattleType
//     }) {
//         this.id = char.id;
//         this.name = char.name;
//         this.level = char.level;
//         this.xp = char.xp;
//         this.strength = char.strength;
//         this.speed = char.speed;
//         this.magic = char.magic;
//         this.dexterity = char.dexterity;
//         this.healthPoints = char.healthPoints;
//         this.manaPoints = char.manaPoints;
//         this.luck = char.luck;
//         this.defense = char.defense;
//         this.magicDefense = char.magicDefense;
//         this.progress = char.progress;
//         this.characterClass = char.characterClass;
//         this.user = char.user;
//         this.moves = char.moves;
//         this.battle = char.battle;
//     }

//     static from(character: CharacterPrisma & {
//         user?: UserPrisma,
//         moves: MovePrisma[] & {
//             characters: CharacterPrisma[],
//             elements: ElementPrisma[],
//             enemies: EnemyPrisma[],
//         },
//         battle?: BattlePrisma,
//     }): Character {
//         return new Character({
//             id: character.id,
//             name: character.name,
//             level: character.level,
//             xp: character.xp,
//             strength: character.strength,
//             speed: character.speed,
//             magic: character.magic,
//             dexterity: character.dexterity,
//             healthPoints: character.healthPoints,
//             manaPoints: character.manaPoints,
//             luck: character.luck,
//             defense: character.defense,
//             magicDefense: character.magicDefense,
//             progress: character.progress,
//             characterClass: character.characterClass,
//             user: {
//                 id: character.user!.id,
//                 name: character.user!.name,
//                 email: character.user!.email,
//                 password: character.user!.password,
//             },
//             moves: character.moves.map(move => ({
//                 id: move.id,
//                 name: move.name,
//                 aoe: move.aoe,
//                 attack: move.attack,
//                 magicAttack: move.magicAttack,
//                 manaPoints: move.manaPoints,
//                 cooldown: move.cooldown,
//                 statusEffect: move.statusEffect,
//                 characters: character.moves.characters,
//                 elements: character.moves.elements,
//                 enemies: character.moves.enemies,
//             })),
//             battle: character.battle,
//         });
//     }
// }

// // import { Character as CharacterPrisma, Move as MovePrisma } from '@prisma/client';
// // import { User } from './user';
// // import { Move } from './move';

// // export class Character {
// //     readonly id?: number;
// //     readonly name: string;
// //     readonly level: number;
// //     readonly xp: number;
// //     readonly strength: number;
// //     readonly speed: number;
// //     readonly magic: number;
// //     readonly dexterity: number;
// //     readonly healthPoints: number;
// //     readonly manaPoints: number;
// //     readonly luck: number;
// //     readonly defense: number;
// //     readonly magicDefense: number;
// //     readonly progress: string;
// //     readonly characterClass: string;
// //     readonly user?: User;
// //     readonly moveIds: number[];

// //     constructor(character: {
// //         id?: number;
// //         name: string;
// //         level: number;
// //         xp: number;
// //         strength: number;
// //         speed: number;
// //         magic: number;
// //         dexterity: number;
// //         healthPoints: number;
// //         manaPoints: number;
// //         luck: number;
// //         defense: number;
// //         magicDefense: number;
// //         progress: string;
// //         characterClass: string;
// //         user?: User;
// //         moveIds: number[];
// //     }) {
// //         // this.validate(character);

// //         this.id = character.id;
// //         this.name = character.name;
// //         this.level = character.level;
// //         this.xp = character.xp;
// //         this.strength = character.strength;
// //         this.speed = character.speed;
// //         this.magic = character.magic;
// //         this.dexterity = character.dexterity;
// //         this.healthPoints = character.healthPoints;
// //         this.manaPoints = character.manaPoints;
// //         this.luck = character.luck;
// //         this.defense = character.defense;
// //         this.magicDefense = character.magicDefense;
// //         this.progress = character.progress;
// //         this.characterClass = character.characterClass;
// //         this.user = character.user;
// //         this.moveIds = character.moveIds;
// //     }

// //     static from({
// //         id,
// //         name,
// //         level,
// //         xp,
// //         strength,
// //         speed,
// //         magic,
// //         dexterity,
// //         healthPoints,
// //         manaPoints,
// //         luck,
// //         defense,
// //         magicDefense,
// //         progress,
// //         characterClass,
// //         moves,
// //     }: CharacterPrisma & { moves: MovePrisma[] }) {
// //         const moveIds = moves.map((move) => move.id);
// //         return new Character({
// //             id,
// //             name,
// //             level,
// //             xp,
// //             strength,
// //             speed,
// //             magic,
// //             dexterity,
// //             healthPoints,
// //             manaPoints,
// //             luck,
// //             defense,
// //             magicDefense,
// //             progress,
// //             characterClass,
// //             moveIds,
// //         });
// //     }
// // }
