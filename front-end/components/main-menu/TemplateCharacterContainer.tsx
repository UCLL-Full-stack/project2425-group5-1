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
