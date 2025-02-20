import Background from "@/components/game/battle/Background";
import Enemy from "@/components/game/battle/Enemy";
import Player from "@/components/game/battle/Player";
import PageTransition from "@/components/game/ui/PageTransition";
import TextButton from "@/components/game/ui/TextButton";
import TextContainer from "@/components/game/ui/TextContainer";
import { BattleType, Character, EnemyType, Move } from "@/types";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/game/battle/Index.module.css"
import Music from "@/components/settings/Music";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EnemyService from "@/services/EnemyService";
import BattleService from "@/services/BattleService";
import MoveService from "@/services/MoveService";


const quinquefiveFont = localFont({ src: "../fonts/quinque-five-font/Quinquefive-ALoRM.ttf" });

const DynamicBattle: React.FC = () => {
    const router = useRouter();
    const { battleId } = router.query;
    const [character, setCharacter] = useState<Character>();

    const [enemies, setEnemies] = useState<EnemyType[]>([]);

    const [turn, setTurn] = useState<"player" | "enemy">("player");
    const [battleOver, setBattleOver] = useState<boolean>(false);
    const [turnCount, setTurnCount] = useState<number>(0);
    const [selectedEnemy, setSelectedEnemy] = useState<EnemyType | null>(null);
    const [selectedMove, setSelectedMove] = useState<number | null>(null);
    const [moveSelected, setMoveSelected] = useState<boolean>(false);
    const [playerState, setPlayerState] = useState<"idle" | "attacking">("idle");

    useEffect(() => {
        if(!battleId || typeof battleId !== "string") {router.back(); return;};
        if(!JSON.parse(sessionStorage.getItem("loggedInUser") || "{}")?.token) router.push("/");
        const urlBattleWorld = Number(battleId.split("-")[0]);
        const urlBattleLevel = Number(battleId.split("-")[1]);
        const maxBattle = JSON.parse(sessionStorage.getItem("character") || "{}")?.data;
        const maxBattleWorld = Number(maxBattle.progress.split("-")[0]);
        const maxBattleLevel = Number(maxBattle.progress.split("-")[1]);

        if(urlBattleWorld > maxBattleWorld || urlBattleLevel > maxBattleLevel) {
            router.back();
        }

        (async () => {
            const response = await EnemyService.getEnemyTemplates(urlBattleWorld);

            if(response.status !== 200) return console.error("Failed to fetch enemy templates");

            const enemyTemplates = response.data;
            
            // between 1-2 enemies
            const enemyCount = Math.floor(Math.random() * 2) + 1;
            const selectedEnemies: EnemyType[] = [];

            for(let i = 0 ; i < enemyCount ; i++) {
                const randomIndex = Math.floor(Math.random() * enemyTemplates.length);
                selectedEnemies.push(enemyTemplates[randomIndex]);
            }

            const scaledEnemies = await scaleEnemyTemplate(selectedEnemies, urlBattleWorld, urlBattleLevel);
            // const newBattle = await makeBattle();
            if(!scaledEnemies) return;
            // if(!newBattle.id) return;
            // linkEnemiesToBattle(scaledEnemies.data, newBattle.id);
            console.log(scaledEnemies.data, maxBattle);

            let userMoves = [];

            for(let i of maxBattle.moveIds) {
                const userMove = await MoveService.getMoveById(i)
                if(!userMove.data) return;
                userMoves.push(userMove.data);
            }

            const updatedEnemies = await Promise.all(scaledEnemies.data.map(async (enemy: { moveIds: any[]; }) => {
                const moves = await Promise.all(enemy.moveIds.map(async (moveId) => {
                    const enemyMove = await MoveService.getMoveById(moveId);
                    if (!enemyMove.data) return null;
                    return enemyMove.data;
                }));
                const validMoves = moves.filter(move => move !== null);

                return {
                    ...enemy,
                    moves: validMoves
                };
            }));

            setEnemies(updatedEnemies);
            setCharacter({...maxBattle, moves: userMoves});
        })();
        return () => {};
    }, []);

    const scaleEnemyTemplate = async (enemiesTemplate: EnemyType[], worldId: number, levelId: number) => {
        const newEnemies = enemiesTemplate.map(enemyTemplate => {
            enemyTemplate.defense = enemyTemplate.defense + (1 * worldId) + levelId;
            enemyTemplate.healthPoints = enemyTemplate.healthPoints + 5 * worldId + levelId * 1.2;
            enemyTemplate.strength = enemyTemplate.strength + (1 * worldId) + levelId;
            enemyTemplate.magicDefense = enemyTemplate.magicDefense + (1 * worldId) + levelId;
            enemyTemplate.magic = enemyTemplate.magic + (1 * worldId) + levelId;
            enemyTemplate.speed = enemyTemplate.speed + (1 * worldId) + levelId;
            enemyTemplate.dexterity = enemyTemplate.dexterity + (1 * worldId) + levelId;
            enemyTemplate.luck = enemyTemplate.luck + (1 * worldId) + levelId;
            enemyTemplate.level = enemyTemplate.level + (1 * worldId) + levelId;
            return enemyTemplate
        });
        const createdEnemies = await EnemyService.createEnemies(newEnemies);
        if(!createdEnemies) return;
        return createdEnemies;
    };

    const makeBattle = async (): Promise<BattleType> => {
        const battleResponse = await BattleService.createBattle();
        if(battleResponse.status !== 200) console.error("Something went wrong with battle creation");

        const battle = battleResponse.data;
        return battle;
    };

    const linkEnemiesToBattle = async (enemies: EnemyType[], battleId: number) => {
        enemies.map(async enemy => {
            if(!enemy.id) return;
            const test = await EnemyService.addBattleToEnemy(battleId, enemy.id);
        })
    };

    useEffect(() => {
        console.log(character, enemies);
        if(!character) return;
        if (character.healthPoints <= 0 || enemies.every(enemy => enemy.healthPoints <= 0)) {
            setBattleOver(true);
        }
    }, [character, enemies]);

    useEffect(() => {
        if(turn === "enemy") {
            enemyTurn();
        }
    }, [turn]);

    useEffect(() => {
        if(battleOver){
            router.push("/game");
        }
    }, [battleOver]);

    useEffect(() => {
        console.log(selectedEnemy, selectedMove, moveSelected);
    }, [moveSelected]);

    const calculateDamage = (attacker: Character | EnemyType, defender: Character | EnemyType, attack: number, magicAttack: number) => {
        let damage = 0;
        let mgcDmg = 0;

        let baseAtkDmg = attacker.strength * attack;
        let baseMgcDmg = attacker.magic * magicAttack;
        let defenseMod = 1 - (defender.defense / (defender.defense + 100));
        let mgcDefMod = 1 - (defender.magicDefense / (defender.magicDefense + 100));

        if(attack > 0 && magicAttack > 0) {
            damage = baseAtkDmg * defenseMod;
            mgcDmg = baseMgcDmg * mgcDefMod;
        } else if(attack > 0 && magicAttack === 0) {
            damage = baseAtkDmg * defenseMod;
        } else {
            mgcDmg = baseMgcDmg * mgcDefMod;
        }

        const totalDmg = Math.floor(damage + mgcDmg);

            // damage = ((attacker.strength * attack / 10) - defender.defense) + ((attacker.magic * magicAttack / 10) - defender.magicDefense);
        console.log(totalDmg);
        return totalDmg > 0 ? totalDmg : 0;
    };

    const playerTurn = (moveId: number) => {
        console.log("Player turn: Move selected", moveId);
        setSelectedMove(moveId);
        setMoveSelected(true);

        if(!character || !character.moves) return;

        console.log(moveId);

        console.log(character.moves[moveId]);
        const move = character.moves[moveId];
        console.log(move);
        if(!move) return;

        if (move.aoe) {
            confirmMove(moveId);
        }
    };

    const handleEnemySelection = (enemy: EnemyType) => {
        console.log(!moveSelected, character?.moves[selectedMove as number].aoe)
        if (!moveSelected) return;
        if(character?.moves[selectedMove as number].aoe){
            
        }
        console.log("Enemy selected:", enemy.id);
    
        setSelectedEnemy(enemy);
    };

    const confirmMove = (moveId: number) => {
        if (moveId === null) {
            console.log("No move selected or no enemy selected for non-AoE move");
            return;
        }

        if(!character) return;
        const move = character.moves[moveId];
        console.log("Confirm move: ", move);
        if(!move) return;

        if (move.aoe) {
            setPlayerState("attacking");

            let updatedEnemies = enemies.map((enemy) => {
                const damage = calculateDamage(character, enemy, move.attack, move.magicAttack);
                return { ...enemy, healthPoints: enemy.healthPoints - damage };
            });

            updatedEnemies = updatedEnemies.filter((enemy) => enemy.healthPoints > 0);
            console.log(updatedEnemies);
            setEnemies(updatedEnemies);

            setCharacter((prevCharacter) => {
                if(!prevCharacter) return;
                return {
                    ...prevCharacter,
                    manaPoints: prevCharacter.manaPoints - move.manaPoints,
                }
            });

            setTimeout(() => {
                console.log("AoE move complete, switching turn to enemy");
                setTurnCount(turnCount + 1);
                setTurn("enemy");
                setMoveSelected(false);
                setPlayerState("idle");
            }, 3000);

        } else {
            if(!selectedEnemy) {
                console.log("Oh oh, this should never be possible?");
                return;
            };
            console.log("Single target attack detected, targeting:", selectedEnemy.name, selectedEnemy.id);

            if (move.manaPoints > character.manaPoints) {
                console.log("Not enough mana points");
                return;
            }

            setPlayerState("attacking");

            const damage = calculateDamage(character, selectedEnemy, move.attack, move.magicAttack);
            const updatedEnemy = { ...selectedEnemy, healthPoints: selectedEnemy.healthPoints - damage };
            console.log(updatedEnemy);
            setEnemies(enemies.map((enemy) => enemy === selectedEnemy ? updatedEnemy : enemy));

            setCharacter((prevCharacter) => {
                if(!prevCharacter) return;
                return {
                    ...prevCharacter,
                    manaPoints: prevCharacter.manaPoints - move.manaPoints,
                }
            });

            setTimeout(() => {
                setTurnCount(turnCount + 1);
                setTurn("enemy");
                setMoveSelected(false);
                setPlayerState("idle");
            }, 3000);
        }
    };


    const cancel = () => {
        setMoveSelected(false);
    };

    const enemyTurn = () => {
        setSelectedEnemy(null);
        let attackDelay = 0;

        if(!character) return;
        let characterHp = character.healthPoints;

        enemies.forEach((enemy) => {
            setTimeout(() => {

                setEnemies((prevEnemies) => prevEnemies.map((e) => e.id === enemy.id ? {...e, state: `${e.name}Attacking`} : e));

                const randomMoveIndex = Math.floor(Math.random() * enemy.moves.length);
                const move = enemy.moves[randomMoveIndex];
                const damage = calculateDamage(enemy, character, move.attack, move.magicAttack);
                console.log("Enemy is attacking: ", enemy, "hp: ", characterHp);
                let newPlayerHealth = characterHp - damage;
                characterHp -= damage;

                setCharacter((prevCharacter) => {
                    if(!prevCharacter) return;
                    return { ...prevCharacter, healthPoints: newPlayerHealth }
                });

                setTimeout(() => {
                    setEnemies((prevEnemies) =>
                        prevEnemies.map((e) =>
                            e.id === enemy.id ? { ...e, state: `${e.name}Idle` } : e
                        )
                    );
                }, 1000);
            }, attackDelay)
            attackDelay += 1500;
        });

        // If a move ever does damage to self
        setEnemies((prevEnemies) => prevEnemies.filter((enemy) => enemy.healthPoints > 0));

        setTimeout(() => {
            setTurn("player");
        }, attackDelay);
    };

    if(!character || !enemies) return null;
    return (
        <main className={quinquefiveFont.className}>
            <PageTransition state="expand" />
            <Music musicPath="/music/battleThemeA.mp3" volume={0.04} />

            <p>{battleId}</p>
            <Background world={battleId} />
            <Player state={playerState} player={character} />
            {turn === "player" ?
                <>
                    {!moveSelected ?
                        <TextContainer Skippable={turn === "player" ? false : true}>
                            {character.moves.map((m, i) => (
                                <TextButton key={i} text={m.name} useMove={playerTurn} moveId={i} />
                            ))}
                        </TextContainer>
                    :
                    null}
                    {turnCount === 0 ? <TextContainer textContent={["You encountered an enemy"]} /> : null}
                </>
            :
                <TextContainer textContent={["Enemy is attacking!"]} />
            }
            <div className={styles.enemyContainer}>
                {enemies.map((enemy, i) => (
                    <Enemy
                        key={i}
                        enemyId={enemy.id}
                        name={enemy.name}
                        state={enemy.state}
                        enemy={enemy}
                        onClick={() => handleEnemySelection(enemy)}
                        selected={turn === "player" ? selectedEnemy : null}
                    />
                ))}
            </div>
            {moveSelected && !character.moves[selectedMove as number].aoe && selectedEnemy && playerState !== "attacking" && (
                <>
                    <TextButton text="Confirm Attack" onClick={() => confirmMove(selectedMove as number)} />
                    <TextButton text="Cancel" onClick={cancel} />
                </>
            )}
        </main>
    );
};


export const getServerSideProps = async (context: { locale: any; }) => {
    const { locale } = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"]))
        }
    }
}

export default DynamicBattle;
