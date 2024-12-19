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
      attack: 30,
      magicAttack: 50,
      manaPoints: 20,
      aoe: false,
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
  
  // 2. Maak characters data aan
  console.log('Creating characters...');
  const character1 = await prisma.character.create({
    data: {
      name: 'Mage',
      level: 5,
      xp: 800,
      strength: 3,
      speed: 4,
      magic: 12,
      dexterity: 5,
      healthPoints: 60,
      manaPoints: 100,
      luck: 5,
      defense: 4,
      magicDefense: 10,
      progress: 'Beginner',
      characterClass: 'Mage',
      moves: {
        connect: [{ id: move1.id }, { id: move2.id }]
      },
    },
  });
  console.log(`Created character: ${character1.name}`);

  const character2 = await prisma.character.create({
    data: {
      name: 'Warrior',
      level: 8,
      xp: 1200,
      strength: 15,
      speed: 8,
      magic: 3,
      dexterity: 7,
      healthPoints: 120,
      manaPoints: 50,
      luck: 8,
      defense: 12,
      magicDefense: 8,
      progress: 'Intermediate',
      characterClass: 'Warrior',
      moves: {
        connect: [{ id: move3.id }, { id: move4.id }]
      },
    },
  });
  console.log(`Created character: ${character2.name}`);

  const character3 = await prisma.character.create({
    data: {
      name: 'Rogue',
      level: 3,
      xp: 500,
      strength: 8,
      speed: 10,
      magic: 5,
      dexterity: 9,
      healthPoints: 80,
      manaPoints: 60,
      luck: 6,
      defense: 6,
      magicDefense: 5,
      progress: 'Beginner',
      characterClass: 'Rogue',
      moves: {
        connect: [{ id: move2.id }, { id: move5.id }]
      },
    },
  });
  console.log(`Created character: ${character3.name}`);

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
    name: 'Goblin',
    level: 100,
    strength: 500,
    speed: 100,
    magic: 50,
    dexterity: 250,
    healthPoints: 1500,
    manaPoints: 50,
    luck: 25,
    defense: 250,
    magicDefense: 50,
    moves: {
      connect: [{ id: move2.id }, { id: move5.id }]
    },
    battles: { connect: [] }
  },
});
console.log(`Created enemy: ${enemy1.name}`);

const enemy2 = await prisma.enemy.create({
  data: {
    name: 'Dark Knight',
    level: 120,
    strength: 600,
    speed: 90,
    magic: 60,
    dexterity: 200,
    healthPoints: 1800,
    manaPoints: 100,
    luck: 15,
    defense: 300,
    magicDefense: 75,
    moves: {
      connect: [{ id: move2.id }, { id: move4.id }]
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

// 6. Maak battles data aan
console.log('Creating battles...');
const battle1 = await prisma.battle.create({
  data: {
    turn: 1,
    currentTurn: 1,
    state: 'ongoing',
    characterId: character1.id,
  },
});
console.log(`Created battle with ID: ${battle1.id}`);

const battle2 = await prisma.battle.create({
  data: {
    turn: 1,
    currentTurn: 1,
    state: 'ongoing',
    characterId: character2.id,
  },
});
console.log(`Created battle with ID: ${battle2.id}`);

const battle3 = await prisma.battle.create({
  data: {
    turn: 1,
    currentTurn: 1,
    state: 'ongoing',
    characterId: character3.id,
  },
});
console.log(`Created battle with ID: ${battle3.id}`);

// 7. Link battles to enemies
await prisma.enemy.update({
  where: { id: enemy1.id },
  data: {
    battles: {
      connect: [{ id: battle1.id }],
    },
  },
});
console.log(`Linked enemy ${enemy1.name} to battle ${battle1.id}`);

await prisma.enemy.update({
  where: { id: enemy2.id },
  data: {
    battles: {
      connect: [{ id: battle2.id }],
    },
  },
});
console.log(`Linked enemy ${enemy2.name} to battle ${battle2.id}`);

await prisma.enemy.update({
  where: { id: enemy3.id },
  data: {
    battles: {
      connect: [{ id: battle3.id }],
    },
  },
});
console.log(`Linked enemy ${enemy3.name} to battle ${battle3.id}`);

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
