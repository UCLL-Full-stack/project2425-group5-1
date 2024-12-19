type UserType = {
    id?: number;
    name: string;
    email: string;
    password: string;
    characterId: number;
};

type CharacterType = {
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
};

export {
    UserType,
    CharacterType,
};