import { Battle } from "@prisma/client";
import scaleEnemyTemplate from "../helpers/battle/scaleEnemyTemplate";
import battleRepository from "../repository/battle.db";
import userRepository from "../repository/user.db";
import { BattleType, CharacterType, UserType } from "../types";
import EnemyService from "./enemy.service";

const createBattle = async (user: UserType, character: CharacterType, selectedProgress: string): Promise<Battle | null> => {
    if(typeof character.progress !== "string") throw new Error("Something went wrong with your character progress");
    const selectedBattleWorld = Number(selectedProgress.split("-")[0]);
    const selectedBattleLevel = Number(selectedProgress.split("-")[1]);
    const maxBattleWorld = Number(character.progress.split("-")[0]);
    const maxBattleLevel = Number(character.progress.split("-")[1]);

    if(selectedBattleWorld > maxBattleWorld || selectedBattleLevel > maxBattleLevel) {
        throw new Error("You do not have access to this world/level yet!")
    }

    const enemyTemplates = await EnemyService.getEnemyTemplates(selectedBattleWorld.toString());

    let enemies = [];
    const enemyCount = Math.floor(Math.random() * 2) + 1;
    for(let i = 0 ; i < enemyCount ; i++) {
        const randomIndex = Math.floor(Math.random() * enemyTemplates.length);
        enemies.push(enemyTemplates[randomIndex]);
    }
    console.log(enemies);

    enemies = await scaleEnemyTemplate(enemies, selectedBattleWorld, selectedBattleLevel);

    const turnCount = 1;
    let currentTurn = "player";
    for(let enemy of enemies) {
        if(enemy.speed > character.speed) {
            currentTurn = "enemy";
        }
    }

    const gold = (Math.floor(Math.random() * (6 + selectedBattleWorld * 20 + selectedBattleLevel * 2)) + (1 + selectedBattleWorld * 20 + selectedBattleLevel)) * enemies.length;
    const xp = (Math.floor(Math.random() * 20 + selectedBattleWorld * 10 + selectedBattleLevel) + (10 + selectedBattleWorld * 10 + selectedBattleLevel)) * enemies.length;

    const reward = {
        gold: gold,
        xp: xp,
    }

    const battleStore: BattleType = {
        turnCount: turnCount,
        currentTurn: currentTurn,
        enemies: JSON.stringify(enemies),
        character: JSON.stringify(character),
        reward: JSON.stringify(reward)
    }

    return await battleRepository.createBattle(battleStore);
};

export { createBattle };