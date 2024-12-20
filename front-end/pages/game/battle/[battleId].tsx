import Background from "@/components/game/battle/Background";
import Enemy from "@/components/game/battle/Enemy";
import Player from "@/components/game/battle/Player";
import PageTransition from "@/components/game/ui/PageTransition";
import TextButton from "@/components/game/ui/TextButton";
import TextContainer from "@/components/game/ui/TextContainer";
import { Character, EnemyType } from "@/types";
import localFont from "next/font/local";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/game/battle/Index.module.css"
import Music from "@/components/settings/Music";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


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

    const [enemies, setEnemies] = useState<EnemyType[]>([
        {
            id: 1,
            name: "slime",
            level: 10,
            strength: 5,
            speed: 10,
            magic: 0,
            dexterity: 25,
            healthPoints: 100,
            manaPoints: 0,
            luck: 5,
            defense: 6,
            magicDefense: 5,
            description: "Random enemy",
            moves: [
                { name: 'slash', attack: 40, magicAttack: 0, manaPoints: 0, aoe: true },
                { name: 'Fireball', attack: 30, magicAttack: 50, manaPoints: 20, aoe: false }
            ],
            state: "slimeIdle",
        },
        {
            id: 2,
            name: "slime",
            level: 8,
            strength: 7,
            speed: 12,
            magic: 0,
            dexterity: 18,
            healthPoints: 120,
            manaPoints: 0,
            luck: 6,
            defense: 5,
            magicDefense: 4,
            description: "A tough skeleton",
            moves: [
                { name: 'slash', attack: 50, magicAttack: 0, manaPoints: 0, aoe: true },
            ],
            state: "slimeIdle",
        }
    ]);

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

        console.log(urlBattleWorld, maxBattleWorld, urlBattleWorld > maxBattleWorld);
        console.log(urlBattleLevel, maxBattleLevel, urlBattleLevel > maxBattleLevel);

        if(urlBattleWorld > maxBattleWorld || urlBattleLevel > maxBattleLevel) {
            router.back();
        }
    }, []);

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
    
        const move = character.move[moveId];
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
