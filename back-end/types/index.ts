import UserModel from '../model/user';

type User = {
    id?: number;
    username: string;
    email: string;
    password: string;
};

type Character = {
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
    // inventory: Item[];
    // move: Move[];
    user: UserModel;
    // class: Class;
    // weapon: Weapon;
    // armor: Armor;
};
type Class = {
    id?: number;
    name: string;
    description: string;
    strength: number;
    speed: number;
    magic: number;
    dexterity: number;
    healthPoints: number;
    manaPoints: number;
    luck: number;
    defense: number;
    magicDefense: number;
    weapon: Weapon;
    armor: Armor;
};
type Battle = {
    id?: number;
    turn: number;
    currentTurn: number;
    state: {};
    character: Character;
};
type Item = {
    id?: number;
    name: string;
    description: string;
    equipable: boolean;
    consumable: boolean;
    stackable: boolean;
};
type Weapon = {
    id?: number;
    type: string;
    attack: number;
    magicAttack: number;
};
type Armor = {
    id?: number;
    type: string;
    defense: number;
    magicDefense: number;
};
type Consumable = {
    strength: number;
    speed: number;
    magic: number;
    dexterity: number;
    healthPoints: number;
    manaPoints: number;
    luck: number;
    defense: number;
    magicDefense: number;
    duration: number;
};
type Enemy = {
    id?: number;
    name: string;
    description: string;
    strength: number;
    speed: number;
    magic: number;
    dexterity: number;
    healthPoints: number;
    manaPoints: number;
    luck: number;
    defense: number;
    magicDefense: number;
};
type Move = {
    id?: number;
    name: string;
    attack: number;
    magicAttack: number;
    manaPoints: number;
    aoe: boolean;
};

export { Armor, Battle, Character, Class, Consumable, Enemy, Move, User, Weapon };
