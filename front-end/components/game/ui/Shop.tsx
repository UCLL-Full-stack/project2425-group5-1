import Item from "./Item";
import TextContainer from "./TextContainer";

interface Props {
   textContent: string[];
   isClicked: (arg0: string) => void;
}

const Shop: React.FC<Props> = ({ textContent, isClicked }) => {
   return(
      <TextContainer textContent={textContent} isClicked={isClicked}>
         <p>Shop</p>
         <Item />
      </TextContainer>
   );
};

export default Shop;
