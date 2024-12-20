import React, { useEffect, useState } from 'react';
import styles from "@/styles/main-menu/TemplateCharacterContainer.module.css";
import TemplateCharacter from './TemplateCharacter';
import { Character } from '@/types';
import CharacterService from '@/services/CharacterService';

interface Props {};

interface TemplateCharacterType {
  src: string;
  name: string;
}

export const templateCharacters: Record<string, TemplateCharacterType & Character> = {
  "fighter": {
    name: "Fighter",
    characterClass: "Fighter",
    src: "/images/player/HumanFighter.png",
    level: 1,
    xp: 0,
    strength: 10,
    speed: 10,
    magic: 5,
    dexterity: 12,
    healthPoints: 150,
    manaPoints: 150,
    luck: 10,
    defense: 10,
    magicDefense: 5,
    progress: "1-1",
    moveIds: [23]
  },
};

const TemplateCharacterContainer: React.FC<Props> = () => {
  const [templateCharacters, setTemplateCharacters] = useState<(TemplateCharacterType & Character)[]>();
  useEffect(() => {
    (async () => {
      const templates = await CharacterService.getCharacterTemplates();
      templates.data.forEach((template: TemplateCharacterType & Character) => {
        template.src = `/images/player/Human${template.name}.png`;
      });
      setTemplateCharacters(templates.data);
    })();
  }, []);

  if(!templateCharacters) return null;
  return (
    <div className={styles.container}>
      {Object.entries(templateCharacters).map(([key, character]) => (
        <TemplateCharacter key={key} character={character} />
      ))}
    </div>
  );
};

export default TemplateCharacterContainer;
