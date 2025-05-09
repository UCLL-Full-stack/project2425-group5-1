import { Element as ElementPrisma } from '@prisma/client';

export class Element {
    constructor(public readonly id: number, public readonly name: string) {}

    static from(element: ElementPrisma): Element {
        return new Element(element.id, element.name);
    }
}

// import { Element as ElementPrisma, Move as MovePrisma, Enemy as EnemyPrisma, } from "@prisma/client";

// export class Element {
//     readonly id?: number;
//     readonly name: string;
//     readonly enemies: EnemyPrisma[];
//     readonly moves: MovePrisma[];
//     readonly strongAgainst: ElementPrisma[];
//     readonly strongAgainstBy: ElementPrisma[];

//     constructor(element: ElementPrisma & {
//         enemies: EnemyPrisma[],
//         moves: MovePrisma[],
//         strongAgainst: ElementPrisma[],
//         strongAgainstBy: ElementPrisma[]
//     }) {
//         this.id = element.id;
//         this.name = element.name;
//         this.enemies = element.enemies;
//         this.moves = element.moves;
//         this.strongAgainst = element.strongAgainst;
//         this.strongAgainstBy = element.strongAgainstBy
//     }

//     static from(element: ElementPrisma & {
//         enemies: EnemyPrisma[],
//         moves: MovePrisma[],
//         strongAgainst: ElementPrisma[],
//         strongAgainstBy: ElementPrisma[]
//     }): Element {
//         return new Element({
//             id: element.id,
//             name: element.name,
//             enemies: element.enemies,
//             moves: element.moves,
//             strongAgainst: element.strongAgainst,
//             strongAgainstBy: element.strongAgainstBy
//         });
//     }
// }
