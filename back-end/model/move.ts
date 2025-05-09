import { Move as MovePrisma } from '@prisma/client';
export class Move {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly attack: number,
        public readonly magicAttack: number,
        public readonly manaPoints: number,
        public readonly aoe: boolean,
        public readonly statusEffect?: string | null,
        public readonly cooldown?: number | null
    ) {}

    static from(move: MovePrisma): Move {
        return new Move(
            move.id,
            move.name,
            move.attack,
            move.magicAttack,
            move.manaPoints,
            move.aoe,
            move.statusEffect,
            move.cooldown
        );
    }
}

// import { Element as ElementPrisma, Character as CharacterPrisma, Enemy as EnemyPrisma, Move as MovePrisma, User as UserPrisma } from "@prisma/client";

// export class Move {
//     readonly id?: number;
//     readonly name: string;
//     readonly attack: number;
//     readonly magicAttack: number;
//     readonly manaPoints: number;
//     readonly aoe: boolean;
//     readonly statusEffect?: string;
//     readonly cooldown?: number;
//     readonly elements: ElementPrisma[];
//     readonly characters: CharacterPrisma[];
//     readonly enemies: EnemyPrisma[];

//     constructor(move: {
//         id?: number;
//         name: string;
//         attack: number;
//         magicAttack: number;
//         manaPoints: number;
//         aoe: boolean;
//         statusEffect?: string;
//         cooldown?: number;
//         elements: ElementPrisma[];
//         characters: CharacterPrisma[];
//         enemies: EnemyPrisma[];
//     }) {
//         this.id = move.id;
//         this.name = move.name;
//         this.attack = move.attack;
//         this.magicAttack = move.magicAttack;
//         this.manaPoints = move.manaPoints;
//         this.aoe = move.aoe;
//         this.statusEffect = move.statusEffect;
//         this.cooldown = move.cooldown;
//         this.elements = move.elements;
//         this.characters = move.characters;
//         this.enemies = move.enemies;
//     }

//     static from(move: MovePrisma & {
//         elements: ElementPrisma[],
//         characters: CharacterPrisma[],
//         enemies: EnemyPrisma[]
//     }): Move {
//         return new Move({
//             id: move.id,
//             name: move.name,
//             attack: move.attack,
//             magicAttack: move.magicAttack,
//             manaPoints: move.manaPoints,
//             aoe: move.aoe,
//             statusEffect: move.statusEffect ?? undefined,
//             cooldown: move.cooldown ?? undefined,
//             elements: move.elements,
//             characters: move.characters,
//             enemies: move.enemies,
//         });
//     }
// }

// // import { Move as MovePrisma } from '@prisma/client';

// // export class Move {
// //     readonly id?: number;
// //     readonly name: string;
// //     readonly attack: number;
// //     readonly magicAttack: number;
// //     readonly manaPoints: number;
// //     readonly aoe: boolean;

// //     constructor(move: {
// //         id?: number;
// //         name: string;
// //         attack: number;
// //         magicAttack: number;
// //         manaPoints: number;
// //         aoe: boolean;
// //     }) {
// //         this.id = move.id;
// //         this.name = move.name;
// //         this.attack = move.attack;
// //         this.magicAttack = move.magicAttack;
// //         this.manaPoints = move.manaPoints;
// //         this.aoe = move.aoe;
// //     }

// //     static from({ id, name, attack, magicAttack, manaPoints, aoe }: MovePrisma) {
// //         return new Move ({
// //             id,
// //             name,
// //             attack,
// //             magicAttack,
// //             manaPoints,
// //             aoe,
// //         });
// //     }
// // }
