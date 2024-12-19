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

    readonly moves: Move[];
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
        moves: Move[];
        battles: Battle[]
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
        this.battles = enemy.battles;
    }
    
    static from({ id, name, level, strength, speed, magic, dexterity, healthPoints, manaPoints, luck, defense, magicDefense, moves, battles }: EnemyPrisma & { moves: MovePrisma[]; battles: BattlePrisma[] }) {
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
            moves: moves.map((move) => Move.from(move)),
            battles: battles.map((battle) => Battle.from(battle)),
        });
    }
}