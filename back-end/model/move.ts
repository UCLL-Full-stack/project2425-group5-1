import { Move as PrismaMove } from '@prisma/client';
import { MoveType } from '../types';

export class Move {
    private id?: number;
    private name: string;
    private attack: number;
    private magicAttack: number;
    private manaPoints: number;
    private aoe: boolean;

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

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getAttack(): number {
        return this.attack;
    }

    getMagicAttack(): number {
        return this.magicAttack;
    }

    getManaPoints(): number {
        return this.manaPoints;
    }
    
    getAoe(): boolean {
        return this.aoe;
    }

    static from(prismaMove: PrismaMove): MoveType {
        return {
            id: prismaMove.id,
            name: prismaMove.name,
            attack: prismaMove.attack,
            magicAttack: prismaMove.magicAttack,
            manaPoints: prismaMove.manaPoints,
            aoe: prismaMove.aoe,
        };
    }
}
