import { Enemy as EnemyPrisma } from '@prisma/client';

export class Enemy {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly strength: number,
        public readonly speed: number,
        public readonly magic: number,
        public readonly dexterity: number,
        public readonly healthPoints: number,
        public readonly manaPoints: number,
        public readonly luck: number,
        public readonly defense: number,
        public readonly magicDefense: number,
        public readonly world: number,
        public readonly isBoss: boolean,
        public readonly isTemplate: boolean,
    ) {}

    static from(enemy: EnemyPrisma): Enemy {
        return new Enemy(
            enemy.id,
            enemy.name,
            enemy.strength,
            enemy.speed,
            enemy.magic,
            enemy.dexterity,
            enemy.healthPoints,
            enemy.manaPoints,
            enemy.luck,
            enemy.defense,
            enemy.magicDefense,
            enemy.world,
            enemy.isBoss,
            enemy.isTemplate
        );
    }
}

// import { Element as ElementPrisma, Enemy as EnemyPrisma, Move as MovePrisma, Battle as BattlePrisma } from "@prisma/client";

// export class Enemy {
//     readonly id?: number;
//     readonly name: string;
//     readonly strength: number;
//     readonly speed: number;
//     readonly magic: number;
//     readonly dexterity: number;
//     readonly healthPoints: number;
//     readonly manaPoints: number;
//     readonly luck: number;
//     readonly defense: number;
//     readonly magicDefense: number;
//     readonly element: ElementPrisma[];
//     readonly moves: MovePrisma[];
//     readonly battles: BattlePrisma[];

//     constructor(enemy: EnemyPrisma & {
//         element: ElementPrisma[],
//         moves: MovePrisma[],
//         battles: BattlePrisma[]
//     }) {
//         this.id = enemy.id;
//         this.name = enemy.name;
//         this.strength = enemy.strength;
//         this.speed = enemy.speed;
//         this.magic = enemy.magic;
//         this.dexterity = enemy.dexterity;
//         this.healthPoints = enemy.healthPoints;
//         this.manaPoints = enemy.manaPoints;
//         this.luck = enemy.luck;
//         this.defense = enemy.defense;
//         this.magicDefense = enemy.magicDefense;
//         this.element = enemy.element;
//         this.moves = enemy.moves;
//         this.battles = enemy.battles;
//     }

//     static from(enemy: EnemyPrisma & {
//         element: ElementPrisma[],
//         moves: MovePrisma[],
//         battles: BattlePrisma[]
//     }): Enemy {
//         return new Enemy({
//             id: enemy.id,
//             name: enemy.name,
//             strength: enemy.strength,
//             speed: enemy.speed,
//             magic: enemy.magic,
//             dexterity: enemy.dexterity,
//             healthPoints: enemy.healthPoints,
//             manaPoints: enemy.manaPoints,
//             luck: enemy.luck,
//             defense: enemy.defense,
//             magicDefense: enemy.magicDefense,
//             element: enemy.element,
//             moves: enemy.moves,
//             battles: enemy.battles
//         });
//     }
// }

// // import { Enemy as EnemyPrisma, Move as MovePrisma } from '@prisma/client';
// // import { Move } from './move';

// // export class Enemy {
// //     readonly id?: number;
// //     readonly name: string;
// //     readonly level: number;
// //     readonly strength: number;
// //     readonly speed: number;
// //     readonly magic: number;
// //     readonly dexterity: number;
// //     readonly healthPoints: number;
// //     readonly manaPoints: number;
// //     readonly luck: number;
// //     readonly defense: number;
// //     readonly magicDefense: number;

// //     readonly moveIds: number[];

// //     constructor(enemy: {
// //         id?: number;
// //         name: string;
// //         level: number;
// //         strength: number;
// //         speed: number;
// //         magic: number;
// //         dexterity: number;
// //         healthPoints: number;
// //         manaPoints: number;
// //         luck: number;
// //         defense: number;
// //         magicDefense: number;
// //         moveIds: number[];
// //     }) {
// //         this.id = enemy.id;
// //         this.name = enemy.name;
// //         this.level = enemy.level;
// //         this.strength = enemy.strength;
// //         this.speed = enemy.speed;
// //         this.magic = enemy.magic;
// //         this.dexterity = enemy.dexterity;
// //         this.healthPoints = enemy.healthPoints;
// //         this.manaPoints = enemy.manaPoints;
// //         this.luck = enemy.luck;
// //         this.defense = enemy.defense;
// //         this.magicDefense = enemy.magicDefense;
// //         this.moveIds = enemy.moveIds;
// //     }

// //     static from({ id, name, level, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, moves }: EnemyPrisma & { moves: MovePrisma[]; }) {
// //         const moveIds = moves.map(move => move.id);
// //         return new Enemy({
// //             id,
// //             name,
// //             level,
// //             strength,
// //             speed,
// //             magic,
// //             dexterity,
// //             healthPoints,manaPoints,
// //             luck,
// //             defense,
// //             magicDefense,
// //             moveIds,
// //         });
// //     }
// // }
