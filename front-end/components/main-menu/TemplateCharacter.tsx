import React, { useEffect, useState } from 'react';
import styles from "@/styles/main-menu/TemplateCharacter.module.css";
import Image from 'next/image';
import { Move } from '@/types';
import { useRouter } from 'next/navigation';
import UserService from '@/services/UserService';
import CharacterService from '@/services/CharacterService';

interface Props {
    character: {
        src: string;
        name: string;
        characterClass: string;
        level: number;
        xp: number;
        strength: number;
        speed: number;
        magic: number;
        dexterity: number;
        healthPoints: number;
        manaPoints: number;
        luck: number;
        defense: number;
        magicDefense: number;
        progress: string;
        moves: Move[];
    };
}

const TemplateCharacter: React.FC<Props> = ({ character }) => {
    const [confirm, setConfirm] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        if(confirm){
            setTimeout(() => setConfirm(false), 1000)
        }
    }, [confirm]);

    const selectCharacter = async () => {
        const response1 = await CharacterService.createCharacterData(character);
        console.log(response1);
        
        if(response1.status === 200) {
            const response2 = await UserService.addCharacterToUser(response1.data.id);
            console.log(response2);
            if(response2.status === 200) {
                router.push("/game");
            } else {
                sessionStorage.removeItem("loggedInUser");
                router.push("/");
            }
        } else {
            sessionStorage.removeItem("loggedInUser");
            router.push("/");
        }
    };

    return (
        <div onClick={() => setConfirm(true)} className={styles.container}>
            {confirm ? <button className={styles.confirmButton} onClick={selectCharacter}>Confirm</button> : null}
            <Image className={styles.image} alt={character.name} src={character.src} width={100} height={100} quality={100} draggable={false} />
            <h1>{character.name}</h1>
            <div className={styles.stats}>
                <div>
                    <p>Strength</p>
                    <p>{character.strength}</p>
                </div>
                <div>
                    <p>Magic</p>
                    <p>{character.magic}</p>
                </div>
                <div>
                    <p>Defense</p>
                    <p>{character.defense}</p>
                </div>
                <div>
                    <p>Magic Defense</p>
                    <p>{character.magicDefense}</p>
                </div>
                <div>
                    <p>Dexterity</p>
                    <p>{character.dexterity}</p>
                </div>
                <div>
                    <p>Luck</p>
                    <p>{character.luck}</p>
                </div>
                <div>
                    <p>Health</p>
                    <p>{character.healthPoints}</p>
                </div>
                <div>
                    <p>Mana</p>
                    <p>{character.manaPoints}</p>
                </div>
            </div>
        </div>
    );
};

export default TemplateCharacter;
