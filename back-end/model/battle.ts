import { Battle as BattlePrisma } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';
export class Battle {
    constructor(
        public readonly id: number,
        public readonly turnCount: number,
        public readonly currentTurn: string,
        public readonly reward: JsonValue,
        public readonly createdAt: Date
    ) {}

    static from(battle: BattlePrisma): Battle {
        return new Battle(
            battle.id,
            battle.turnCount,
            battle.currentTurn,
            battle.reward,
            battle.createdAt
        );
    }
}

// import { JsonValue } from "@prisma/client/runtime/library";
// import { Battle as BattlePrisma, Enemy as EnemyPrisma } from "@prisma/client";

// export class Battle {
//     readonly id?: number;
//     readonly turnCount: number;
//     readonly currentTurn: string;
//     readonly characterId: number;
//     readonly reward: JsonValue;
//     readonly createdAt: Date;
//     readonly enemies: EnemyPrisma[];

//     constructor(battle: {
//         id?: number,
//         turnCount: number,
//         currentTurn: string,
//         characterId: number,
//         reward: JsonValue,
//         createdAt: Date,
//         enemies: EnemyPrisma[]
//     }) {
//         this.id = battle.id;
//         this.turnCount = battle.turnCount;
//         this.currentTurn = battle.currentTurn;
//         this.characterId = battle.characterId;
//         this.reward = battle.reward;
//         this.createdAt = battle.createdAt;
//         this.enemies = battle.enemies;
//     }

//     static from(battle: BattlePrisma & { enemies: EnemyPrisma[] }): Battle {
//         return new Battle({
//             id: battle.id,
//             turnCount: battle.turnCount,
//             currentTurn: battle.currentTurn,
//             characterId: battle.characterId,
//             reward: battle.reward,
//             createdAt: battle.createdAt,
//             enemies: battle.enemies
//         });
//     }
// }

// // import { Battle as BattlePrisma, Enemy as EnemyPrisma, Move as MovePrisma } from '@prisma/client';
// // import { EnemyType } from '../types';

// // export class Battle {
// //     readonly id?: number;
// //     readonly turnCount: number;
// //     readonly currentTurn: string;
// //     readonly enemies: Enemy[];
// //     readonly characterId: number;
// //     readonly reward: string;

// //     constructor(battle: {
// //         id?: number;
// //         turnCount: number;
// //         currentTurn: string;
// //         enemies: Enemy[];
// //         characterId: number;
// //         reward: string;
// //     }) {
// //         this.id = battle.id;
// //         this.turnCount = battle.turnCount;
// //         this.currentTurn = battle.currentTurn;
// //         this.enemies = battle.enemies;
// //         this.characterId = battle.characterId;
// //         this.reward = battle.reward;
// //     }

// //     static from(
// //         battle: BattlePrisma & {
// //             enemies: (
// //                 EnemyPrisma &
// //                 {
// //                     moves: MovePrisma[]
// //                 })[]
// //         }
// //     ): Battle {
// //         return new Battle({
// //             id: battle.id,
// //             turnCount: battle.turnCount,
// //             currentTurn: battle.currentTurn,
// //             enemies: battle.enemies.map(enemy => Enemy.from(enemy)),
// //             characterId: battle.characterId,
// //             reward: battle.reward,
// //         });
// //     }

// // }
