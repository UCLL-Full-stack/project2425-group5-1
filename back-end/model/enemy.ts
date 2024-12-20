import { Enemy as EnemyPrisma, Move as MovePrisma, Battle as BattlePrisma } from '@prisma/client';
import { Move } from './move';
import { Battle } from './battle';

export class Enemy {
    readonly id?: number;
    readonly name: string;
    readonly level: number;
    readonly strength: number;
    readonly speed: number;
    readonly magic: number;
    readonly dexterity: number;
    readonly healthPoints: number;
    readonly manaPoints: number;
    readonly luck: number;
    readonly defense: number;
    readonly magicDefense: number;

    readonly moveIds: number[];
    readonly battles: Battle[];

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
        moveIds: number[];
        battles: Battle[];
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
        this.moveIds = enemy.moveIds;
        this.battles = enemy.battles;
    }
    
    static from({ id, name, level, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, moves, battles }: EnemyPrisma & { moves: MovePrisma[]; battles: BattlePrisma[] }) {
        const moveIds = moves.map(move => move.id); 
        return new Enemy({
            id,   
            name,
            level,
            strength,
            speed,
            magic,
            dexterity,
            healthPoints,manaPoints,
            luck,
            defense,
            magicDefense,
            moveIds,
            battles: battles.map((battle) => Battle.from(battle)),
        });
    }
}