type UserType = {
    id?: number;
    name: string;
    email: string;
    password: string;
    characterId?: number;
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
    characterClass: 'Fighter' | 'Archer' | 'Druid' | 'Mage' | 'Paladin' | 'Priest' | 'Thief';
    moveIds: number[];
};

type BattleType = {
    id?: number;
    turn: number;
    currentTurn: number;
    state: string;

    characterId: number;
    character?: CharacterType;
};

type worldId = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"

type MoveType = {
    id?: number;
    name: string;
    attack: number;
    magicAttack: number;
    manaPoints: number;
    aoe: boolean;
};

type EnemyType = {
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
    battles: BattleType[];
};

export { UserType, CharacterType, BattleType, MoveType, EnemyType, worldId };
