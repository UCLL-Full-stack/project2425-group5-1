import { User } from '../types';

export class Character {
    private id?: number;
    private name: string;
    private level: number;
    private xp: number;
    private strength: number;
    private speed: number;
    private magic: number;
    private dexterity: number;
    private healthPoints: number;
    private manaPoints: number;
    private luck: number;
    private defense: number;
    private magicDefense: number;
    private progress: string;
    private User: User;

    constructor(character: {
        id?: number;
        name: string;
        level: number;
        xp: number;
        strength: number;
        speed: number;
        magic: number;
        dexterity: number;
        healthPoints: number;
        manaPoints: number;
        luck: number;
        defense: number;
        magicDefense: number;
        progress: string;
        User: User;
    }) {
        this.id = character.id;
        this.name = character.name;
        this.level = character.level;
        this.xp = character.xp;
        this.strength = character.strength;
        this.speed = character.speed;
        this.magic = character.magic;
        this.dexterity = character.dexterity;
        this.healthPoints = character.healthPoints;
        this.manaPoints = character.manaPoints;
        this.luck = character.luck;
        this.defense = character.defense;
        this.magicDefense = character.magicDefense;
        this.progress = character.progress;
        this.User = character.User;
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
    getXp(): number {
        return this.xp;
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
    getProgress(): string {
        return this.progress;
    }
    getUser(): User {
        return this.User;
    }
}
