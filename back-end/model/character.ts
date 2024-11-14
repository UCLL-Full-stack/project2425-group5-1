import { CharacterInput } from '../types';
import User from './user';


export default class Character {
    private id?: number;
    private name!: string;
    private level!: number;
    private xp!: number;
    private strength!: number;
    private speed!: number;
    private magic!: number;
    private dexterity!: number;
    private healthPoints!: number;
    private manaPoints!: number;
    private luck!: number;
    private defense!: number;
    private magicDefense!: number;
    private progress!: string;
    private user?: User;

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
        user?: User;
    }) {
        this.id = character.id;
        this.setName(character.name);
        this.setLevel(character.level);
        this.setXp(character.xp);
        this.setStrength(character.strength);
        this.setSpeed(character.speed);
        this.setMagic(character.magic);
        this.setDexterity(character.dexterity);
        this.setHealthPoints(character.healthPoints);
        this.setManaPoints(character.manaPoints);
        this.setLuck(character.luck);
        this.setDefense(character.defense);
        this.setMagicDefense(character.magicDefense);
        this.setProgress(character.progress);
        // this.setUser(character.user);
        this.user = character.user
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        if (!name.trim()) {
            throw new Error('Name cannot be empty');
        }
        this.name = name;
    }

    getLevel(): number {
        return this.level;
    }

    setLevel(level: number): void {
        if (level < 0) {
            throw new Error('Level must be at least 0');
        }
        this.level = level;
    }

    getXp(): number {
        return this.xp;
    }

    setXp(xp: number): void {
        if (xp < 0) {
            throw new Error('Xp cannot be negative');
        }
        this.xp = xp;
    }

    getStrength(): number {
        return this.strength;
    }

    setStrength(strength: number): void {
        if (strength < 0) {
            throw new Error('Strength cannot be negative');
        }
        this.strength = strength;
    }

    getSpeed(): number {
        return this.speed;
    }

    setSpeed(speed: number): void {
        if (speed < 0) {
            throw new Error('Speed cannot be negative');
        }
        this.speed = speed;
    }

    getMagic(): number {
        return this.magic;
    }

    setMagic(magic: number): void {
        if (magic < 0) {
            throw new Error('Magic cannot be negative');
        }
        this.magic = magic;
    }

    getDexterity(): number {
        return this.dexterity;
    }

    setDexterity(dexterity: number): void {
        if (dexterity < 0) {
            throw new Error('Dexterity cannot be negative');
        }
        this.dexterity = dexterity;
    }

    getHealthPoints(): number {
        return this.healthPoints;
    }

    setHealthPoints(healthPoints: number): void {
        if (healthPoints < 0) {
            throw new Error('Health points cannot be negative');
        }
        this.healthPoints = healthPoints;
    }

    getManaPoints(): number {
        return this.manaPoints;
    }

    setManaPoints(manaPoints: number): void {
        if (manaPoints < 0) {
            throw new Error('Mana points cannot be negative');
        }
        this.manaPoints = manaPoints;
    }

    getLuck(): number {
        return this.luck;
    }

    setLuck(luck: number): void {
        if (luck < 0) {
            throw new Error('Luck cannot be negative');
        }
        this.luck = luck;
    }

    getDefense(): number {
        return this.defense;
    }

    setDefense(defense: number): void {
        if (defense < 0) {
            throw new Error('Defense cannot be negative');
        }
        this.defense = defense;
    }

    getMagicDefense(): number {
        return this.magicDefense;
    }

    setMagicDefense(magicDefense: number): void {
        if (magicDefense < 0) {
            throw new Error('Magic defense cannot be negative');
        }
        this.magicDefense = magicDefense;
    }

    getProgress(): string {
        return this.progress;
    }

    setProgress(progress: string): void {
        if (!progress.trim()) {
            throw new Error('Progress cannot be empty');
        }
        this.progress = progress;
    }

    getUser(): User | undefined {
        return this.user;
    }

    setUser(newUser: User): void {
        const id = newUser.getId();
        const name = newUser.getName();
        const email = newUser.getEmail();
        const password = newUser.getPassword();
        this.user = new User({ id, name, email, password });
    }


    equals(character: Character): boolean {
        return (
            this.id === character.getId() &&
            this.name === character.getName() &&
            this.level === character.getLevel() &&
            this.xp === character.getXp() &&

            this.strength === character.getStrength() &&
            this.speed === character.getSpeed() &&
            this.magic === character.getMagic() &&
            this.dexterity === character.getDexterity() &&
            this.healthPoints === character.getHealthPoints() &&
            this.manaPoints === character.getManaPoints() &&
            this.luck === character.getLuck() &&
            this.defense === character.getDefense() &&
            this.magicDefense === character.getMagicDefense() &&
            this.progress === character.getProgress() &&
            (this.user ? this.user.equals(character.getUser()!) : character.getUser() === undefined)
        );
    }
}