import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // 1. Verwijder alle bestaande data
  await prisma.move.deleteMany({});
  await prisma.battle.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.character.deleteMany({});
  await prisma.enemy.deleteMany({});
  
  console.log('Deleted existing data.');
  
  // 2. Maak moves data aan
  console.log('Creating moves...');
  const move1 = await prisma.move.create({
    data: {
      name: 'Fireball',
      attack: 0,
      magicAttack: 15,
      manaPoints: 60,
      aoe: true,
    },
  });
  console.log(`Created move: ${move1.name}`);
  
  const move2 = await prisma.move.create({
    data: {
      name: 'Earthquake',
      attack: 60,
      magicAttack: 0,
      manaPoints: 30,
      aoe: true,
    },
  });
  console.log(`Created move: ${move2.name}`);
  
  const move3 = await prisma.move.create({
    data: {
      name: 'Ice Spike',
      attack: 25,
      magicAttack: 45,
      manaPoints: 15,
      aoe: false,
    },
  });
  console.log(`Created move: ${move3.name}`);
  
  const move4 = await prisma.move.create({
    data: {
      name: 'Thunderstorm',
      attack: 40,
      magicAttack: 60,
      manaPoints: 35,
      aoe: true,
    },
  });
  console.log(`Created move: ${move4.name}`);

  const move5 = await prisma.move.create({
    data: {
      name: 'Shadow Strike',
      attack: 50,
      magicAttack: 20,
      manaPoints: 10,
      aoe: false,
    },
  });
  console.log(`Created move: ${move5.name}`);

  const move6 = await prisma.move.create({
    data: {
      name: 'Punch',
      attack: 10,
      magicAttack: 0,
      manaPoints: 0,
      aoe: false,
    },
  });
  console.log(`Created move: ${move6.name}`);
  
  // 2. Maak characters data aan
  console.log('Creating characters...');
  const character1 = await prisma.character.create({
    data: {
      name: 'Mage',
      level: 1,
      xp: 0,
      strength: 3,
      speed: 4,
      magic: 12,
      dexterity: 5,
      healthPoints: 80,
      manaPoints: 150,
      luck: 5,
      defense: 4,
      magicDefense: 10,
      progress: '1-1',
      characterClass: 'Mage',
      moves: {
        connect: [{ id: move1.id }, { id: move6.id }]
      },
    },
  });
  console.log(`Created character: ${character1.name}`);

  const character2 = await prisma.character.create({
    data: {
      name: 'Fighter',
      level: 1,
      xp: 0,
      strength: 10,
      speed: 6,
      magic: 3,
      dexterity: 6,
      healthPoints: 140,
      manaPoints: 30,
      luck: 3,
      defense: 8,
      magicDefense: 5,
      progress: '1-1',
      characterClass: 'Fighter',
      moves: {
        connect: [{ id: move6.id }]
      },
    },
  });
  console.log(`Created character: ${character2.name}`);

  const character3 = await prisma.character.create({
    data: {
      name: 'Thief',
      level: 1,
      xp: 0,
      strength: 7,
      speed: 10,
      magic: 5,
      dexterity: 10,
      healthPoints: 100,
      manaPoints: 50,
      luck: 7,
      defense: 5,
      magicDefense: 6,
      progress: '1-1',
      characterClass: 'Thief',
      moves: {
        connect: [{ id: move6.id }]
      },
    },
  });
  console.log(`Created character: ${character3.name}`);

  const character4 = await prisma.character.create({
    data: {
      name: 'Priest',
      level: 1,
      xp: 0,
      strength: 6,
      speed: 3,
      magic: 10,
      dexterity: 3,
      healthPoints: 90,
      manaPoints: 160,
      luck: 7,
      defense: 6,
      magicDefense: 4,
      progress: '1-1',
      characterClass: 'Priest',
      moves: {
        connect: [{ id: move6.id }]
      },
    },
  });
  console.log(`Created character: ${character4.name}`);

  const character5 = await prisma.character.create({
    data: {
      name: 'Paladin',
      level: 1,
      xp: 0,
      strength: 7,
      speed: 4,
      magic: 7,
      dexterity: 4,
      healthPoints: 130,
      manaPoints: 100,
      luck: 5,
      defense: 6,
      magicDefense: 6,
      progress: '1-1',
      characterClass: 'Paladin',
      moves: {
        connect: [{ id: move6.id }]
      },
    },
  });
  console.log(`Created character: ${character5.name}`);

  const character6 = await prisma.character.create({
    data: {
      name: 'Druid',
      level: 1,
      xp: 0,
      strength: 2,
      speed: 5,
      magic: 13,
      dexterity: 4,
      healthPoints: 170,
      manaPoints: 140,
      luck: 6,
      defense: 7,
      magicDefense: 5,
      progress: '1-1',
      characterClass: 'Druid',
      moves: {
        connect: [{ id: move6.id }]
      },
    },
  });
  console.log(`Created character: ${character6.name}`);

  const character7 = await prisma.character.create({
    data: {
      name: 'Archer',
      level: 1,
      xp: 0,
      strength: 5,
      speed: 8,
      magic: 2,
      dexterity: 10,
      healthPoints: 110,
      manaPoints: 30,
      luck: 5,
      defense: 5,
      magicDefense: 5,
      progress: '1-1',
      characterClass: 'Archer',
      moves: {
        connect: [{ id: move6.id }]
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
    password: 'securepassword',
    characterId: character1.id,
  },
});
console.log(`Created user: ${user1.name}`);

const user2 = await prisma.user.create({
  data: {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'anotherpassword',
    characterId: character2.id,
  },
});
console.log(`Created user: ${user2.name}`);

const user3 = await prisma.user.create({
  data: {
    name: 'Tom Brown',
    email: 'tom.brown@example.com',
    password: 'password123',
    characterId: character3.id,
  },
});
console.log(`Created user: ${user3.name}`);

// 4. Maak enemies data aan
console.log('Creating enemies...');
  
const enemy1 = await prisma.enemy.create({
  data: {
    name: 'slime',
    level: 1,
    strength: 5,
    speed: 10,
    magic: 0,
    dexterity: 4,
    healthPoints: 100,
    manaPoints: 0,
    luck: 5,
    defense: 6,
    magicDefense: 5,
    moves: {
      connect: [{ id: move6.id }]
    },
    battles: { connect: [] }
  },
});
console.log(`Created enemy: ${enemy1.name}`);

const enemy2 = await prisma.enemy.create({
  data: {
    name: 'skeleton',
    level: 1,
    strength: 7,
    speed: 8,
    magic: 0,
    dexterity: 6,
    healthPoints: 120,
    manaPoints: 0,
    luck: 6,
    defense: 5,
    magicDefense: 4,
    moves: {
      connect: [{ id: move6.id }]
    },
    battles: { connect: [] }
  },
});
console.log(`Created enemy: ${enemy2.name}`);

const enemy3 = await prisma.enemy.create({
  data: {
    name: 'Flame Beast',
    level: 80,
    strength: 400,
    speed: 110,
    magic: 70,
    dexterity: 230,
    healthPoints: 1400,
    manaPoints: 75,
    luck: 20,
    defense: 200,
    magicDefense: 60,
    moves: {
      connect: [{ id: move3.id }, { id: move5.id }]
    },
    battles: { connect: [] }
  },
});
console.log(`Created enemy: ${enemy3.name}`);

const enemy4 = await prisma.enemy.create({
  data: {
    name: 'slime',
    level: 1,
    strength: 5,
    speed: 5,
    magic: 0,
    dexterity: 7,
    healthPoints: 100,
    manaPoints: 0,
    luck: 5,
    defense: 3,
    magicDefense: 5,
    moves: {
      connect: [{ id: move6.id }]
    },
    battles: { connect: [] }
  },
});
console.log(`Created enemy: ${enemy4.name}`);

const enemy5 = await prisma.enemy.create({
  data: {
    name: 'skeleton',
    level: 1,
    strength: 7,
    speed: 6,
    magic: 0,
    dexterity: 5,
    healthPoints: 150,
    manaPoints: 50,
    luck: 3,
    defense: 5,
    magicDefense: 2,
    moves: {
      connect: [{ id: move6.id }]
    },
    battles: { connect: [] }
  },
});
console.log(`Created enemy: ${enemy4.name}`);

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
