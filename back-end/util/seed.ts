import { PrismaClient } from '@prisma/client';
import encryptor from '../helpers/encryptor';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Delete all existing data
  await prisma.move.deleteMany({});
  await prisma.battle.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.character.deleteMany({});
  await prisma.enemy.deleteMany({});
  await prisma.element.deleteMany({});
  
  console.log('Deleted existing data.');

  // Create elements
  console.log('Creating elements...');

  const elementFire = await prisma.element.create({
    data: {
      name: "fire",
    },
  });
  console.log(`Created element: ${elementFire.name}`);

  const elementPoison = await prisma.element.create({
    data: {
      name: "poison",
    },
  });
  console.log(`Created element: ${elementPoison.name}`);

  const elementWind = await prisma.element.create({
    data: {
      name: "wind",
    },
  });
  console.log(`Created element: ${elementWind.name}`);

  const elementEarth = await prisma.element.create({
    data: {
      name: "earth",
    },
  });
  console.log(`Created element: ${elementEarth.name}`);

  const elementDark = await prisma.element.create({
    data: {
      name: "dark",
    },
  });
  console.log(`Created element: ${elementDark.name}`);

  const elementVoid = await prisma.element.create({
    data: {
      name: "void",
    },
  });
  console.log(`Created element: ${elementVoid.name}`);

  const elementWater = await prisma.element.create({
    data: {
      name: "water",
    },
  });
  console.log(`Created element: ${elementWater.name}`);

  const elementArcane = await prisma.element.create({
    data: {
      name: "arcane",
    },
  });
  console.log(`Created element: ${elementArcane.name}`);

  const elementLight = await prisma.element.create({
    data: {
      name: "light",
    },
  });
  console.log(`Created element: ${elementLight.name}`);

  const elementCelestial = await prisma.element.create({
    data: {
      name: "celestial",
    },
  });
  console.log(`Created element: ${elementCelestial.name}`);

  const elementNature = await prisma.element.create({
    data: {
      name: "nature",
    },
  });
  console.log(`Created element: ${elementNature.name}`);

  const elementMetal = await prisma.element.create({
    data: {
      name: "metal",
    },
  });
  console.log(`Created element: ${elementMetal.name}`);

  const elementLightning = await prisma.element.create({
    data: {
      name: "lightning",
    },
  });
  console.log(`Created element: ${elementLightning.name}`);

  const elementIce = await prisma.element.create({
    data: {
      name: "ice",
    },
  });
  console.log(`Created element: ${elementIce.name}`);
  
  // Create moves
  console.log('Creating moves...');

  const mageMoveApprentice1 = await prisma.move.create({
    data: {
      name: "Spark",
      attack: 0,
      magicAttack: 10,
      manaPoints: 3,
      aoe: false,
      elements: {
        connect: [{
          id: elementLightning.id,
        }]
      },
      statusEffect: null,
      cooldown: 0,
    },
  });
  console.log(`Created move: ${mageMoveApprentice1.name}`);

  const mageMoveApprentice2 = await prisma.move.create({
    data: {
      name: "Arcane Dart",
      attack: 0,
      magicAttack: 8,
      manaPoints: 2,
      aoe: false,
      elements: {
        connect: [{
          id: elementArcane.id,
        }]
      },
      statusEffect: null,
      cooldown: 0,
    },
  });
  console.log(`Created move: ${mageMoveApprentice2.name}`);

  const mageMoveApprentice3 = await prisma.move.create({
    data: {
      name: "Mana Trickle",
      attack: 0,
      magicAttack: 0,
      manaPoints: 4,
      aoe: false,
      elements: {
        connect: [{
          id: elementArcane.id,
        }]
      },
      statusEffect: "regen-mp",
      cooldown: 3,
    },
  });
  console.log(`Created move: ${mageMoveApprentice3.name}`);

  const mageMoveApprentice4 = await prisma.move.create({
    data: {
      name: "Magic Shield",
      attack: 0,
      magicAttack: 0,
      manaPoints: 5,
      aoe: false,
      elements: {
        connect: [{
          id: elementArcane.id,
        }]
      },
      statusEffect: "magic-resist",
      cooldown: 4,
    },
  });
  console.log(`Created move: ${mageMoveApprentice4.name}`);

  const mageMoveAdept1 = await prisma.move.create({
    data: {
      name: "Flame Lance",
      attack: 0,
      magicAttack: 20,
      manaPoints: 8,
      aoe: false,
      elements: {
        connect: [{
          id: elementFire.id,
        }]
      },
      statusEffect: "burn",
      cooldown: 2,
    },
  });
  console.log(`Created move: ${mageMoveApprentice4.name}`);

  const mageMoveAdept2 = await prisma.move.create({
    data: {
      name: "Ice Shard",
      attack: 0,
      magicAttack: 16,
      manaPoints: 6,
      aoe: false,
      elements: {
        connect: [{
          id: elementIce.id,
        }]
      },
      statusEffect: "slow",
      cooldown: 2,
    },
  });
  console.log(`Created move: ${mageMoveAdept2.name}`);

  const mageMoveAdept3 = await prisma.move.create({
    data: {
      name: "Mana Tap",
      attack: 0,
      magicAttack: 0,
      manaPoints: 6,
      aoe: false,
      elements: {
        connect: [{
          id: elementArcane.id,
        }]
      },
      statusEffect: "drain-mp",
      cooldown: 3,
    },
  });
  console.log(`Created move: ${mageMoveAdept3.name}`);

  const mageMoveAdept4 = await prisma.move.create({
    data: {
      name: "Mirror Veil",
      attack: 0,
      magicAttack: 0,
      manaPoints: 10,
      aoe: false,
      elements: {
        connect: [{
          id: elementLight.id,
        }]
      },
      statusEffect: "reflect",
      cooldown: 5,
    },
  });
  console.log(`Created move: ${mageMoveAdept4.name}`);

  const mageMoveExpert1 = await prisma.move.create({
    data: {
      name: "Chain Lightning",
      attack: 0,
      magicAttack: 25,
      manaPoints: 12,
      aoe: true,
      elements: {
        connect: [{
          id: elementLightning.id,
        }]
      },
      statusEffect: "stun",
      cooldown: 3,
    },
  });
  console.log(`Created move: ${mageMoveExpert1.name}`);

  const mageMoveExpert2 = await prisma.move.create({
    data: {
      name: "Comet Fall",
      attack: 0,
      magicAttack: 30,
      manaPoints: 15,
      aoe: true,
      elements: {
        connect: [{
          id: elementEarth.id,
        },
        {
          id: elementFire.id,
        }]
      },
      statusEffect: null,
      cooldown: 3,
    },
  });
  console.log(`Created move: ${mageMoveExpert2.name}`);

  const mageMoveExpert3 = await prisma.move.create({
    data: {
      name: "Mana Surge",
      attack: 0,
      magicAttack: 0,
      manaPoints: 10,
      aoe: false,
      elements: {
        connect: [{
          id: elementArcane.id,
        }]
      },
      statusEffect: "restore-mp",
      cooldown: 4,
    },
  });
  console.log(`Created move: ${mageMoveExpert3.name}`);

  const mageMoveExpert4 = await prisma.move.create({
    data: {
      name: "Astral Armor",
      attack: 0,
      magicAttack: 0,
      manaPoints: 12,
      aoe: true,
      elements: {
        connect: [{
          id: elementArcane.id,
        }]
      },
      statusEffect: "buff-magic-defense",
      cooldown: 4,
    },
  });
  console.log(`Created move: ${mageMoveExpert4.name}`);

  const mageMoveMaster1 = await prisma.move.create({
    data: {
      name: "Inferno",
      attack: 0,
      magicAttack: 40,
      manaPoints: 18,
      aoe: true,
      elements: {
        connect: [{
          id: elementFire.id,
        }]
      },
      statusEffect: "burn",
      cooldown: 4,
    },
  });
  console.log(`Created move: ${mageMoveMaster1.name}`);

  const mageMoveMaster2 = await prisma.move.create({
    data: {
      name: "Glacial Tomb",
      attack: 0,
      magicAttack: 35,
      manaPoints: 15,
      aoe: false,
      elements: {
        connect: [{
          id: elementIce.id,
        }]
      },
      statusEffect: "freeze",
      cooldown: 5,
    },
  });
  console.log(`Created move: ${mageMoveMaster2.name}`);

  const mageMoveMaster3 = await prisma.move.create({
    data: {
      name: "Arcane Echo",
      attack: 0,
      magicAttack: 0,
      manaPoints: 20,
      aoe: false,
      elements: {
        connect: [{
          id: elementArcane.id,
        }]
      },
      statusEffect: "recast-last",
      cooldown: 5,
    },
  });
  console.log(`Created move: ${mageMoveMaster3.name}`);

  const mageMoveMaster4 = await prisma.move.create({
    data: {
      name: "Time Dilation",
      attack: 0,
      magicAttack: 0,
      manaPoints: 20,
      aoe: true,
      elements: {
        connect: [{
          id: elementVoid.id,
        }]
      },
      statusEffect: "speed-up",
      cooldown: 6,
    },
  });
  console.log(`Created move: ${mageMoveMaster4.name}`);

  const mageMoveGrandmaster1 = await prisma.move.create({
    data: {
      name: "Voidstorm",
      attack: 0,
      magicAttack: 50,
      manaPoints: 30,
      aoe: true,
      elements: {
        connect: [{
          id: elementVoid.id,
        }]
      },
      statusEffect: "silence",
      cooldown: 6,
    },
  });
  console.log(`Created move: ${mageMoveGrandmaster1.name}`);

  const mageMoveGrandmaster2 = await prisma.move.create({
    data: {
      name: "Mana Overdrive",
      attack: 0,
      magicAttack: 0,
      manaPoints: 25,
      aoe: false,
      elements: {
        connect: [{
          id: elementNature.id,
        }]
      },
      statusEffect: "double-power",
      cooldown: 8,
    },
  });
  console.log(`Created move: ${mageMoveGrandmaster2.name}`);

  const mageMoveGrandmaster3 = await prisma.move.create({
    data: {
      name: "Reality Fracture",
      attack: 0,
      magicAttack: 45,
      manaPoints: 35,
      aoe: false,
      elements: {
        connect: [{
          id: elementCelestial.id,
        }]
      },
      statusEffect: "mana-based-damage",
      cooldown: 6,
    },
  });
  console.log(`Created move: ${mageMoveGrandmaster3.name}`);

  const mageMoveGrandmaster4 = await prisma.move.create({
    data: {
      name: "Final Spark",
      attack: 0,
      magicAttack: 60,
      manaPoints: 40,
      aoe: false,
      elements: {
        connect: [{
          id: elementLightning.id,
        }]
      },
      statusEffect: null,
      cooldown: 8,
    },
  });
  console.log(`Created move: ${mageMoveGrandmaster4.name}`);

  const movePunch = await prisma.move.create({
    data: {
      name: 'Punch',
      attack: 10,
      magicAttack: 0,
      manaPoints: 0,
      aoe: false,
      statusEffect: null,
    },
  });
  console.log(`Created move: ${movePunch.name}`);
  
  // 2. Maak characters data aan
  console.log('Creating characters...');
  const character1 = await prisma.character.create({
    data: {
      name: 'Mage',
      strength: 2,
      speed: 4,
      magic: 10,
      dexterity: 5,
      healthPoints: 18,
      manaPoints: 25,
      luck: 3,
      defense: 2,
      magicDefense: 6,
      progress: {
        world: 1,
        level: 1,
      },
      characterClass: 'Mage',
      level: 1,
      xp: 0,
      moves: {
        connect: [{ id: mageMoveApprentice1.id }]
      },
    },
  });
  console.log(`Created character: ${character1.name}`);

  const character2 = await prisma.character.create({
    data: {
      name: 'Fighter',
      strength: 9,
      speed: 5,
      magic: 1,
      dexterity: 6,
      healthPoints: 30,
      manaPoints: 5,
      luck: 3,
      defense: 7,
      magicDefense: 2,
      progress: {
        world: 1,
        level: 1,
      },
      characterClass: 'Fighter',
      level: 1,
      xp: 0,
      moves: {
        connect: [{ id: movePunch.id }]
      },
    },
  });
  console.log(`Created character: ${character2.name}`);

  const character3 = await prisma.character.create({
    data: {
      name: 'Thief',
      strength: 5,
      speed: 8,
      magic: 2,
      dexterity: 8,
      healthPoints: 22,
      manaPoints: 8,
      luck: 6,
      defense: 3,
      magicDefense: 3,
      progress: {
        world: 1,
        level: 1,
      },
      characterClass: 'Thief',
      level: 1,
      xp: 0,
      moves: {
        connect: [{ id: movePunch.id }]
      },
    },
  });
  console.log(`Created character: ${character3.name}`);

  const character4 = await prisma.character.create({
    data: {
      name: 'Priest',
      strength: 2,
      speed: 4,
      magic: 9,
      dexterity: 4,
      healthPoints: 24,
      manaPoints: 22,
      luck: 4,
      defense: 3,
      magicDefense: 6,
      progress: {
        world: 1,
        level: 1,
      },
      characterClass: 'Priest',
      level: 1,
      xp: 0,
      moves: {
        connect: [{ id: movePunch.id }]
      },
    },
  });
  console.log(`Created character: ${character4.name}`);

  const character5 = await prisma.character.create({
    data: {
      name: 'Paladin',
      strength: 7,
      speed: 3,
      magic: 4,
      dexterity: 5,
      healthPoints: 32,
      manaPoints: 10,
      luck: 2,
      defense: 9,
      magicDefense: 5,
      progress: {
        world: 1,
        level: 1,
      },
      characterClass: 'Paladin',
      level: 1,
      xp: 0,
      moves: {
        connect: [{ id: movePunch.id }]
      },
    },
  });
  console.log(`Created character: ${character5.name}`);

  const character6 = await prisma.character.create({
    data: {
      name: 'Druid',
      strength: 4,
      speed: 5,
      magic: 8,
      dexterity: 5,
      healthPoints: 22,
      manaPoints: 20,
      luck: 3,
      defense: 3,
      magicDefense: 5,
      progress: {
        world: 1,
        level: 1,
      },
      characterClass: 'Druid',
      level: 1,
      xp: 0,
      moves: {
        connect: [{ id: movePunch.id }]
      },
    },
  });
  console.log(`Created character: ${character6.name}`);

  const character7 = await prisma.character.create({
    data: {
      name: 'Archer',
      strength: 6,
      speed: 7,
      magic: 2,
      dexterity: 9,
      healthPoints: 24,
      manaPoints: 6,
      luck: 4,
      defense: 3,
      magicDefense: 2,
      progress: {
        world: 1,
        level: 1,
      },
      characterClass: 'Archer',
      level: 1,
      xp: 0,
      moves: {
        connect: [{ id: movePunch.id }]
      },
    },
  });
  console.log(`Created character: ${character7.name}`);

// 3. Maak users data aan en koppel ze aan characters
console.log('Creating users...');
const user1 = await prisma.user.create({
  data: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: await encryptor('securepassword'),
  },
});
console.log(`Created user: ${user1.name}`);

const user2 = await prisma.user.create({
  data: {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: await encryptor('anotherpassword'),
  },
});
console.log(`Created user: ${user2.name}`);

const user3 = await prisma.user.create({
  data: {
    name: 'Tom Brown',
    email: 'tom.brown@example.com',
    password: await encryptor('password123'),
  },
});
console.log(`Created user: ${user3.name}`);

const userTest = await prisma.user.create({
  data: {
    name: 'test',
    email: 'test@gmail.com',
    password: await encryptor('test'),
  },
});
console.log(`Created user: ${userTest.name}`);

// 4. Maak enemies data aan
console.log('Creating enemies...');
  
const enemyTypeEasy1 = await prisma.enemy.create({
  data: {
    name: 'Slime',
    strength: 4,
    speed: 2,
    magic: 1,
    dexterity: 2,
    healthPoints: 15,
    manaPoints: 5,
    luck: 3,
    defense: 2,
    magicDefense: 1,
    elements: {
      connect: [{ id: elementPoison.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 1,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeEasy1.name}`);

const enemyTypeEasy2 = await prisma.enemy.create({
  data: {
    name: 'Rat',
    strength: 3,
    speed: 6,
    magic: 0,
    dexterity: 4,
    healthPoints: 10,
    manaPoints: 0,
    luck: 2,
    defense: 1,
    magicDefense: 1,
    elements: {
      connect: [{ id: elementNature.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 1,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeEasy2.name}`);

const enemyTypeEasy3 = await prisma.enemy.create({
  data: {
    name: 'Bat',
    strength: 2,
    speed: 7,
    magic: 1,
    dexterity: 5,
    healthPoints: 8,
    manaPoints: 5,
    luck: 3,
    defense: 1,
    magicDefense: 2,
    elements: {
      connect: [{ id: elementWind.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 1,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeEasy3.name}`);

const enemyTypeEasy4 = await prisma.enemy.create({
  data: {
    name: 'Goblin',
    strength: 6,
    speed: 4,
    magic: 0,
    dexterity: 3,
    healthPoints: 18,
    manaPoints: 0,
    luck: 2,
    defense: 3,
    magicDefense: 1,
    elements: {
      connect: [{ id: elementFire.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 1,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeEasy4.name}`);

const enemyTypeEasy5 = await prisma.enemy.create({
  data: {
    name: 'Skeleton',
    strength: 8,
    speed: 3,
    magic: 0,
    dexterity: 3,
    healthPoints: 20,
    manaPoints: 0,
    luck: 1,
    defense: 5,
    magicDefense: 2,
    elements: {
      connect: [{ id: elementDark.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 1,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeEasy5.name}`);

const enemyTypeEasy6 = await prisma.enemy.create({
  data: {
    name: 'Zombie',
    strength: 5,
    speed: 2,
    magic: 0,
    dexterity: 2,
    healthPoints: 25,
    manaPoints: 0,
    luck: 1,
    defense: 4,
    magicDefense: 1,
    elements: {
      connect: [{ id: elementPoison.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 1,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeEasy6.name}`);


const enemyTypeMid1 = await prisma.enemy.create({
  data: {
    name: 'Orc',
    strength: 12,
    speed: 4,
    magic: 0,
    dexterity: 4,
    healthPoints: 40,
    manaPoints: 0,
    luck: 3,
    defense: 6,
    magicDefense: 3,
    elements: {
      connect: [{ id: elementEarth.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 2,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeMid1.name}`);

const enemyTypeMid2 = await prisma.enemy.create({
  data: {
    name: 'Bandit',
    strength: 8,
    speed: 5,
    magic: 0,
    dexterity: 6,
    healthPoints: 30,
    manaPoints: 0,
    luck: 4,
    defense: 3,
    magicDefense: 2,
    elements: {
      connect: [{ id: elementWind.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 2,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeMid2.name}`);

const enemyTypeMid3 = await prisma.enemy.create({
  data: {
    name: 'Fire Slime',
    strength: 5,
    speed: 3,
    magic: 4,
    dexterity: 3,
    healthPoints: 25,
    manaPoints: 12,
    luck: 2,
    defense: 2,
    magicDefense: 4,
    elements: {
      connect: [{ id: elementFire.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 2,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeMid3.name}`);

const enemyTypeMid4 = await prisma.enemy.create({
  data: {
    name: 'Wraith',
    strength: 6,
    speed: 5,
    magic: 7,
    dexterity: 4,
    healthPoints: 35,
    manaPoints: 20,
    luck: 5,
    defense: 2,
    magicDefense: 6,
    elements: {
      connect: [{ id: elementVoid.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 2,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeMid4.name}`);

const enemyTypeMid5 = await prisma.enemy.create({
  data: {
    name: 'Harpy',
    strength: 7,
    speed: 8,
    magic: 2,
    dexterity: 6,
    healthPoints: 30,
    manaPoints: 10,
    luck: 4,
    defense: 3,
    magicDefense: 2,
    elements: {
      connect: [{ id: elementWind.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 2,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeMid5.name}`);

const enemyTypeMid6 = await prisma.enemy.create({
  data: {
    name: 'Lizardman',
    strength: 9,
    speed: 5,
    magic: 3,
    dexterity: 5,
    healthPoints: 40,
    manaPoints: 8,
    luck: 3,
    defense: 6,
    magicDefense: 4,
    elements: {
      connect: [{ id: elementWater.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 2,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeMid6.name}`);

const enemyTypeLate1 = await prisma.enemy.create({
  data: {
    name: 'Demon Knight',
    strength: 18,
    speed: 6,
    magic: 5,
    dexterity: 4,
    healthPoints: 75,
    manaPoints: 25,
    luck: 5,
    defense: 15,
    magicDefense: 8,
    elements: {
      connect: [{ id: elementDark.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 3,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeLate1.name}`);

const enemyTypeLate2 = await prisma.enemy.create({
  data: {
    name: 'Lich',
    strength: 6,
    speed: 4,
    magic: 15,
    dexterity: 2,
    healthPoints: 60,
    manaPoints: 40,
    luck: 4,
    defense: 8,
    magicDefense: 12,
    elements: {
      connect: [{ id: elementArcane.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 3,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeLate2.name}`);

const enemyTypeLate3 = await prisma.enemy.create({
  data: {
    name: 'Chimera',
    strength: 20,
    speed: 6,
    magic: 3,
    dexterity: 5,
    healthPoints: 100,
    manaPoints: 15,
    luck: 5,
    defense: 12,
    magicDefense: 5,
    elements: {
      connect: [{ id: elementPoison.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 3,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeLate3.name}`);


const enemyTypeLate4 = await prisma.enemy.create({
  data: {
    name: 'Shadow Assassin',
    strength: 12,
    speed: 9,
    magic: 4,
    dexterity: 8,
    healthPoints: 50,
    manaPoints: 20,
    luck: 6,
    defense: 5,
    magicDefense: 3,
    elements: {
      connect: [{ id: elementVoid.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 3,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeLate4.name}`);

const enemyTypeLate5 = await prisma.enemy.create({
  data: {
    name: 'Flame Dragon',
    strength: 30,
    speed: 5,
    magic: 12,
    dexterity: 4,
    healthPoints: 150,
    manaPoints: 60,
    luck: 3,
    defense: 18,
    magicDefense: 10,
    elements: {
      connect: [{ id: elementFire.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 3,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeLate5.name}`);

const enemyTypeLate6 = await prisma.enemy.create({
  data: {
    name: 'Archangel',
    strength: 15,
    speed: 7,
    magic: 10,
    dexterity: 6,
    healthPoints: 90,
    manaPoints: 50,
    luck: 4,
    defense: 12,
    magicDefense: 15,
    elements: {
      connect: [{ id: elementLight.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 3,
    isBoss: false,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyTypeLate6.name}`);

const enemyBoss1 = await prisma.enemy.create({
  data: {
    name: 'The Slime King',
    strength: 10,
    speed: 3,
    magic: 4,
    dexterity: 2,
    healthPoints: 80,
    manaPoints: 20,
    luck: 2,
    defense: 10,
    magicDefense: 5,
    elements: {
      connect: [{ id: elementPoison.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 1,
    isBoss: true,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyBoss1.name}`);

const enemyBoss2 = await prisma.enemy.create({
  data: {
    name: 'The Forest Troll',
    strength: 16,
    speed: 2,
    magic: 0,
    dexterity: 3,
    healthPoints: 120,
    manaPoints: 0,
    luck: 1,
    defense: 12,
    magicDefense: 2,
    elements: {
      connect: [{ id: elementEarth.id }, {id: elementNature.id}]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 2,
    isBoss: true,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyBoss2.name}`);

const enemyBoss3 = await prisma.enemy.create({
  data: {
    name: 'The Howling Shade',
    strength: 8,
    speed: 7,
    magic: 14,
    dexterity: 6,
    healthPoints: 90,
    manaPoints: 40,
    luck: 5,
    defense: 4,
    magicDefense: 10,
    elements: {
      connect: [{ id: elementDark.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 3,
    isBoss: true,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyBoss3.name}`);

const enemyBoss4 = await prisma.enemy.create({
  data: {
    name: 'Bone Tyrant',
    strength: 14,
    speed: 4,
    magic: 8,
    dexterity: 4,
    healthPoints: 100,
    manaPoints: 30,
    luck: 3,
    defense: 8,
    magicDefense: 6,
    elements: {
      connect: [{ id: elementDark.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 4,
    isBoss: true,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyBoss4.name}`);

const enemyBoss5 = await prisma.enemy.create({
  data: {
    name: 'The Flame Bringer',
    strength: 20,
    speed: 6,
    magic: 12,
    dexterity: 5,
    healthPoints: 150,
    manaPoints: 60,
    luck: 4,
    defense: 10,
    magicDefense: 8,
    elements: {
      connect: [{ id: elementFire.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 5,
    isBoss: true,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyBoss5.name}`);

const enemyBoss6 = await prisma.enemy.create({
  data: {
    name: 'Nyssara of the Deep',
    strength: 16,
    speed: 5,
    magic: 18,
    dexterity: 6,
    healthPoints: 140,
    manaPoints: 80,
    luck: 5,
    defense: 9,
    magicDefense: 14,
    elements: {
      connect: [{ id: elementWater.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 6,
    isBoss: true,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyBoss6.name}`);

const enemyBoss7 = await prisma.enemy.create({
  data: {
    name: 'The Clockwork Colossus',
    strength: 24,
    speed: 2,
    magic: 4,
    dexterity: 3,
    healthPoints: 200,
    manaPoints: 20,
    luck: 2,
    defense: 20,
    magicDefense: 6,
    elements: {
      connect: [{ id: elementMetal.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 7,
    isBoss: true,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyBoss7.name}`);

const enemyBoss8 = await prisma.enemy.create({
  data: {
    name: 'The Corrupted Ent',
    strength: 18,
    speed: 3,
    magic: 10,
    dexterity: 4,
    healthPoints: 180,
    manaPoints: 50,
    luck: 3,
    defense: 15,
    magicDefense: 10,
    elements: {
      connect: [{ id: elementNature.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 8,
    isBoss: true,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyBoss8.name}`);

const enemyBoss9 = await prisma.enemy.create({
  data: {
    name: 'The World-Eater',
    strength: 35,
    speed: 8,
    magic: 20,
    dexterity: 8,
    healthPoints: 300,
    manaPoints: 150,
    luck: 6,
    defense: 20,
    magicDefense: 18,
    elements: {
      connect: [{ id: elementVoid.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 9,
    isBoss: true,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyBoss9.name}`);

const enemyBoss10 = await prisma.enemy.create({
  data: {
    name: 'Celesta, Blade of the Heavens',
    strength: 28,
    speed: 10,
    magic: 22,
    dexterity: 9,
    healthPoints: 250,
    manaPoints: 120,
    luck: 7,
    defense: 18,
    magicDefense: 20,
    elements: {
      connect: [{ id: elementCelestial.id }]
    },
    moves: {
      connect: [{ id: movePunch.id }]
    },
    world: 10,
    isBoss: true,
    isTemplate: true,
  },
});
console.log(`Created enemyType: ${enemyBoss10.name}`);

// 6. Maak battles data aan
console.log('Creating battles...');
// const battle1 = await prisma.battle.create({
//   data: {
//     turn: 1,
//     currentTurn: 1,
//     state: 'ongoing',
//     characterId: character1.id,
//   },
// });
// console.log(`Created battle with ID: ${battle1.id}`);

// const battle2 = await prisma.battle.create({
//   data: {
//     turn: 1,
//     currentTurn: 1,
//     state: 'ongoing',
//     characterId: character2.id,
//   },
// });
// console.log(`Created battle with ID: ${battle2.id}`);

// const battle3 = await prisma.battle.create({
//   data: {
//     turn: 1,
//     currentTurn: 1,
//     state: 'ongoing',
//     characterId: character3.id,
//   },
// });
// console.log(`Created battle with ID: ${battle3.id}`);

// 7. Link battles to enemies
// await prisma.enemy.update({
//   where: { id: enemy1.id },
//   data: {
//     battles: {
//       connect: [{ id: battle1.id }],
//     },
//   },
// });
// console.log(`Linked enemy ${enemy1.name} to battle ${battle1.id}`);

// await prisma.enemy.update({
//   where: { id: enemy2.id },
//   data: {
//     battles: {
//       connect: [{ id: battle2.id }],
//     },
//   },
// });
// console.log(`Linked enemy ${enemy2.name} to battle ${battle2.id}`);

// await prisma.enemy.update({
//   where: { id: enemy3.id },
//   data: {
//     battles: {
//       connect: [{ id: battle3.id }],
//     },
//   },
// });
// console.log(`Linked enemy ${enemy3.name} to battle ${battle3.id}`);

console.log('Seed data successfully added!');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
