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
import Music from "@/components/Music";


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
            manaPoints: 30,
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
            name: "skeleton",
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
                { name: 'Fireball', attack: 35, magicAttack: 45, manaPoints: 25, aoe: false }
            ],
            state: "skeletonIdle",
        }
    ]);

    const [turn, setTurn] = useState<"player" | "enemy">("player");
    const [battleOver, setBattleOver] = useState<boolean>(false);
    const [turnCount, setTurnCount] = useState<number>(0);
    const [selectedEnemy, setSelectedEnemy] = useState<EnemyType | null>(null);

    useEffect(() => {
        if(!battleId) router.back();
        console.log(battleId);
    }, []);

    useEffect(() => {
        console.log(character.healthPoints, enemies[0].healthPoints);
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

    const calculateDamage = (attacker: Character | EnemyType, defender: Character | EnemyType, attack: number) => {
        const damage = (attacker.strength * attack / 10) - defender.defense;
        return damage > 0 ? damage : 0;
    };

    const playerTurn = (moveId: number) => {
        const move = character.move[moveId];

        // This move should just be greyed out
        if(move.manaPoints > character.manaPoints) {
            console.log("not enough mana points");
            return;
        }

        if(move.aoe) {
            const updatedEnemies = enemies.map((enemy) => {
                const damage = calculateDamage(character, enemy, move.attack);
                return { ...enemy, healthPoints: enemy.healthPoints - damage };
            });
            setEnemies(updatedEnemies);
        } else if(selectedEnemy) {
            const damage = calculateDamage(character, selectedEnemy, move.attack);
            const updatedEnemy = { ...selectedEnemy, healthPoints: selectedEnemy.healthPoints - damage };
            setEnemies(enemies.map((enemy) => enemy === selectedEnemy ? updatedEnemy : enemy));
        }

        setCharacter((prevCharacter) => ({ ...prevCharacter, manaPoints: prevCharacter.manaPoints - move.manaPoints }));
        setTurnCount(turnCount + 1);
        setTurn("enemy");
    };

    const enemyTurn = () => {
        let attackDelay = 0;

        enemies.forEach((enemy, index) => {
            setTimeout(() => {

                setEnemies((prevEnemies) => prevEnemies.map((e) => e.name === enemy.name ? {...e, state: `${e.name}Attacking`} : e));

                const randomMoveIndex = Math.floor(Math.random() * enemy.moves.length);
                const move = enemy.moves[randomMoveIndex];
                const damage = calculateDamage(enemy, character, move.attack);
                const newPlayerHealth = character.healthPoints - damage;

                setCharacter((prevCharacter) => ({ ...prevCharacter, healthPoints: newPlayerHealth }));

                setTimeout(() => {
                    setEnemies((prevEnemies) =>
                        prevEnemies.map((e) =>
                            e.name === enemy.name ? { ...e, state: `${e.name}Idle` } : e
                        )
                    );
                }, 1000);
            }, attackDelay)
            attackDelay += 1500;
        });

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
            <Player />
            {turn === "player" ?
                <>
                    <TextContainer Skippable={turn === "player" ? false : true}>
                        {character.move.map((m, i) => (
                            <TextButton key={i} text={m.name} useMove={playerTurn} moveId={i} />
                        ))}
                    </TextContainer>
                    {turnCount === 0 ? <TextContainer textContent={["You encountered an enemy"]} /> : null}
                </>
            :
                <TextContainer textContent={["Enemy is attacking!"]} />
            }
            <div className={styles.enemyContainer}>
                {enemies.map((enemy) => (
                    <Enemy key={enemy.name} name={enemy.name} state={enemy.state} />
                ))}
            </div>
        </main>
    );
};

export default DynamicBattle;
