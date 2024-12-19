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
  
  // // 3. Maak enemies data aan
  // console.log('Creating enemies...');
  // const enemy1 = await prisma.enemy.create({
  //   data: {
  //     name: "Goblin",
  //     level: 5,
  //     strength: 20,
  //     speed: 15,
  //     magic: 0,
  //     dexterity: 10,
  //     healthPoints: 80,
  //     manaPoints: 0,
  //     luck: 10,
  //     defense: 15,
  //     magicDefense: 5,
  //     moves: {
  //       connect: [
  //         { id: move1.id },
  //         { id: move5.id },
  //       ]
  //     }
  //   },
  // });
  // console.log(`Created enemy: ${enemy1.name}`);

  // const enemy2 = await prisma.enemy.create({
  //   data: {
  //     name: "Dark Mage",
  //     level: 12,
  //     strength: 15,
  //     speed: 12,
  //     magic: 40,
  //     dexterity: 18,
  //     healthPoints: 100,
  //     manaPoints: 120,
  //     luck: 8,
  //     defense: 10,
  //     magicDefense: 30,
  //     moves: {
  //       connect: [
  //         { id: move2.id },
  //         { id: move3.id },
  //       ]
  //     }
  //   },
  // });
  // console.log(`Created enemy: ${enemy2.name}`);

  // const enemy3 = await prisma.enemy.create({
  //   data: {
  //     name: "Orc Warrior",
  //     level: 15,
  //     strength: 60,
  //     speed: 10,
  //     magic: 0,
  //     dexterity: 20,
  //     healthPoints: 200,
  //     manaPoints: 0,
  //     luck: 5,
  //     defense: 35,
  //     magicDefense: 10,
  //     moves: {
  //       connect: [
  //         { id: move4.id },
  //       ]
  //     }
  //   },
  // });
  // console.log(`Created enemy: ${enemy3.name}`);

  // const enemy4 = await prisma.enemy.create({
  //   data: {
  //     name: "Forest Spirit",
  //     level: 8,
  //     strength: 10,
  //     speed: 25,
  //     magic: 30,
  //     dexterity: 15,
  //     healthPoints: 90,
  //     manaPoints: 50,
  //     luck: 20,
  //     defense: 8,
  //     magicDefense: 25,
  //     moves: {
  //       connect: [
  //         { id: move1.id },
  //         { id: move5.id },
  //       ]
  //     }
  //   },
  // });
  // console.log(`Created enemy: ${enemy4.name}`);

  // const enemy5 = await prisma.enemy.create({
  //   data: {
  //     name: "Fire Elemental",
  //     level: 18,
  //     strength: 40,
  //     speed: 18,
  //     magic: 60,
  //     dexterity: 22,
  //     healthPoints: 160,
  //     manaPoints: 80,
  //     luck: 12,
  //     defense: 20,
  //     magicDefense: 40,
  //     moves: {
  //       connect: [
  //         { id: move4.id },
  //         { id: move5.id },
  //       ]
  //     }
  //   },
  // });

  // // 4. Maak characters data aan
  // console.log('Creating characters...');
  // const character1 = await prisma.character.create({
  //   data: {
  //     name: 'Warrior John',
  //     level: 10,
  //     xp: 1000,
  //     strength: 15,
  //     speed: 10,
  //     magic: 5,
  //     dexterity: 12,
  //     healthPoints: 150,
  //     manaPoints: 30,
  //     luck: 8,
  //     defense: 12,
  //     magicDefense: 6,
  //     progress: 'In Progress',
  //     moves: {
  //       connect: [
  //         { id: move1.id },
  //         { id: move2.id },
  //       ]
  //     }
  //   },
  // });
  // console.log(`Created character: ${character1.name}`);

  // const character2 = await prisma.character.create({
  //   data: {
  //     name: 'Mage Alina',
  //     level: 12,
  //     xp: 1500,
  //     strength: 5,
  //     speed: 12,
  //     magic: 20,
  //     dexterity: 10,
  //     healthPoints: 100,
  //     manaPoints: 80,
  //     luck: 10,
  //     defense: 8,
  //     magicDefense: 15,
  //     progress: 'Not in battle',
  //     moves: {
  //       connect: [
  //         { id: move3.id },
  //         { id: move5.id },
  //       ]
  //     }
  //   },
  // });
  // console.log(`Created character: ${character2.name}`);

  // const character3 = await prisma.character.create({
  //   data: {
  //     name: 'Rogue Kayden',
  //     level: 9,
  //     xp: 900,
  //     strength: 12,
  //     speed: 18,
  //     magic: 3,
  //     dexterity: 20,
  //     healthPoints: 120,
  //     manaPoints: 25,
  //     luck: 15,
  //     defense: 10,
  //     magicDefense: 5,
  //     progress: 'Not in battle',
  //     moves: {
  //       connect: [
  //         { id: move2.id },
  //         { id: move4.id },
  //       ]
  //     }
  //   },
  // });
  // console.log(`Created character: ${character3.name}`);

  // const character4 = await prisma.character.create({
  //   data: {
  //     name: 'Paladin Gregor',
  //     level: 14,
  //     xp: 2000,
  //     strength: 18,
  //     speed: 8,
  //     magic: 10,
  //     dexterity: 12,
  //     healthPoints: 180,
  //     manaPoints: 40,
  //     luck: 6,
  //     defense: 20,
  //     magicDefense: 12,
  //     progress: 'Completed',
  //     moves: {
  //       connect: [
  //         { id: move1.id },
  //         { id: move5.id },
  //       ]
  //     }
  //   },
  // });
  // console.log(`Created character: ${character4.name}`);

  // const character5 = await prisma.character.create({
  //   data: {
  //     name: 'Archer Lily',
  //     level: 11,
  //     xp: 1200,
  //     strength: 10,
  //     speed: 15,
  //     magic: 8,
  //     dexterity: 18,
  //     healthPoints: 130,
  //     manaPoints: 35,
  //     luck: 12,
  //     defense: 10,
  //     magicDefense: 8,
  //     progress: 'In Progress',
  //     moves: {
  //       connect: [
  //         { id: move3.id },
  //         { id: move4.id },
  //       ]
  //     }
  //   },
  // });
  // console.log(`Created character: ${character5.name}`);

  // // 5. Maak Users aan en verbind die met een Character
  // console.log('Creating users...');
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       name: 'John Doe',
  //       email: 'john@example.com',
  //       password: 'secure123',
  //       characterId: character1.id,
  //     },
  //     {
  //       name: 'Alina Magehart',
  //       email: 'alina@example.com',
  //       password: 'magic456',
  //       characterId: character2.id,
  //     },
  //     {
  //       name: 'Kayden Swiftblade',
  //       email: 'kayden@example.com',
  //       password: 'rogue789',
  //       characterId: character3.id,
  //     },
  //   ],
  // });
  // console.log('Users successfully created.\n');
  
  // // 6. Maak Battle aan
  // console.log('Creating battles...');
  // await prisma.battle.createMany({
  //   data: {
  //     turn: 1,
  //     currentTurn: 1,
  //     state: "Started",
  //     characterId: character1.id,
  //     enemies: [enemy1, enemy2],
  //   }
  // });

  // await prisma.battle.createMany({
  //   data: {
  //     turn: 5,
  //     currentTurn: 0,
  //     state: "Started",
  //     characterId: character5.id,
  //   }
  // });
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
