import { Battle as PrismaBattle, Character as PrismaCharacter, Enemy as PrismaEnemy} from '@prisma/client';
import { BattleType, EnemyType } from '../types';
import { Enemy } from './enemy';
import { Character } from './character';

export class Battle {
    private id?: number;
    private turn: number;
    private currentTurn: number;
    private state: string;
    private characterId: number;
    private enemies: EnemyType[];

    constructor(battle: {
        id?: number;
        turn: number;
        currentTurn: number;
        state: string;
        characterId: number;
        enemies: EnemyType[];
    }) {
        this.id = battle.id;
        this.turn = battle.turn;
        this.currentTurn = battle.currentTurn;
        this.state = battle.state;
        this.characterId = battle.characterId;
        this.enemies = battle.enemies;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTurn(): number {
        return this.turn;
    }

    getCurrentTurn(): number {
        return this.currentTurn;
    }

    getState(): string {
        return this.state;
    }


    // static from(prismaBattle: PrismaBattle & { character?: PrismaCharacter; enemies?: PrismaEnemy[] }): BattleType {
    //     return {
    //         id: prismaBattle.id,
    //         turn: prismaBattle.turn,
    //         currentTurn: prismaBattle.currentTurn,
    //         state: prismaBattle.state,
    //         characterId: prismaBattle.character?.id || 0,
    //         enemies: prismaBattle.enemies?.map((enemy) => Enemy.from(enemy)) || [],
    //     };
    // }
}