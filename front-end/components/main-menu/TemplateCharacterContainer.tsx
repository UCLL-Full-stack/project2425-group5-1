import React, { useEffect, useState } from 'react';
import styles from "@/styles/main-menu/TemplateCharacterContainer.module.css";
import TemplateCharacter from './TemplateCharacter';
import { Character } from '@/types';
import CharacterService from '@/services/CharacterService';
import { useRouter } from 'next/navigation';

interface Props {};

const TemplateCharacterContainer: React.FC<Props> = () => {
  const [templateCharacters, setTemplateCharacters] = useState<(Character & {src: string})[]>();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const templates = await CharacterService.getCharacterTemplates(router);
      console.log(templates);
      const characterWithSrc = templates.data.map((template: Character) => ({
        ...template,
        src: `/images/player/Human${template.name}.png`,
      }));
      console.log(characterWithSrc);
      setTemplateCharacters(characterWithSrc);
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
