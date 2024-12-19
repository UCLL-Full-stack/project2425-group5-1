import { Move as MovePrisma } from '@prisma/client';

export class Move {
    readonly id?: number;
    readonly name: string;
    readonly attack: number;
    readonly magicAttack: number;
    readonly manaPoints: number;
    readonly aoe: boolean;

    constructor(move: {
        id?: number;
        name: string;
        attack: number;
        magicAttack: number;
        manaPoints: number;
        aoe: boolean;
    }) {
        this.id = move.id;
        this.name = move.name;
        this.attack = move.attack;
        this.magicAttack = move.magicAttack;
        this.manaPoints = move.manaPoints;
        this.aoe = move.aoe;
    }

    static from({ id, name, attack, magicAttack, manaPoints, aoe }: MovePrisma) {
        return new Move ({
            id,
            name,
            attack,
            magicAttack,
            manaPoints,
            aoe,
        });
    }
}
