export type UserType = {
    id?: number;
    name: string;
    email: string;
    password: string;
    characterId?: number | null;
    character?: CharacterType | null;
  };
  
  export type CharacterType = {
    id: number;
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
    progress: any; // Json
    characterClass: string;
    user?: UserType | null;
    moves: MoveType[];
    battle?: BattleType | null;
  };
  
  export type MoveType = {
    id?: number;
    name: string;
    attack: number;
    magicAttack: number;
    manaPoints: number;
    aoe: boolean;
    statusEffect?: string | null;
    cooldown?: number | null;
    elements?: ElementType[];
    characters?: CharacterType[];
    enemies?: EnemyType[];
  };
  
  export type ElementType = {
    id: number;
    name: string;
    enemies: EnemyType[];
    moves: MoveType[];
    strongAgainst: ElementType[];
    strongAgainstBy: ElementType[];
  };
  
  export type EnemyType = {
    id: number;
    name: string;
    strength: number;
    speed: number;
    magic: number;
    dexterity: number;
    healthPoints: number;
    manaPoints: number;
    luck: number;
    defense: number;
    magicDefense: number;
    world: number;
    isBoss: boolean;
    isTemplate: boolean;
    elements?: ElementType[];
    moves?: MoveType[];
    battles?: BattleType[];
  };
  
  export type BattleType = {
    id?: number;
    turnCount: number;
    currentTurn: string;
    enemies?: EnemyType[];
    character?: CharacterType;
    characterId: number;
    reward: {
      gold: number;
      xp: number;
    };
    createdAt: Date;
  };
  



// type UserType = {
//     id?: number;
//     name: string;
//     email: string;
//     password: string;
//     characterId?: number;
// };

// type ElementNames = [
//     'fire',
//     'water',
//     'earth',
//     'wind',
//     'lightning',
//     'ice',
//     'nature',
//     'dark',
//     'light',
//     'poison',
//     'arcane',
//     'metal',
//     'void',
//     'celestial'
// ];

// type ElementType = {
//     id?: number;
//     name: string;
// };

// type CharacterType = {
//     id?: number;
//     name: string;
//     level: number;
//     xp: number;
//     strength: number;
//     speed: number;
//     magic: number;
//     dexterity: number;
//     healthPoints: number;
//     manaPoints: number;
//     luck: number;
//     defense: number;
//     magicDefense: number;
//     progress: {};
//     characterClass:
//         | 'Fighter'
//         | 'Archer'
//         | 'Druid'
//         | 'Mage'
//         | 'Paladin'
//         | 'Priest'
//         | 'Thief'
//         | string;

//     user?: UserType;
//     moves: MoveType[];
//     battle?: BattleType;
// };

// type worldId = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';

// type MoveType = {
//     id?: number;
//     name: string;
//     attack: number;
//     magicAttack: number;
//     manaPoints: number;
//     aoe: boolean;
//     statusEffect?: string;
//     cooldown?: number;
//     elements: ElementType[];
//     characters: CharacterType[];
//     enemies: EnemyType[];
// };

// type EnemyType = {
//     id?: number;
//     name: string;
//     strength: number;
//     speed: number;
//     magic: number;
//     dexterity: number;
//     healthPoints: number;
//     manaPoints: number;
//     luck: number;
//     defense: number;
//     magicDefense: number;

//     element: ElementType[];
//     moves: MoveType[];
//     battles: BattleType[];
// };

// type BattleType = {
//     id?: number;
//     turnCount: number;
//     currentTurn: string; // "player" | "enemy"
//     characterId: number;
//     reward: {};
//     createdAt: Date;

//     enemies: EnemyType[];
// };

// export {
//     UserType,
//     CharacterType,
//     MoveType,
//     EnemyType,
//     worldId,
//     BattleType,
//     ElementType,
//     ElementNames,
// };
