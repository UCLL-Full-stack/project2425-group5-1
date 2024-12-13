import Music from "@/components/Music";
import Village from "@/components/game/Village";
import { Armor, Character, Class, Move, User, Weapon } from "@/types";
import { useEffect } from "react";
import localFont from 'next/font/local'

const quinquefiveFont = localFont({ src: "./fonts/quinque-five-font/Quinquefive-ALoRM.ttf" })

export default function Game() {

    const addLocalStorage = () => {
        const user: User = {
            id: 1,
            username: "test",
            email: "test@gmail.com",
            password: "test",
        };
        const weapon: Weapon = {
            id: 1,
            name: "Rusty Sword",
            description: "A worn down rusty sword.",
            equipable: true,
            consumable: false,
            stackable: false,
            attack: 5,
            magicAttack: 0,
            type: "melee"
        };
        const armor: Armor = {
            id: 1,
            name: "Leather Tunic",
            description: "A simple leather tunic.",
            equipable: true,
            consumable: false,
            stackable: false,
            defense: 2,
            magicDefense: 0,
            type: "Light"
        };
        const characterClass: Class = {
            id: 1,
            weapon: weapon,
            armor: armor,
            name: "Warrior",
            description: "A hardened warrior excelling at melee combat",
            // Scaling factor with character base class
            defense: 0.5,
            dexterity: 0.2,
            healthPoints: 0.7,
            manaPoints: 0,
            magic: 0,
            magicDefense: 0.1,
            strength: 0.75,
            speed: 0.3,
            luck: 0.1,
        };
        const move: Move = {
            id: 1,
            name: "strike",
            attack: 30, // 30% of all damaging factors combined
            aoe: false,
            manaPoints: 0,
            magicAttack: 0,
        };
        const character: Character = {
            id: 1,
            user: user,
            userId: user.id!,
            name: "Jeff",
            class: characterClass,
            level: 1,
            xp: 0,
            healthPoints: 10,
            manaPoints: 0,
            magic: 0,
            magicDefense: 0,
            defense: 5,
            dexterity: 2,
            speed: 3,
            strength: 7,
            luck: 1,
            progress: "1-1",
            armor: characterClass.armor,
            weapon: characterClass.weapon,
            move: [move],
        };

        if (!window.localStorage.getItem("character")) { // Just need to check one of these
            window.localStorage.setItem("user", JSON.stringify(user));
            window.localStorage.setItem("weapon", JSON.stringify(weapon));
            window.localStorage.setItem("armor", JSON.stringify(armor));
            window.localStorage.setItem("class", JSON.stringify(characterClass));
            window.localStorage.setItem("move", JSON.stringify(move));
            window.localStorage.setItem("character", JSON.stringify(character));
        }
    };

    const removeLocalStorage = () => {
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("weapon");
        window.localStorage.removeItem("armor");
        window.localStorage.removeItem("class");
        window.localStorage.removeItem("move");
        window.localStorage.removeItem("character");
    };

    useEffect(() => {
        // removeLocalStorage();
        addLocalStorage();
    }, []);

    return (
        <main className={quinquefiveFont.className}>
            <Village />
            <Music musicPath='/music/rpg_village_loop.mp3' volume={0.07} />
        </main>
    );
}
