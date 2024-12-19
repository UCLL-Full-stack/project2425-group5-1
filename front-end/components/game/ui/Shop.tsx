import Image, { StaticImageData } from "next/image";
import Item from "./Item";
import TextContainer from "./TextContainer";
import { items } from "@/helpers/useImages";
import styles from "@/styles/game/ui/Shop.module.css"
import { Weapon } from "@/types";

interface ShopProps {
   textContent: string[];
   isClicked?: (name: "" | "merchant" | "hatman" | "woman" | "questboard" ) => void;
}
interface ShopItemProps {
   item: Weapon
}

const Shop: React.FC<ShopProps> = ({ textContent, isClicked }) => {
   return(
      <TextContainer textContent={textContent} isClicked={isClicked}>
         <p>Shop</p>
         
         <div className={styles.itemContainer}>
            <ShopItem item={items.weapons.sword1} />
         </div>
      </TextContainer>
   );
};

const ShopItem: React.FC<ShopItemProps> = ({ item }) => {
   return (
      <>
         <Item imageSrc={item.image} id={item.id} name={item.name} />
         <div style={{display: "flex"}}>
            <Image src={items.ui.coins.image} alt={items.ui.coins.name} width={20} height={20} draggable={false}  />
            <p>{item.price}</p>
         </div>
      </>
   );
};

export default Shop;
