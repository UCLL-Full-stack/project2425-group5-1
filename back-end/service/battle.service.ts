import battleRepository from '../repository/battle.db';
import userRepository from '../repository/user.db';
import characterRepository from "../repository/character.db";
import { BattleType, CharacterType, EnemyType, UserType } from '../types';
import EnemyService from './enemy.service';
import { Battle as BattlePrisma, Enemy as EnemyPrisma, Move as MovePrisma } from '@prisma/client';
import { Battle } from '../model/battle';
import enemyRepository from '../repository/enemy.db';
import { Enemy } from '../model/enemy';
import chooseEnemiesForBattle from '../helpers/battle/chooseEnemiesForBattle';
import scaleEnemyStats from '../helpers/battle/scaleEnemyStats';
import generateBattleReward from '../helpers/battle/generateBattleReward';

// const getExistingBattle = async (user: UserType): Promise<Battle | null> => {
//     try {
//         const existingBattle = await battleRepository.getExistingBattle(user);
//         console.log(existingBattle);

//         if (!existingBattle) {
//             return null;
//         }

//         return Battle.from(existingBattle);
//     } catch (error) {
//         throw error;
//     }
// };


// const getExistingBattle = async (user: UserType): Promise<BattleType | null> => {
//     // Fetch with enemies & moves included
//     const existingBattle = await battleRepository.getExistingBattle(user);
//     if (!existingBattle) {
//         return null;
//     }
//     // Convert to domain model
//     const domainBattle = Battle.from(existingBattle);
//     return domainBattle;
// };

const createBattle = async (
	username: string,
	selectedLevel: { world: number; level: number }
): Promise<Battle> => {
	if (!username) {
		throw new Error("World & level is required in the body to initialize a battle!\nExpected: { selectedLevel: { world: number, level: number } }");
	}

	const character = await characterRepository.getCharacterByUserName(username);
	if (!character) throw new Error("Character not found");

	if (character.progress.world < selectedLevel.world && character.progress.level < selectedLevel.level) {
		throw new Error('You do not have access to this world/level yet!');
	}

	const existingBattle = await battleRepository.getExistingBattle(character);
	if(existingBattle) throw new Error(`Battle for character already exists!`);

	let enemyPool: EnemyType[] = await enemyRepository.getEnemiesByWorld(selectedLevel.world);
	if(!enemyPool) throw new Error(`Failed to get enemy pool for world ${selectedLevel.world}`);

	const battleEnemies: EnemyType[] = chooseEnemiesForBattle(selectedLevel, enemyPool);

	const scaledEnemies = battleEnemies.map(enemy => scaleEnemyStats(enemy, selectedLevel.world, selectedLevel.level));

	let currentTurn = "player" // "player" or "enemy"

	const avgEnemySpeed = scaledEnemies.reduce((sum, enemy) => sum + enemy.speed, 0) / scaledEnemies.length;

	if (character.speed < avgEnemySpeed) {
		currentTurn = "enemy";
	}

	const battle: BattleType = {
		reward: generateBattleReward(selectedLevel, scaledEnemies.length),
		createdAt: new Date(),
		currentTurn: currentTurn,
		turnCount: 0,
		enemies: scaledEnemies,
		characterId: character.id,
	}

	console.log(battle);

	const createdEnemies = scaledEnemies.map(async e => await enemyRepository.createEnemy(e));
	if(!createdEnemies) throw new Error(`Failed to create new enemies for battle`);

	const battleStore: Battle = await battleRepository.createBattle(battle);
	if(!battleStore) throw new Error(`Failed to create new battle`);

	return battleStore;
};

export {
	createBattle,
	// getExistingBattle
};
