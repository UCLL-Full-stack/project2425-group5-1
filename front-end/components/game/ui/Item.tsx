import React from 'react';
import styles from "@/styles/game/ui/Item.module.css";
import Image, { StaticImageData } from "next/image";

interface Props {
  imageSrc: string | StaticImageData;
  id: number;
  name: string;
}

const Item: React.FC<Props> = ({ imageSrc, id, name }) => {
  return (
    <div className={styles.container} key={id}>
      <Image src={imageSrc} alt={name} width={40} height={40} quality={100} title={name} draggable={false}  />
    </div>
  )
}

export default Item;
