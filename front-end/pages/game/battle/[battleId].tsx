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


const quinquefiveFont = localFont({ src: "../fonts/quinque-five-font/Quinquefive-ALoRM.ttf" });

const DynamicBattle: React.FC = () => {
    const router = useRouter();
    const { battleId } = router.query;
    const [character, setCharacter] = useState<Character>({
            name: 'Warrior John',
            level: 10,
            xp: 1000,
            strength: 15,
            speed: 10,
            magic: 5,
            dexterity: 12,
            healthPoints: 150,
            manaPoints: 3030,
            luck: 8,
            defense: 12,
            magicDefense: 6,
            progress: 'In Progress',
            userId: 1,
            move: [
                {
                    name: 'slash',
                    attack: 40,
                    magicAttack: 0,
                    manaPoints: 0,
                    aoe: true,
                },
                {
                    name: 'Fireball',
                    attack: 30,
                    magicAttack: 50,
                    manaPoints: 20,
                    aoe: false,
                }
            ]
    });

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
        const maxBattle = JSON.parse(sessionStorage.getItem("character") || "{}")?.data.progress;
        const maxBattleWorld = Number(maxBattle.split("-")[0]);
        const maxBattleLevel = Number(maxBattle.split("-")[1]);

        if(urlBattleWorld > maxBattleWorld || urlBattleLevel > maxBattleLevel) {
            router.back();
        }

        (async () => {
            const response = await EnemyService.getEnemyTemplates(urlBattleWorld);

            console.log(response);

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
            const newBattle = await makeBattle();
            if(!scaledEnemies) return;
            if(!newBattle.id) return;
            linkEnemiesToBattle(scaledEnemies.data, newBattle.id);
        })();
        return () => {};
    }, []);

    const scaleEnemyTemplate = async (enemiesTemplate: EnemyType[], worldId: number, levelId: number) => {
        const newEnemies = enemiesTemplate.map(enemyTemplate => {
            enemyTemplate.defense = enemyTemplate.defense + (1 * worldId) + levelId;
            enemyTemplate.healthPoints = enemyTemplate.healthPoints + 5 * worldId + levelId * 2;
            enemyTemplate.strength = enemyTemplate.strength + (1 * worldId) + levelId;
            enemyTemplate.magicDefense = enemyTemplate.magicDefense + (1 * worldId) + levelId;
            enemyTemplate.magic = enemyTemplate.magic + (1 * worldId) + levelId;
            enemyTemplate.speed = enemyTemplate.speed + (1 * worldId) + levelId;
            enemyTemplate.dexterity = enemyTemplate.dexterity + (1 * worldId) + levelId;
            enemyTemplate.luck = enemyTemplate.luck + (1 * worldId) + levelId;
            enemyTemplate.level = enemyTemplate.level + (1 * worldId) + levelId;
            return enemyTemplate
        });
        console.log(newEnemies);
        const createdEnemies = await EnemyService.createEnemies(newEnemies);
        console.log(createdEnemies);
        if(!createdEnemies) return;
        return createdEnemies;
    };

    const makeBattle = async (): Promise<BattleType> => {
        const battleResponse = await BattleService.createBattle();
        if(battleResponse.status !== 200) console.error("Something went wrong with battle creation");

        const battle = battleResponse.data;
        console.log(battle);
        return battle;
    };

    const linkEnemiesToBattle = async (enemies: EnemyType[], battleId: number) => {
        enemies.map(async enemy => {
            if(!enemy.id) return;
            const test = await EnemyService.addBattleToEnemy(battleId, enemy.id);
            console.log(test);
        })
    };

    useEffect(() => {
        if (character.healthPoints <= 0 || enemies.every(enemy => enemy.healthPoints <= 0)) {
            setBattleOver(true);
        }
    }, [character.healthPoints, enemies]);

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
        const damage = ((attacker.strength * attack / 10) - defender.defense) + ((attacker.magic * magicAttack / 10) - defender.magicDefense);
        return damage > 0 ? damage : 0;
    };

    const playerTurn = (moveId: number) => {
        console.log("Player turn: Move selected", moveId);
        setSelectedMove(moveId);
        setMoveSelected(true);
    
        const move = character.moveIds[moveId];
        if (move.aoe) {
            confirmMove(moveId);
        }
    };

    const handleEnemySelection = (enemy: EnemyType) => {
        if (!moveSelected || character.move[selectedMove as number].aoe) return;
        console.log("Enemy selected:", enemy.id);
    
        setSelectedEnemy(enemy);
    };

    const confirmMove = (moveId: number) => {
        if (moveId === null) {
            console.log("No move selected or no enemy selected for non-AoE move");
            return;
        }

        const move = character.move[moveId];
        console.log("Confirm move: ", move);

        if (move.aoe) {
            setPlayerState("attacking");

            let updatedEnemies = enemies.map((enemy) => {
                const damage = calculateDamage(character, enemy, move.attack, move.magicAttack);
                return { ...enemy, healthPoints: enemy.healthPoints - damage };
            });

            updatedEnemies = updatedEnemies.filter((enemy) => enemy.healthPoints > 0);
            setEnemies(updatedEnemies);

            setCharacter((prevCharacter) => ({
                ...prevCharacter,
                manaPoints: prevCharacter.manaPoints - move.manaPoints,
            }));

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
            setEnemies(enemies.map((enemy) => enemy === selectedEnemy ? updatedEnemy : enemy));

            setCharacter((prevCharacter) => ({
                ...prevCharacter,
                manaPoints: prevCharacter.manaPoints - move.manaPoints,
            }));

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

        enemies.forEach((enemy) => {
            setTimeout(() => {

                setEnemies((prevEnemies) => prevEnemies.map((e) => e.id === enemy.id ? {...e, state: `${e.name}Attacking`} : e));

                const randomMoveIndex = Math.floor(Math.random() * enemy.moves.length);
                const move = enemy.moves[randomMoveIndex];
                const damage = calculateDamage(enemy, character, move.attack, move.magicAttack);
                const newPlayerHealth = character.healthPoints - damage;

                setCharacter((prevCharacter) => ({ ...prevCharacter, healthPoints: newPlayerHealth }));

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

    return (
        <main className={quinquefiveFont.className}>
            <PageTransition state="expand" />
            <Music musicPath="/music/battleThemeA.mp3" volume={0.04} />

            <p>{battleId}</p>
            <Background world={battleId} />
            <Player state={playerState} />
            {turn === "player" ?
                <>
                    {!moveSelected ?
                        <TextContainer Skippable={turn === "player" ? false : true}>
                            {character.move.map((m, i) => (
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
            {moveSelected && !character.move[selectedMove as number].aoe && selectedEnemy && playerState !== "attacking" && (
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
