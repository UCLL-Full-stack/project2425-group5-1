import { StaticImageData } from "next/image";

type User = {
  id?: number;
  username: string;
  email: string;
  password: string;
  characterId?: number;
};

type Character = {
  id?: number;
  name: string;
  characterClass: string;
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
  progress: {
    world: number,
    level: number,
  };
  inventory?: Item[];
  moves: Move[];
  userId?: number;
  class?: Class;
  weapon?: Weapon;
  armor?: Armor;
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
type BattleType = {
  id?: number;
  turn: number;
  currentTurn: number;
  state: string;
  characterId: number;
  character?: Character;
}
type Item = {
  id: number;
  name: string;
  description: string;
  equipable: boolean;
  consumable: boolean;
  stackable: boolean;
  image: StaticImageData;
  price: number;
};
type Weapon = Item & {
  id?: number;
  type: string;
  attack: number;
  magicAttack: number;
};
type Armor = Item & {
  id?: number;
  type: string;
  defense: number;
  magicDefense: number;
};
type Consumable = Item & {
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
type EnemyType = {
  id?: number;
  name: string;
  description: string;
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
  state: string;
};
type Move = {
  id?: number;
  name: string;
  attack: number;
  magicAttack: number;
  manaPoints: number;
  aoe: boolean;
};

type Vector2D = [x: number, y: number];

export type {
  Armor,
  BattleType,
  Character,
  Class,
  Consumable,
  EnemyType,
  Item,
  Move,
  User,
  Weapon,
  Vector2D,
};


const move1 = {
  data: {
    name: 'Fireball',
    attack: 30,
    magicAttack: 50,
    manaPoints: 20,
    aoe: false,
  },
}

const move2 = {
  data: {
    name: 'Heal',
    attack: 0,
    magicAttack: 30,
    manaPoints: 15,
    aoe: false,
  },
}

const move3 = {
  data: {
    name: 'slash',
    attack: 40,
    magicAttack: 0,
    manaPoints: 0,
    aoe: true,
  },
}
