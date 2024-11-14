import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.character.deleteMany({});
    await prisma.user.deleteMany();

    const wizard = await prisma.character.create({
        data: {
            name: 'Wizard',
            level: 1,
            xp: 0,
            strength: 5,
            speed: 5,
            magic: 20,
            dexterity: 10,
            healthPoints: 50,
            manaPoints: 100,
            luck: 5,
            defense: 3,
            magicDefense: 15,
            progress: 'Beginner wizard',
        },
    });

    const warrior = await prisma.character.create({
        data: {
            name: 'Warrior',
            level: 1,
            xp: 0,
            strength: 20,
            speed: 10,
            magic: 5,
            dexterity: 15,
            healthPoints: 100,
            manaPoints: 30,
            luck: 5,
            defense: 10,
            magicDefense: 5,
            progress: 'Battle-hardened warrior',
        },
    });

    const archer = await prisma.character.create({
        data: {
            name: 'Archer',
            level: 1,
            xp: 0,
            strength: 15,
            speed: 20,
            magic: 5,
            dexterity: 20,
            healthPoints: 70,
            manaPoints: 50,
            luck: 10,
            defense: 5,
            magicDefense: 10,
            progress: 'Skilled archer',
        },
    });

    console.log('Base characters created:');
    console.log(wizard, warrior, archer);
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();