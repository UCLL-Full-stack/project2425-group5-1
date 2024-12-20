import { Character as CharacterPrisma, Move as MovePrisma } from '@prisma/client';
import { User } from './user';
import { Move } from './move';

export class Character {
    readonly id?: number;
    readonly name: string;
    readonly level: number;
    readonly xp: number;
    readonly strength: number;
    readonly speed: number;
    readonly magic: number;
    readonly dexterity: number;
    readonly healthPoints: number;
    readonly manaPoints: number;
    readonly luck: number;
    readonly defense: number;
    readonly magicDefense: number;
    readonly progress: string;
    readonly characterClass: string;
    readonly user?: User;
    readonly moveIds: number[];

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
        characterClass: string;
        user?: User;
        moveIds: number[];
    }) {
        // this.validate(character);

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
        this.characterClass = character.characterClass;
        this.user = character.user;
        this.moveIds = character.moveIds;
    }

    static from({
        id,
        name,
        level,
        xp,
        strength,
        speed,
        magic,
        dexterity,
        healthPoints,
        manaPoints,
        luck,
        defense,
        magicDefense,
        progress,
        characterClass,
        moves,
    }: CharacterPrisma & { moves: MovePrisma[] }) {
        const moveIds = moves.map((move) => move.id);
        return new Character({
            id,
            name,
            level,
            xp,
            strength,
            speed,
            magic,
            dexterity,
            healthPoints,
            manaPoints,
            luck,
            defense,
            magicDefense,
            progress,
            characterClass,
            moveIds,
        });
    }
}
