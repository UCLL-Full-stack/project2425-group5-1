import { Battle as BattlePrisma } from '@prisma/client';

export class Battle {
    readonly id?: number;
    readonly turnCount: number;
    readonly currentTurn: string;
    readonly enemies: string;
    readonly character: string;
    readonly reward: string;

    constructor(battle: {
        id?: number;
        turnCount: number;
        currentTurn: string;
        enemies: string;
        character: string;
        reward: string;
    }) {
        this.id = battle.id;
        this.turnCount = battle.turnCount;
        this.currentTurn = battle.currentTurn;
        this.enemies = battle.enemies;
        this.character = battle.character;
        this.reward = battle.reward;
    }

    static from({
        id,
        turnCount,
        currentTurn,
        enemies,
        character,
        reward,
    }: BattlePrisma) {
        return new Battle({
            id,
            turnCount,
            currentTurn,
            enemies,
            character,
            reward,
        });
    }
}
