import Character from "./character";

export class CharacterClass {

    private id?: number;
    private name:         string;
    private strength:     number;
    private speed:        number;
    private magic:        number;
    private dexterity:    number;
    private healthPoints: number;
    private manaPoints:   number;
    private luck:         number;
    private defense:      number;
    private magicDefense: number;
    private characters: Character[];

    constructor(characterClass: {
        id?: number;
        name: string;
        strength:     number;
        speed:        number;
        magic:        number;
        dexterity:    number;
        healthPoints: number;
        manaPoints:   number;
        luck:         number;
        defense:      number;
        magicDefense: number;
        characters: Character[];
    }) {
        this.id = characterClass.id;
        this.name = characterClass.name;
        this.strength = characterClass.strength;
        this.speed = characterClass.speed;
        this.magic = characterClass.magic;
        this.dexterity = characterClass.dexterity;
        this.healthPoints = characterClass.healthPoints;
        this.manaPoints = characterClass.manaPoints;
        this.luck = characterClass.luck;
        this.defense = characterClass.defense;
        this.magicDefense = characterClass.magicDefense;
        this.characters = characterClass.characters;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
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

    getCharacter(): Character[] {
        return this.characters;
    }

    equals(characterClass: CharacterClass): boolean {
        return (
            this.id === characterClass.getId() &&
            this.name === characterClass.getName() &&
            this.strength === characterClass.getStrength() &&
            this.speed === characterClass.getSpeed() &&
            this.magic === characterClass.getMagic() &&
            this.dexterity === characterClass.getDexterity() &&
            this.healthPoints === characterClass.getHealthPoints() &&
            this.manaPoints === characterClass.getManaPoints() &&
            this.luck === characterClass.getLuck() &&
            this.defense === characterClass.getDefense() &&
            this.magicDefense === characterClass.getMagicDefense() &&
            this.characters.every( (character, index) => character.equals(characterClass.getCharacter()[index]))
        );
    }
}