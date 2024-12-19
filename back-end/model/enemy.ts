import { Enemy as PrismaEnemy, Move as PrismaMove } from '@prisma/client';
import { EnemyType, MoveType, EnemyMoveType } from "../types";
import { Move } from './move';

export class Enemy {

    private id?: number;
    private name: string;
    private level: number;
    private strength: number;
    private speed: number;
    private magic: number;
    private dexterity: number;
    private healthPoints: number;
    private manaPoints: number;
    private luck: number;
    private defense: number;
    private magicDefense: number;

    private moves: EnemyMoveType[];

    constructor(enemy: {
        id?: number;
        name: string;
        level: number;
        strength: number;
        speed: number;
        magic: number;
        dexterity: number;
        healthPoints: number;
        manaPoints: number;
        luck: number;
        defense: number;
        magicDefense: number;
        moves: EnemyMoveType[];
    }) {
        this.id = enemy.id;
        this.name = enemy.name;
        this.level = enemy.level;
        this.strength = enemy.strength;
        this.speed = enemy.speed;
        this.magic = enemy.magic;
        this.dexterity = enemy.dexterity;
        this.healthPoints = enemy.healthPoints;
        this.manaPoints = enemy.manaPoints;
        this.luck = enemy.luck;
        this.defense = enemy.defense;
        this.magicDefense = enemy.magicDefense;
        this.moves = enemy.moves;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getLevel(): number {
        return this.level;
    }

    getStrength(): number {
        return this.strength;
    }

    getSpeed(): number {
        return this.speed;
    }

    getMagic(): number {
        return this.magic;
    }

    getDexterity(): number {
        return this.dexterity;
    }

    getHealthPoints(): number {
        return this.healthPoints;
    }

    getManaPoints(): number {
        return this.manaPoints;
    }

    getLuck(): number {
        return this.luck;
    }

    getDefense(): number {
        return this.defense;
    }

    getMagicDefense(): number {
        return this.magicDefense;
    }


    equals(otherEnemy: Enemy): boolean {
        return (
            this.id === otherEnemy.getId() &&
            this.name === otherEnemy.getName() &&
            this.level === otherEnemy.getLevel() &&
            this.strength === otherEnemy.getStrength() &&
            this.speed === otherEnemy.getSpeed() &&
            this.magic === otherEnemy.getMagic() &&
            this.dexterity === otherEnemy.getDexterity() &&
            this.healthPoints === otherEnemy.getHealthPoints() &&
            this.manaPoints === otherEnemy.getManaPoints() &&
            this.luck === otherEnemy.getLuck() &&
            this.defense === otherEnemy.getDefense() &&
            this.magicDefense === otherEnemy.getMagicDefense()
        );
    }
    
    static from(prismaEnemy: PrismaEnemy & { moves?: PrismaMove[] }): EnemyType {
        return {
            id: prismaEnemy.id,
            name: prismaEnemy.name,
            level: prismaEnemy.level,
            strength: prismaEnemy.strength,
            speed: prismaEnemy.speed,
            magic: prismaEnemy.magic,
            dexterity: prismaEnemy.dexterity,
            healthPoints: prismaEnemy.healthPoints,
            manaPoints: prismaEnemy.manaPoints,
            luck: prismaEnemy.luck,
            defense: prismaEnemy.defense,
            magicDefense: prismaEnemy.magicDefense,
            moves: prismaEnemy.moves?.map((move) => ({
                enemyId: prismaEnemy.id,
                enemy: {
                    id: prismaEnemy.id,
                    name: prismaEnemy.name,
                    level: prismaEnemy.level,
                    strength: prismaEnemy.strength,
                    speed: prismaEnemy.speed,
                    magic: prismaEnemy.magic,
                    dexterity: prismaEnemy.dexterity,
                    healthPoints: prismaEnemy.healthPoints,
                    manaPoints: prismaEnemy.manaPoints,
                    luck: prismaEnemy.luck,
                    defense: prismaEnemy.defense,
                    magicDefense: prismaEnemy.magicDefense,
                    moves: [],
                },
                moveId: move.id,
                move: Move.from(move),
            })) || [],
        };
    }
}